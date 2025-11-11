'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadUserData = () => {
      const token = localStorage.getItem('vitasyn_token')
      const userData = localStorage.getItem('vitasyn_user')
      setIsAuthenticated(!!token)
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (e) {
          console.error('Failed to parse user data')
        }
      }
    }

    const loadCartData = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('peptide_cart') || '[]')
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartCount(totalItems)
      } catch (e) {
        console.error('Failed to parse cart data')
      }
    }

    setTimeout(() => {
      loadUserData()
      loadCartData()
    }, 0)

    const handleCartUpdate = () => {
      loadCartData()
    }

    window.addEventListener('cart-updated', handleCartUpdate)
    return () => window.removeEventListener('cart-updated', handleCartUpdate)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('vitasyn_token')
    localStorage.removeItem('vitasyn_user')
    localStorage.removeItem('peptide_cart')
    setIsAuthenticated(false)
    setUser(null)
    window.location.href = '/'
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <img src="/logo1.png" alt="Evans Peptides" />
          </Link>

          <ul className="nav-menu desktop-menu">
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/order">ORDER</Link></li>
            <li className="dropdown">
              <span className="dropdown-toggle">PEPTIDE INFORMATION</span>
              <ul className="dropdown-menu">
                <li><Link href="/peptide-storage">PEPTIDE STORAGE</Link></li>
                <li><Link href="/peptide-reconstruction">PEPTIDE RECONSTRUCTION</Link></li>
              </ul>
            </li>
            <li><Link href="/contact">CONTACT</Link></li>
            <li><Link href="/faq">FAQ'S</Link></li>
            <li><Link href="/track-order">TRACK MY ORDER</Link></li>
          </ul>

          <div className="nav-right">
            <Link href="/order#cart" className="nav-icon cart-icon">
              CART
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            
            <div className="profile-icon-wrapper desktop-only">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="nav-icon profile-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <p>{isAuthenticated && user ? `Welcome, ${user.firstName}` : 'Welcome, Guest'}</p>
                  </div>
                  <div className="profile-menu">
                    {isAuthenticated ? (
                      <>
                        <Link href="/account">MY ACCOUNT</Link>
                        <Link href="/account#orders">MY ORDERS</Link>
                        <button onClick={handleLogout}>SIGN OUT</button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">SIGN IN</Link>
                        <Link href="/register">CREATE ACCOUNT</Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>MENU</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="mobile-close">×</button>
            </div>
            <ul className="mobile-menu-list">
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link></li>
              <li><Link href="/order" onClick={() => setMobileMenuOpen(false)}>ORDER</Link></li>
              <li className="mobile-has-submenu">
                <span className="mobile-label">PEPTIDE INFORMATION</span>
                <ul className="mobile-submenu">
                  <li><Link href="/peptide-storage" onClick={() => setMobileMenuOpen(false)}>PEPTIDE STORAGE</Link></li>
                  <li><Link href="/peptide-reconstruction" onClick={() => setMobileMenuOpen(false)}>PEPTIDE RECONSTRUCTION</Link></li>
                </ul>
              </li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link></li>
              <li><Link href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ'S</Link></li>
              <li><Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>TRACK MY ORDER</Link></li>
              <li className="mobile-divider"></li>
              {isAuthenticated ? (
                <>
                  <li><Link href="/account" onClick={() => setMobileMenuOpen(false)}>MY ACCOUNT</Link></li>
                  <li><Link href="/account#orders" onClick={() => setMobileMenuOpen(false)}>MY ORDERS</Link></li>
                  <li><button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="mobile-logout-btn">SIGN OUT</button></li>
                </>
              ) : (
                <>
                  <li><Link href="/login" onClick={() => setMobileMenuOpen(false)}>SIGN IN</Link></li>
                  <li><Link href="/register" onClick={() => setMobileMenuOpen(false)}>CREATE ACCOUNT</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
