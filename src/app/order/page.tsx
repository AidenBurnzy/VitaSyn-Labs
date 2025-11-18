'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StackCarousel from '@/components/StackCarousel'

export default function OrderPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    console.log('Fetching products from API...')
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data)
        // Check if response has error message
        if (data.error) {
          setError(data.message || 'Failed to load products')
          setProducts([])
        } else if (Array.isArray(data)) {
          setProducts(data)
          setError('')
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products)
          setError('')
        } else {
          console.error('Products data is not an array:', data)
          setError('Invalid product data received')
          setProducts([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load products:', err)
        setError('Network error: Failed to connect to product API')
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
        ) : error ? (
          <div style={{textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '0 auto'}}>
            <h3 style={{color: '#dc3545', marginBottom: '20px'}}>⚠️ Configuration Required</h3>
            <p style={{marginBottom: '15px', lineHeight: '1.8'}}>{error}</p>
            <div style={{background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'left', fontSize: '14px'}}>
              <p style={{fontWeight: 'bold', marginBottom: '10px'}}>To fix this issue:</p>
              <ol style={{paddingLeft: '20px', lineHeight: '2'}}>
                <li>Add WooCommerce environment variables in Vercel</li>
                <li>Set WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET</li>
                <li>Redeploy your application</li>
              </ol>
              <p style={{marginTop: '15px', fontSize: '13px', color: '#666'}}>
                See <strong>VERCEL_DEPLOYMENT.md</strong> for detailed instructions.
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <h3>No products available</h3>
            <p>Please check your WooCommerce store and ensure products are published.</p>
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
                  {product.images?.[0] ? (
                    <img 
                      src={`/api/image-proxy?url=${encodeURIComponent(product.images[0].src || product.images[0].thumbnail)}`}
                      alt={product.name} 
                      loading="lazy"
                      style={{width: '100%', height: '100%', objectFit: 'contain'}} 
                      onError={(e) => {
                        console.error('Image failed to load:', product.images[0].src)
                        e.currentTarget.src = '/peptide-placeholder.svg'
                        e.currentTarget.style.padding = '20px'
                      }}
                    />
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
