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
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY')
    
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key not configured')
    }

    // Construir prompt contextualizado para DeepSeek
    const systemPrompts = {
      benchmarking: `Você é um analista quantitativo especializado em benchmarking de e-commerce.
      Analise dados de produtos e concorrentes, gere comparações detalhadas e métricas precisas.
      Retorne análises estruturadas com dados, percentuais e rankings.`,
      
      simulation: `Você é um especialista em modelagem preditiva para e-commerce.
      Use dados históricos e padrões de mercado para gerar simulações e previsões precisas.
      Foque em: impacto quantitativo, probabilidades e cenários baseados em dados.`,
      
      automation: `Você é um engenheiro de automação especializado em e-commerce.
      Gere códigos, scripts e automações eficientes para otimizar processos.
      Foque em: soluções técnicas, APIs e automação de tarefas repetitivas.`,
      
      diagnosis: `Você é um analista de dados especializado em diagnóstico de performance.
      Analise métricas, identifique padrões e gere insights baseados em dados.
      Foque em: análise quantitativa, KPIs e identificação de problemas.`,
      
      copywriting: `Você é um analista de conteúdo focado em otimização baseada em dados.
      Analise textos, títulos e descrições usando métricas e benchmarks.
      Foque em: análise de performance de texto e otimização data-driven.`
    }

    const systemPrompt = systemPrompts[analysisType] || systemPrompts.benchmarking

    // Configurar parâmetros do modelo DeepSeek
    const modelConfig = {
      'deepseek-v2': { model: 'deepseek-chat', max_tokens: 2000, temperature: 0.3 },
      'deepseek-coder': { model: 'deepseek-coder', max_tokens: 1500, temperature: 0.1 }
    }

    const config = modelConfig[model] || modelConfig['deepseek-v2']

    // Fazer chamada para DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
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
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from DeepSeek API')
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
    console.error('Error in deepseek-analysis function:', error)
    
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