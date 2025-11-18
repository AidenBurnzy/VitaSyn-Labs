'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const stackSlides = [
  { 
    id: 1, 
    title: 'GLOW STACK', 
    subtitle: 'Radiance & Vitality Research Bundle',
    products: ['TB-500', 'GHK-CU', 'BPC-157'],
    price: '$159.99',
    originalPrice: '$199.99',
    savings: 'SAVE 20%',
    link: '/order',
    bgColor: '#1a1a2e'
  },
  { 
    id: 2, 
    title: 'WOLVERINE STACK', 
    subtitle: 'Peak Athletic Research Bundle',
    products: ['BPC-157', 'TB-500'],
    price: '$189.99',
    originalPrice: '$237.49',
    savings: 'SAVE 20%',
    link: '/order',
    bgColor: '#16213e'
  }
]

export default function StackCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % stackSlides.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + stackSlides.length) % stackSlides.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(nextSlide, 5000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [])

  return (
    <div className="stack-carousel-wrapper">
      <div 
        className="stack-carousel" 
        onMouseEnter={stopAutoplay} 
        onMouseLeave={startAutoplay}
      >
        <div className="stack-carousel-inner">
          <button 
            className="stack-carousel-btn prev" 
            onClick={prevSlide} 
            aria-label="Previous"
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="stack-carousel-track">
            {stackSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`stack-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ 
                  backgroundColor: slide.bgColor,
                  border: '2px solid #333',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: 'auto'
                }}
              >
                <div className="stack-content" style={{
                  padding: '30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '30px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div className="stack-left" style={{ flex: 1 }}>
                    <div className="stack-info">
                      <div style={{
                        display: 'inline-block',
                        backgroundColor: '#FF9800',
                        color: '#fff',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        letterSpacing: '0.5px'
                      }}>
                        {slide.savings}
                      </div>
                      <h3 style={{
                        fontSize: '26px',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '10px',
                        letterSpacing: '1px',
                        lineHeight: '1.2'
                      }}>
                        {slide.title}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#aaa',
                        marginBottom: '15px',
                        lineHeight: '1.4'
                      }}>
                        {slide.subtitle}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        {slide.products.map((product, idx) => (
                          <span key={idx} style={{
                            backgroundColor: 'rgba(33, 150, 243, 0.15)',
                            color: '#2196F3',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500',
                            border: '1px solid rgba(33, 150, 243, 0.3)',
                            whiteSpace: 'nowrap'
                          }}>
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="stack-right" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '15px',
                    flexShrink: 0
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '16px',
                        color: '#888',
                        textDecoration: 'line-through',
                        marginBottom: '6px'
                      }}>
                        {slide.originalPrice}
                      </div>
                      <div style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#2196F3',
                        lineHeight: '1'
                      }}>
                        {slide.price}
                      </div>
                    </div>
                    <Link 
                      href={slide.link} 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#2196F3',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#1976D2'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#2196F3'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <span>VIEW BUNDLE</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="stack-carousel-btn next" 
            onClick={nextSlide} 
            aria-label="Next"
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="stack-carousel-controls">
          <div className="stack-carousel-dots">
            {stackSlides.map((slide, index) => (
              <button
                key={index}
                className={`stack-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${slide.title}`}
                disabled={isTransitioning}
              >
                <span className="dot-progress"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
