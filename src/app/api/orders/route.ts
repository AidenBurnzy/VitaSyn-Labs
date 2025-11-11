import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    const pool = getPool()

    if (orderId) {
      const orderResult = await pool.query(
        `SELECT o.*, json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'productName', oi.product_name,
            'productPrice', oi.product_price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.id = $1 AND o.user_id = $2
         GROUP BY o.id`,
        [orderId, userId]
      )

      if (orderResult.rows.length === 0) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      return NextResponse.json({ order: orderResult.rows[0] })
    }

    const result = await pool.query(
      `SELECT o.*, json_agg(
        json_build_object(
          'id', oi.id,
          'productId', oi.product_id,
          'productName', oi.product_name,
          'quantity', oi.quantity
        )
      ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    )

    return NextResponse.json({ orders: result.rows })
  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)
    const body = await request.json()
    const { items, shippingAddress, paymentMethod } = body

    const pool = getPool()

    // Calculate totals
    let subtotal = 0
    for (const item of items) {
      subtotal += parseFloat(item.price) * item.quantity
    }

    const shippingCost = subtotal > 200 ? 0 : 10
    const taxAmount = subtotal * 0.085
    const total = subtotal + shippingCost + taxAmount

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${userId}`

    // Insert order
    const orderResult = await pool.query(
      `INSERT INTO orders (
        user_id, order_number, status, subtotal, shipping_cost, tax_amount, total,
        shipping_first_name, shipping_last_name, shipping_address1, shipping_address2,
        shipping_city, shipping_state, shipping_zip, shipping_country, shipping_phone,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
      RETURNING id, order_number`,
      [
        userId, orderNumber, 'pending', subtotal, shippingCost, taxAmount, total,
        shippingAddress.firstName, shippingAddress.lastName, shippingAddress.address1,
        shippingAddress.address2 || null, shippingAddress.city, shippingAddress.state,
        shippingAddress.zipCode, shippingAddress.country, shippingAddress.phone
      ]
    )

    const orderId = orderResult.rows[0].id

    // Insert order items
    for (const item of items) {
      const itemSubtotal = parseFloat(item.price) * item.quantity
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, item.id, item.name, item.price, item.quantity, itemSubtotal]
      )
    }

    return NextResponse.json({
      success: true,
      orderNumber: orderResult.rows[0].order_number,
      orderId
    })
  } catch (error) {
    console.error('Orders POST error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
