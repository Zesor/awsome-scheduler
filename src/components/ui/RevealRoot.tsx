'use client'
import { useEffect } from 'react'

// Reveals [data-reveal] elements once, when they scroll into view. The `js` class is set before paint in the layout.
export function RevealRoot() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target) }
    }, { threshold: 0.15 })
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
