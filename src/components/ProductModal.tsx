'use client'

import { useEffect } from 'react'

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    // Get existing cart
    const existingCart = localStorage.getItem('cart')
    const cart = existingCart ? JSON.parse(existingCart) : []
    
    // Check if product already in cart
    const existingIndex = cart.findIndex((item: any) => item.id === product.id)
    
    if (existingIndex > -1) {
      // Increase quantity
      cart[existingIndex].quantity += 1
    } else {
      // Add new product
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.src || product.images?.[0]?.thumbnail,
        quantity: 1
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'))
    
    alert(`${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Redirect to checkout or cart page
    window.location.href = '/order'
  }

  const imageUrl = product.images?.[0]?.src || product.images?.[0]?.thumbnail

  return (
    <>
      <div 
        className="modal-overlay" 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              zIndex: 1,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0'
              e.currentTarget.style.color = '#000'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#666'
            }}
          >
            ×
          </button>

          <div style={{ padding: '30px' }}>
            {/* Product Image */}
            <div style={{
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '25px',
              overflow: 'hidden',
            }}>
              {imageUrl ? (
                <img
                  src={`/api/image-proxy?url=${encodeURIComponent(imageUrl)}`}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/peptide-placeholder.svg'
                  }}
                />
              ) : (
                <img
                  src="/peptide-placeholder.svg"
                  alt={product.name}
                  style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </div>

            {/* Product Info */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#333',
            }}>
              {product.name}
            </h2>

            <p style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#2196F3',
              marginBottom: '20px',
            }}>
              ${product.price}
            </p>

            {/* Description */}
            {(product.short_description || product.description) && (
              <div style={{
                marginBottom: '25px',
                paddingBottom: '25px',
                borderBottom: '1px solid #e0e0e0',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '12px',
                }}>
                  Product Description
                </h3>
                <div 
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.8',
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: product.short_description || product.description || 'No description available.' 
                  }}
                />
              </div>
            )}

            {/* Stock Status */}
            {product.stock_status && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: product.stock_status === 'instock' ? '#4caf50' : '#f44336',
                  color: '#fff',
                }}>
                  {product.stock_status === 'instock' ? '✓ In Stock' : 'Out of Stock'}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock_status === 'outofstock'}
                style={{
                  flex: '1',
                  minWidth: '150px',
                  padding: '14px 24px',
                  backgroundColor: product.stock_status === 'outofstock' ? '#ccc' : '#2196F3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: product.stock_status === 'outofstock' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  if (product.stock_status !== 'outofstock') {
                    e.currentTarget.style.backgroundColor = '#1976D2'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.3)'
                  }
                }}
                onMouseOut={(e) => {
                  if (product.stock_status !== 'outofstock') {
                    e.currentTarget.style.backgroundColor = '#2196F3'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock_status === 'outofstock'}
                style={{
                  flex: '1',
                  minWidth: '150px',
                  padding: '14px 24px',
                  backgroundColor: product.stock_status === 'outofstock' ? '#ccc' : '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: product.stock_status === 'outofstock' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  if (product.stock_status !== 'outofstock') {
                    e.currentTarget.style.backgroundColor = '#388E3C'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }
                }}
                onMouseOut={(e) => {
                  if (product.stock_status !== 'outofstock') {
                    e.currentTarget.style.backgroundColor = '#4CAF50'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Additional Info */}
            {product.categories && product.categories.length > 0 && (
              <div style={{
                marginTop: '25px',
                paddingTop: '20px',
                borderTop: '1px solid #e0e0e0',
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#999',
                  marginBottom: '8px',
                }}>
                  Categories:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.categories.map((cat: any) => (
                    <span
                      key={cat.id}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#666',
                      }}
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
