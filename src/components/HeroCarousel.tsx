'use client'

import { useState, useEffect, useRef } from 'react'

const slides = [
  { id: 1, title: 'BUNDLE', subtitle: 'Get All 3 Products for $200', cta: 'SHOP NOW', link: '/order', className: 'slide-1' },
  { id: 2, title: 'LABORATORY GRADE', cta: 'BROWSE PRODUCTS', link: '/order', className: 'slide-2' },
  { id: 3, title: 'SCIENTIFIC SOLUTIONS', cta: 'LEARN MORE', link: '/faq', className: 'slide-3' }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = (index: number) => setCurrentSlide(index)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

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
    <section className="carousel-section">
      <div className="carousel" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
        <div className="carousel-track">
          {slides.map((slide, index) => (
            <div key={slide.id} className={`carousel-slide ${slide.className} ${index === currentSlide ? 'active' : ''}`}>
              <div className="slide-content">
                <h1 className="hero-title">{slide.title}</h1>
                {slide.subtitle && <p className="hero-subtitle">{slide.subtitle}</p>}
                <a href={slide.link} className="hero-cta">{slide.cta}</a>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous">‹</button>
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Next">›</button>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <div key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} />
          ))}
        </div>
      </div>
    </section>
  )
}
