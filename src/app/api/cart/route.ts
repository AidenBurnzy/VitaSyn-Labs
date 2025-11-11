import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)

    const pool = getPool()
    const result = await pool.query(
      'SELECT cart_data FROM user_carts WHERE user_id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ cart: [] })
    }

    return NextResponse.json({ cart: result.rows[0].cart_data })
  } catch (error) {
    console.error('Cart GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)
    const body = await request.json()
    const { cart } = body

    const pool = getPool()
    await pool.query(
      `INSERT INTO user_carts (user_id, cart_data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET cart_data = $2, updated_at = NOW()`,
      [userId, JSON.stringify(cart)]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cart POST error:', error)
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)

    const pool = getPool()
    await pool.query('DELETE FROM user_carts WHERE user_id = $1', [userId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cart DELETE error:', error)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}
