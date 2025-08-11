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
    const { action, access_token, user_id } = await req.json()
    
    if (!access_token) {
      throw new Error('Access token not provided')
    }

    if (action === 'sync_products') {
      // Buscar produtos do usuário no Mercado Livre
      const productsResponse = await fetch(`https://api.mercadolibre.com/users/${user_id}/items/search`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })

      if (!productsResponse.ok) {
        throw new Error('Failed to fetch products from Mercado Libre')
      }

      const productsData = await productsResponse.json()
      const productIds = productsData.results

      // Buscar detalhes de cada produto (em lotes para otimizar)
      const productDetails = []
      const batchSize = 20

      for (let i = 0; i < productIds.length; i += batchSize) {
        const batch = productIds.slice(i, i + batchSize)
        const batchPromises = batch.map(async (productId: string) => {
          try {
            const response = await fetch(`https://api.mercadolibre.com/items/${productId}`, {
              headers: {
                'Authorization': `Bearer ${access_token}`,
              },
            })
            
            if (response.ok) {
              return await response.json()
            }
            return null
          } catch (error) {
            console.warn(`Failed to fetch product ${productId}:`, error)
            return null
          }
        })

        const batchResults = await Promise.all(batchPromises)
        productDetails.push(...batchResults.filter(product => product !== null))
      }

      // Processar e formatar dados dos produtos
      const processedProducts = productDetails.map(product => ({
        ml_id: product.id,
        title: product.title,
        price: product.price,
        currency_id: product.currency_id,
        category_id: product.category_id,
        condition: product.condition,
        status: product.status,
        available_quantity: product.available_quantity,
        sold_quantity: product.sold_quantity,
        pictures: product.pictures?.map((pic: any) => pic.url) || [],
        permalink: product.permalink,
        listing_type_id: product.listing_type_id,
        shipping: product.shipping,
        seller_custom_field: product.seller_custom_field,
        attributes: product.attributes,
        last_updated: new Date().toISOString(),
        synced_at: new Date().toISOString()
      }))

      // TODO: Salvar produtos no banco de dados
      // await supabase
      //   .from('ml_products')
      //   .upsert(processedProducts)

      return new Response(
        JSON.stringify({
          success: true,
          products_synced: processedProducts.length,
          total_products: productIds.length,
          products: processedProducts,
          sync_timestamp: new Date().toISOString()
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    if (action === 'get_product_metrics') {
      const { product_id } = await req.json()
      
      // Buscar métricas do produto
      const metricsResponse = await fetch(`https://api.mercadolibre.com/items/${product_id}/visits`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })

      let metrics = {}
      if (metricsResponse.ok) {
        metrics = await metricsResponse.json()
      }

      return new Response(
        JSON.stringify({
          success: true,
          product_id: product_id,
          metrics: metrics,
          timestamp: new Date().toISOString()
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    if (action === 'search_competitors') {
      const { category_id, keywords, limit = 50 } = await req.json()
      
      // Buscar produtos concorrentes
      const searchUrl = new URL('https://api.mercadolibre.com/sites/MLB/search')
      if (category_id) searchUrl.searchParams.set('category', category_id)
      if (keywords) searchUrl.searchParams.set('q', keywords)
      searchUrl.searchParams.set('limit', limit.toString())
      searchUrl.searchParams.set('sort', 'relevance')

      const competitorsResponse = await fetch(searchUrl.toString())
      
      if (!competitorsResponse.ok) {
        throw new Error('Failed to search competitors')
      }

      const competitorsData = await competitorsResponse.json()
      
      const competitors = competitorsData.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        currency_id: item.currency_id,
        seller_id: item.seller.id,
        seller_nickname: item.seller.nickname,
        condition: item.condition,
        thumbnail: item.thumbnail,
        permalink: item.permalink,
        shipping: item.shipping,
        attributes: item.attributes,
        category_id: item.category_id
      }))

      return new Response(
        JSON.stringify({
          success: true,
          competitors: competitors,
          total_found: competitorsData.paging.total,
          search_params: { category_id, keywords, limit },
          timestamp: new Date().toISOString()
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
    console.error('Error in ml-products function:', error)
    
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