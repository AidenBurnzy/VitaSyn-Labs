'use client'

import { useState, useEffect } from 'react'

export default function ResearchNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('research_notice_accepted')
    const sessionAccepted = sessionStorage.getItem('research_notice_accepted')
    
    if (hasAccepted !== 'true' || sessionAccepted !== 'true') {
      setIsVisible(true)
      document.body.classList.add('notice-locked')
    }
  }, [])

  const handleContinue = () => {
    localStorage.setItem('research_notice_accepted', 'true')
    sessionStorage.setItem('research_notice_accepted', 'true')
    setIsVisible(false)
    document.body.classList.remove('notice-locked')
  }

  const handleExit = () => {
    window.location.href = 'about:blank'
  }

  if (!isVisible) return null

  return (
    <div className="research-notice" role="dialog" aria-modal="true" aria-labelledby="research-notice-title">
      <div className="notice-content">
        <h2 id="research-notice-title">Research Laboratory Notice</h2>
        <p>
          This site contains information about peptides for research and educational purposes only. 
          Products are intended for laboratory research use by qualified professionals.
        </p>
        <div className="notice-actions">
          <button 
            type="button" 
            onClick={handleContinue}
            className="notice-button primary"
          >
            I Understand - Continue
          </button>
          <button 
            type="button" 
            onClick={handleExit}
            className="notice-button"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  )
}
