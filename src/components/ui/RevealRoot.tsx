'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Reveals [data-reveal] elements once, when they scroll into view. The `js` class is set before paint in the layout.
// Re-observes on every route change so client-side navigation reveals the new page.
export function RevealRoot() {
  const pathname = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target) }
    }, { threshold: 0.15 })
    document.querySelectorAll('[data-reveal]:not(.shown)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
