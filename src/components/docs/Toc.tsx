'use client'
import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/markdown'
import { site } from '@/lib/site'
import s from '@/app/docs/docs.module.css'

export function Toc({ items }: { items: Heading[] }) {
  const [active, setActive] = useState(items[0]?.id)
  useEffect(() => {
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setActive(e.target.id) }, { rootMargin: '-80px 0px -70% 0px' })
    items.forEach((h) => { const el = document.getElementById(h.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [items])
  return (
    <aside className={s.toc}>
      {items.length > 0 && <h4>On this page</h4>}
      {items.map((h) => <a key={h.id} href={`#${h.id}`} className={active === h.id ? s.on : undefined}>{h.text}</a>)}
      <div className={s.gh}><a href={site.repo}>Edit on GitHub</a><a href={site.issues}>Report an issue</a></div>
    </aside>
  )
}
