'use client'
import { useEffect, useState } from 'react'
import s from '@/app/changelog/changelog.module.css'

// "Include pre-releases" opens every pre-release list; "Releases" closes them.
export function PreToggle() {
  const [on, setOn] = useState(false)
  const set = (v: boolean) => { setOn(v); document.querySelectorAll<HTMLDetailsElement>('details[data-pre]').forEach((d) => (d.open = v)) }
  // A pre-release linked by hash sits inside closed details: open its ancestors, then scroll.
  useEffect(() => {
    const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (!el) return
    for (let d = el.closest('details'); d; d = d.parentElement?.closest('details') ?? null) d.open = true
    el.scrollIntoView()
  }, [])
  return (
    <div className={s.filter} role="group" aria-label="Show">
      <button type="button" aria-pressed={!on} onClick={() => set(false)}>Releases</button>
      <button type="button" aria-pressed={on} onClick={() => set(true)}>Include pre-releases</button>
    </div>
  )
}
