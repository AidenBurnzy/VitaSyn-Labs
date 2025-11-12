import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)

    const pool = getPool()
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, phone, created_at FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = result.rows[0]
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        createdAt: user.created_at
      }
    })
  } catch (error) {
    console.error('User GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const { userId } = getUserFromRequest(authHeader)
    const body = await request.json()
    const { firstName, lastName, phone } = body

    const pool = getPool()
    await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4',
      [firstName, lastName, phone || null, userId]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('User PUT error:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
