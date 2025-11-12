'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StackCarousel from '@/components/StackCarousel'

export default function OrderPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

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

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0 20px'}}>ORDER RESEARCH PEPTIDES</h1>
        
        {/* Stack Carousel */}
        <StackCarousel />
        
        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <svg 
              className="search-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search peptides by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="search-results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
        
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
        ) : filteredProducts.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <h3>No products found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="product-grid" style={{maxWidth: '1200px', margin: '0 auto'}}>
            {filteredProducts.map((product: any) => (
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
