'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function NavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  return loading ? (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #1a5490 0%, #c9a961 50%, #1a5490 100%)',
      backgroundSize: '200% 100%',
      animation: 'loading 1s ease-in-out infinite',
      zIndex: 9999,
    }} />
  ) : null
}
