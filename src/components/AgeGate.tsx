'use client'

import { useState, useEffect } from 'react'

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const researchAccepted = localStorage.getItem('research_notice_accepted')
    const ageVerified = localStorage.getItem('age_verified')
    const sessionVerified = sessionStorage.getItem('age_verified')
    
    if (researchAccepted === 'true' && (ageVerified !== 'true' || sessionVerified !== 'true')) {
      setTimeout(() => {
        setIsVisible(true)
        document.body.classList.add('notice-locked')
      }, 500)
    }
  }, [])

  const handleYes = () => {
    localStorage.setItem('age_verified', 'true')
    sessionStorage.setItem('age_verified', 'true')
    setIsVisible(false)
    document.body.classList.remove('notice-locked')
  }

  const handleNo = () => {
    setShowMessage(true)
  }

  if (!isVisible) return null

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate-content">
        <h2 id="age-gate-title">Age Verification</h2>
        <p>
          This website contains research chemical information intended for audiences 21 years 
          of age or older. Please confirm your age to continue.
        </p>
        <div className="age-gate-actions">
          <button 
            type="button"
            onClick={handleYes}
            className="age-gate-button primary"
            disabled={showMessage}
          >
            Yes, I am 21 or older
          </button>
          <button 
            type="button"
            onClick={handleNo}
            className="age-gate-button"
            disabled={showMessage}
          >
            No
          </button>
        </div>
        {showMessage && (
          <p className="age-gate-message" role="alert">
            Access restricted. You must be 21 or older to view this site.
          </p>
        )}
      </div>
    </div>
  )
}
