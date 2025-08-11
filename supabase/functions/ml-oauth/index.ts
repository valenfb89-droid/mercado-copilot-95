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
    const url = new URL(req.url)
    const action = url.searchParams.get('action')
    
    // Pegar credenciais do Supabase Secrets
    const ML_CLIENT_ID = Deno.env.get('ML_CLIENT_ID')
    const ML_CLIENT_SECRET = Deno.env.get('ML_CLIENT_SECRET')
    const ML_REDIRECT_URI = Deno.env.get('ML_REDIRECT_URI') || `${url.origin}/ml/callback`
    
    if (!ML_CLIENT_ID || !ML_CLIENT_SECRET) {
      throw new Error('Mercado Libre API credentials not configured')
    }

    if (action === 'start') {
      // Gerar URL de autorização OAuth2 do Mercado Livre
      const scopes = 'read' // Apenas leitura por enquanto
      const state = crypto.randomUUID() // Para segurança
      
      const authUrl = new URL('https://auth.mercadolibre.com.br/authorization')
      authUrl.searchParams.set('response_type', 'code')
      authUrl.searchParams.set('client_id', ML_CLIENT_ID)
      authUrl.searchParams.set('redirect_uri', ML_REDIRECT_URI)
      authUrl.searchParams.set('scope', scopes)
      authUrl.searchParams.set('state', state)

      return new Response(
        JSON.stringify({
          success: true,
          authUrl: authUrl.toString(),
          state: state
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    if (action === 'callback') {
      const { code, state } = await req.json()
      
      if (!code) {
        throw new Error('Authorization code not provided')
      }

      // Trocar authorization code por access token
      const tokenResponse = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: ML_CLIENT_ID,
          client_secret: ML_CLIENT_SECRET,
          code: code,
          redirect_uri: ML_REDIRECT_URI,
        }),
      })

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text()
        throw new Error(`Token exchange failed: ${tokenResponse.status} - ${errorText}`)
      }

      const tokenData = await tokenResponse.json()

      // Buscar informações do usuário
      const userResponse = await fetch(`https://api.mercadolibre.com/users/me`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user info')
      }

      const userData = await userResponse.json()

      // TODO: Salvar tokens criptografados no banco de dados
      // await supabase
      //   .from('ml_integrations')
      //   .upsert({
      //     user_id: userId,
      //     access_token: encrypt(tokenData.access_token),
      //     refresh_token: encrypt(tokenData.refresh_token),
      //     expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
      //     ml_user_id: userData.id,
      //     ml_nickname: userData.nickname,
      //     ml_email: userData.email,
      //     created_at: new Date(),
      //     updated_at: new Date()
      //   })

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: userData.id,
            nickname: userData.nickname,
            email: userData.email,
            country_id: userData.country_id,
            site_status: userData.site_status
          },
          message: 'Integration completed successfully'
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    if (action === 'refresh') {
      const { refresh_token } = await req.json()
      
      if (!refresh_token) {
        throw new Error('Refresh token not provided')
      }

      // Renovar access token
      const tokenResponse = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: ML_CLIENT_ID,
          client_secret: ML_CLIENT_SECRET,
          refresh_token: refresh_token,
        }),
      })

      if (!tokenResponse.ok) {
        throw new Error('Token refresh failed')
      }

      const tokenData = await tokenResponse.json()

      // TODO: Atualizar tokens no banco
      
      return new Response(
        JSON.stringify({
          success: true,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    throw new Error('Invalid action')

  } catch (error) {
    console.error('Error in ml-oauth function:', error)
    
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