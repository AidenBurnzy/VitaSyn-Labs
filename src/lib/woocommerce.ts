import { WooCommerceProduct } from '@/types/product'

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

// Check if WooCommerce credentials are configured
function checkWooCommerceConfig() {
  if (!WOOCOMMERCE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error('WooCommerce configuration missing:', {
      hasUrl: !!WOOCOMMERCE_URL,
      hasKey: !!CONSUMER_KEY,
      hasSecret: !!CONSUMER_SECRET
    })
    return false
  }
  return true
}

export async function fetchProducts(category?: string): Promise<WooCommerceProduct[]> {
  try {
    // Check if WooCommerce is configured
    if (!checkWooCommerceConfig()) {
      console.warn('WooCommerce not configured, returning empty array')
      return []
    }

    // Remove any trailing slashes from the URL
    const baseUrl = WOOCOMMERCE_URL?.replace(/\/$/, '')
    let url = `${baseUrl}/wp-json/wc/v3/products?per_page=100`
    
    if (category) {
      url += `&category=${category}`
    }

    const authString = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
      },
      cache: 'no-store', // Force fresh data on each request
    })

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status} ${response.statusText}`)
      throw new Error(`WooCommerce API error: ${response.status}`)
    }

    const products = await response.json()
    console.log(`Successfully fetched ${products.length} products from WooCommerce`)
    return products as WooCommerceProduct[]
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    return [] // Return empty array instead of throwing
  }
}

export async function fetchProduct(productId: number): Promise<WooCommerceProduct | null> {
  try {
    // Check if WooCommerce is configured
    if (!checkWooCommerceConfig()) {
      console.warn('WooCommerce not configured, returning null')
      return null
    }

    const baseUrl = WOOCOMMERCE_URL?.replace(/\/$/, '')
    const url = `${baseUrl}/wp-json/wc/v3/products/${productId}`
    const authString = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status} ${response.statusText}`)
      return null
    }

    const product = await response.json()
    return product as WooCommerceProduct
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error)
    return null
  }
}
