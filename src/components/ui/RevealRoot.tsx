'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Reveals [data-reveal] elements once, when they scroll into view. The `js` class is set before paint in the layout.
// Re-observes on every route change so client-side navigation reveals the new page. Without IntersectionObserver, or after a
// hash jump, everything in or above the viewport is revealed at once.
export function RevealRoot() {
  const pathname = usePathname()
  useEffect(() => {
    const pending = () => document.querySelectorAll('[data-reveal]:not(.shown)')
    if (!('IntersectionObserver' in window)) { pending().forEach((el) => el.classList.add('shown')); return }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target) }
    }, { threshold: 0.15 })
    pending().forEach((el) => io.observe(el))
    const revealReached = () => pending().forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) { el.classList.add('shown'); io.unobserve(el) } })
    const onHash = () => { setTimeout(revealReached, 50); setTimeout(revealReached, 700) }
    revealReached()
    addEventListener('hashchange', onHash)
    onHash() // a page opened on /#section
    return () => { io.disconnect(); removeEventListener('hashchange', onHash) }
  }, [pathname])
  return null
}
