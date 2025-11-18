'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ResearchNotice from '@/components/ResearchNotice'
import AgeGate from '@/components/AgeGate'
import HeroCarousel from '@/components/HeroCarousel'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    console.log('Home page: Fetching products from API...')
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('Home page: API Response:', data)
        if (data.error) {
          setError(data.message || 'Failed to load products')
          setProducts([])
        } else if (Array.isArray(data)) {
          console.log('Home page: First product image:', data[0]?.images?.[0]?.src)
          setProducts(data.slice(0, 6))
          setError('')
        } else if (data.products && Array.isArray(data.products)) {
          console.log('Home page: First product image:', data.products[0]?.images?.[0]?.src)
          setProducts(data.products.slice(0, 6))
          setError('')
        } else {
          setError('Invalid product data')
          setProducts([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load products:', err)
        setError('Network error')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <ResearchNotice />
      <AgeGate />
      <Navbar />
      
      <main>
        <HeroCarousel />
        
        {/* Why Choose Us Section */}
        <section className="why-choose-banner">
          <div className="why-choose-banner-inner">
            <div className="why-choose-item">
              <div className="why-choose-icon" aria-hidden="true">
                <img src="/icons/plane.png" alt="Free delivery icon" />
              </div>
              <h3>Free Delivery</h3>
              <p>We strive to provide fast and reliable delivery, no matter where you are. For orders over $200, the shipping is on us.</p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon" aria-hidden="true">
                <img src="/icons/tpt.png" alt="Quality badge icon" />
              </div>
              <h3>Highest Quality Peptides</h3>
              <p>Our peptides are manufactured locally against the highest standards for synthesis, undergoing rigorous quality control measures to ensure their purity, stability, and consistency.</p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon" aria-hidden="true">
                <img src="/icons/tube.png" alt="Lab icon" />
              </div>
              <h3>Third Party Tested</h3>
              <p>99% Purity rating tested and officially rated by third party organizations.</p>
            </div>
          </div>
        </section>

        {/* Shop Grid */}
        <section className="shop-section">
          <h2 className="section-title">RESEARCH CATALOG</h2>
          {loading ? (
            <p style={{textAlign: 'center'}}>Loading products...</p>
          ) : products.length === 0 ? (
            <p style={{textAlign: 'center', color: '#999'}}>No products available. Check console for details.</p>
          ) : (
            <div className="product-grid">
              {products.map((product: any) => (
                <Link href="/order" key={product.id} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0].src || product.images[0].thumbnail || '/peptide-placeholder.svg'} 
                          alt={product.name} 
                          crossOrigin="anonymous"
                          loading="lazy"
                          referrerPolicy="no-referrer"
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  )
}
