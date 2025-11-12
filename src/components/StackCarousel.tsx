'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const stackSlides = [
  { 
    id: 1, 
    title: 'GLOW STACK', 
    icon: '✨',
    subtitle: 'Radiance & Vitality Research Bundle',
    products: ['GHK-CU', 'Epitalon', 'BPC-157'],
    price: '$159.99',
    originalPrice: '$199.99',
    savings: 'SAVE 20%',
    link: '/order',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    id: 2, 
    title: 'PERFORMANCE STACK', 
    icon: '💪',
    subtitle: 'Peak Athletic Research Bundle',
    products: ['Ipamorelin', 'CJC-1295', 'TB-500'],
    price: '$189.99',
    originalPrice: '$237.49',
    savings: 'SAVE 20%',
    link: '/order',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  { 
    id: 3, 
    title: 'COGNITIVE STACK', 
    icon: '🧠',
    subtitle: 'Mental Clarity Research Bundle',
    products: ['Semax', 'Selank', 'Cerebrolysin'],
    price: '$174.99',
    originalPrice: '$218.74',
    savings: 'SAVE 20%',
    link: '/order',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  { 
    id: 4, 
    title: 'METABOLIC STACK', 
    icon: '🔥',
    subtitle: 'Metabolic Research Bundle',
    products: ['AOD-9604', 'MOTS-C', 'Tesamorelin'],
    price: '$199.99',
    originalPrice: '$249.99',
    savings: 'SAVE 20%',
    link: '/order',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
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
                style={{ background: slide.gradient }}
              >
                <div className="stack-slide-overlay"></div>
                <div className="stack-content">
                  <div className="stack-left">
                    <div className="stack-icon-badge">
                      <span className="stack-icon">{slide.icon}</span>
                    </div>
                    <div className="stack-info">
                      <div className="stack-badge">{slide.savings}</div>
                      <h3 className="stack-title">{slide.title}</h3>
                      <p className="stack-subtitle">{slide.subtitle}</p>
                      <div className="stack-products">
                        {slide.products.map((product, idx) => (
                          <span key={idx} className="product-tag">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="stack-right">
                    <div className="stack-pricing">
                      <div className="price-container">
                        <span className="original-price">{slide.originalPrice}</span>
                        <span className="stack-price">{slide.price}</span>
                      </div>
                      <Link href={slide.link} className="stack-cta">
                        <span>VIEW BUNDLE</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Animated background shapes */}
                <div className="stack-bg-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
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
