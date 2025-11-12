import { NextResponse } from 'next/server'
import { fetchProducts } from '@/lib/woocommerce'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    console.log('Products API called')
    
    // Check if WooCommerce env vars are set
    const hasConfig = process.env.WOOCOMMERCE_URL && 
                      process.env.WOOCOMMERCE_CONSUMER_KEY && 
                      process.env.WOOCOMMERCE_CONSUMER_SECRET

    if (!hasConfig) {
      console.error('WooCommerce environment variables not configured')
      return NextResponse.json(
        { 
          error: 'WooCommerce not configured',
          message: 'Please set WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET in your environment variables',
          products: []
        },
        { status: 200 } // Return 200 so UI can handle gracefully
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    console.log(`Fetching products${category ? ` for category: ${category}` : ''}`)
    
    const products = await fetchProducts(category || undefined)
    
    console.log(`Successfully fetched ${products.length} products`)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
        products: []
      },
      { status: 200 } // Return 200 so UI can handle gracefully
    )
  }
}
