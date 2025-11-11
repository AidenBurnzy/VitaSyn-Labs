export interface OrderItem {
  id: number
  productId: number
  productName: string
  productPrice: string
  quantity: number
  subtotal: string
}

export interface Order {
  id: number
  userId: number
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: string
  subtotal: string
  shippingCost: string
  taxAmount: string
  items: OrderItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    address1: string
    address2?: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  items: Array<{
    productId: number
    quantity: number
  }>
  shippingAddress: Order['shippingAddress']
  paymentMethod: string
}
