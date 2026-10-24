'use client'
import { useEffect, useState } from 'react'
import { LiveScheduler } from '@/components/ui/LiveScheduler'
import { useDemo, type Layout, type Theme } from './DemoContext'
import s from './Hero.module.css'

const SENTENCE = '"Lunch with Lea tomorrow 1pm for 2h"'

export function HeroTry() {
  const { theme, setTheme, layout, setLayout } = useDemo()
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { const now = setTimeout(() => setTyped(SENTENCE)); return () => clearTimeout(now) }
    let n = 0, t: ReturnType<typeof setInterval>
    const start = setTimeout(() => { t = setInterval(() => { setTyped(SENTENCE.slice(0, ++n)); if (n >= SENTENCE.length) clearInterval(t) }, 45) }, 1500)
    return () => { clearTimeout(start); clearInterval(t) }
  }, [])
  const seg = <T extends string>(value: T, options: T[], set: (v: T) => void, label: string) => (
    <div className={s.seg} role="group" aria-label={label}>
      {options.map((o) => <button key={o} type="button" aria-pressed={o === value} onClick={() => set(o)}>{o[0].toUpperCase() + o.slice(1)}</button>)}
    </div>
  )
  return (
    <div className={`${s.try} ${s.in}`} id="try" style={{ animationDelay: '900ms' }}>
      <div className={s.bar}>
        <p className={s.hint}><span className={s.dot} /><span className="sr-only">Try it: click a free slot and type {SENTENCE}</span><span aria-hidden>Try it: click a free slot and type <span className={s.typed}>{typed}</span><span className={s.caret} /></span></p>
        <div className={s.segs}>{seg<Theme>(theme, ['calm', 'vivid', 'editorial'], setTheme, 'Theme')}{seg<Layout>(layout, ['classic', 'focus', 'flow'], setLayout, 'Layout')}</div>
      </div>
      <div className={s.frame}><LiveScheduler lazy height={680} fallback="/images/week.png" theme={theme} layout={layout} /></div>
    </div>
  )
}
