import { WooCommerceProduct } from '@/types/product'

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

export async function fetchProducts(category?: string): Promise<WooCommerceProduct[]> {
  try {
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
      next: { revalidate: 3600 } as any,
    })

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`)
    }

    const products = await response.json()
    return products as WooCommerceProduct[]
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    throw error
  }
}

export async function fetchProduct(productId: number): Promise<WooCommerceProduct> {
  try {
    const baseUrl = WOOCOMMERCE_URL?.replace(/\/$/, '')
    const url = `${baseUrl}/wp-json/wc/v3/products/${productId}`
    const authString = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
      },
      next: { revalidate: 3600 } as any,
    })

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`)
    }

    const product = await response.json()
    return product as WooCommerceProduct
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error)
    throw error
  }
}
