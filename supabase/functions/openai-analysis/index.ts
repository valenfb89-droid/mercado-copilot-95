import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { model, prompt, analysisType, productData } = await req.json()
    
    // Pegar a chave da API do Supabase Secrets
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    // Construir prompt contextualizado baseado no tipo de análise
    const systemPrompts = {
      diagnosis: `Você é um especialista em e-commerce e análise de anúncios do Mercado Livre. 
      Analise profundamente o anúncio fornecido e identifique problemas, oportunidades e gere recomendações estratégicas.
      Foque em: SEO, preço, concorrência, descrição, atributos e positioning.`,
      
      copywriting: `Você é um copywriter especialista em e-commerce brasileiro. 
      Crie títulos, descrições e textos otimizados para o Mercado Livre.
      Foque em: palavras-chave, conversão, SEO local e compliance com regras do ML.`,
      
      benchmarking: `Você é um analista de mercado especializado em e-commerce. 
      Compare o produto com concorrentes e gere insights competitivos.
      Foque em: análise comparativa, gaps de mercado, oportunidades e posicionamento.`,
      
      simulation: `Você é um cientista de dados especializado em e-commerce. 
      Use dados históricos e padrões de mercado para simular impactos de mudanças.
      Foque em: previsões, métricas, probabilidades e ROI estimado.`,
      
      automation: `Você é um especialista em automação de e-commerce. 
      Gere scripts, regras e automações para otimizar operações.
      Foque em: eficiência, escalabilidade e automação de processos.`
    }

    const systemPrompt = systemPrompts[analysisType] || systemPrompts.diagnosis

    // Configurar parâmetros do modelo
    const modelConfig = {
      'gpt-4o': { model: 'gpt-4o', max_tokens: 2000, temperature: 0.7 },
      'gpt-4-turbo': { model: 'gpt-4-turbo-preview', max_tokens: 1500, temperature: 0.7 },
      'gpt-3.5-turbo': { model: 'gpt-3.5-turbo', max_tokens: 1000, temperature: 0.8 }
    }

    const config = modelConfig[model] || modelConfig['gpt-4o']

    // Fazer chamada para OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Dados do produto: ${JSON.stringify(productData)}\n\nPrompt: ${prompt}`
          }
        ],
        max_tokens: config.max_tokens,
        temperature: config.temperature,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from OpenAI API')
    }

    // Retornar resposta estruturada
    return new Response(
      JSON.stringify({
        success: true,
        model: model,
        analysisType: analysisType,
        response: aiResponse,
        usage: data.usage,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in openai-analysis function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})