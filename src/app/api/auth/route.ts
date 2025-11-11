import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import { generateToken, hashPassword, comparePassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, password, firstName, lastName, phone } = body

    if (action === 'register') {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
      }

      const pool = getPool()
      const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])

      if (existingUser.rows.length > 0) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
      }

      const hashedPassword = await hashPassword(password)
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, created_at, last_login)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING id, email, first_name, last_name, phone, created_at`,
        [email.toLowerCase(), hashedPassword, firstName, lastName, phone || null]
      )

      const user = result.rows[0]
      const token = generateToken({ userId: user.id, email: user.email })

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone
        }
      })
    }

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      }

      const pool = getPool()
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email.toLowerCase()]
      )

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const user = result.rows[0]
      const isValid = await comparePassword(password, user.password_hash)

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id])

      const token = generateToken({ userId: user.id, email: user.email })

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone
        }
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
