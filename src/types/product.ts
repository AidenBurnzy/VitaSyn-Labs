export interface WooCommerceImage {
  id: number
  src: string
  name: string
  alt: string
}

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  permalink: string
  price: string
  regular_price: string
  sale_price: string
  description: string
  short_description: string
  sku: string
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  stock_quantity: number | null
  images: WooCommerceImage[]
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
}

export interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image?: string
}
