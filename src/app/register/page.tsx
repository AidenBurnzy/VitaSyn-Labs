'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          ...formData
        })
      })

      const data = await res.json()

      if (data.success && data.token) {
        localStorage.setItem('vitasyn_token', data.token)
        localStorage.setItem('vitasyn_user', JSON.stringify(data.user))
        router.push('/account')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '500px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>CREATE ACCOUNT</h1>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {error && <div style={{padding: '10px', background: '#ffebee', color: '#c62828'}}>{error}</div>}
          
          <div>
            <label>First Name:</label>
            <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <button type="submit" style={{padding: '15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer'}}>
            CREATE ACCOUNT
          </button>
          <p style={{textAlign: 'center'}}>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}
