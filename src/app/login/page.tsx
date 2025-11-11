'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      })

      const data = await res.json()

      if (data.success && data.token) {
        localStorage.setItem('vitasyn_token', data.token)
        localStorage.setItem('vitasyn_user', JSON.stringify(data.user))
        router.push('/account')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '500px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>LOGIN</h1>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {error && <div style={{padding: '10px', background: '#ffebee', color: '#c62828'}}>{error}</div>}
          
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{width: '100%', padding: '10px', marginTop: '5px'}} 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{width: '100%', padding: '10px', marginTop: '5px'}} 
            />
          </div>
          <button type="submit" style={{padding: '15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer'}}>
            LOGIN
          </button>
          <p style={{textAlign: 'center'}}>
            Don&apos;t have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}
