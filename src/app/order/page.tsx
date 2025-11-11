'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function OrderPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Products data is not an array:', data)
          setProducts([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load products:', err)
        setProducts([])
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>ORDER RESEARCH PEPTIDES</h1>
        
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading products...</p>
        ) : products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <h3>No products available</h3>
            <p>Please configure your WooCommerce API credentials in .env.local</p>
            <p style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
              Missing environment variables or WooCommerce connection issue.
            </p>
          </div>
        ) : (
          <div className="product-grid" style={{maxWidth: '1200px', margin: '0 auto'}}>
            {products.map((product: any) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.images?.[0]?.src ? (
                    <img src={product.images[0].src} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                  ) : (
                    <img src="/peptide-placeholder.svg" alt={product.name} style={{width: '100%', height: '100%', objectFit: 'contain', padding: '20px'}} />
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <button className="view-details-btn">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
