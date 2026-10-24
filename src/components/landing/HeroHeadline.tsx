'use client'
import { useEffect, useRef, useState } from 'react'
import s from './Hero.module.css'

const PHRASES = ['everything built in.', 'drag and drop.', 'recurring events.', 'time zones.', 'resource views.', 'three themes.', 'a phone layout.', 'undo everywhere.']
const WORDS = 'The best React calendar,'.split(' ')
const delay = (i: number) => ({ animationDelay: `${120 + i * 55}ms` })

// The server HTML is the full sentence with the first phrase; the rotation runs only on the client and is hidden from screen readers.
export function HeroHeadline() {
  const [k, setK] = useState(0)
  const [width, setWidth] = useState<number>()
  const measure = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setK((k + 1) % PHRASES.length), k === 0 ? 3600 : 1900)
    return () => clearTimeout(t)
  }, [k])
  useEffect(() => { if (measure.current) setWidth(measure.current.offsetWidth) }, [k])
  return (
    <h1 className={s.h1}>
      <span className="sr-only">The best React calendar, with everything built in.</span>
      <span aria-hidden>
        {WORDS.map((w, i) => <span key={i}><span className={s.w} style={delay(i)}>{w}</span>{' '}</span>)}
        <br />
        <span className={`${s.w} ${s.with}`} style={delay(WORDS.length)}>with</span>{' '}
        <span className={s.w} style={delay(WORDS.length + 1)}>
          <span className={s.swap} style={{ width }}>
            {PHRASES.map((p, i) => <span key={p} className={`${s.phrase} ${i === k ? s.on : i === (k + PHRASES.length - 1) % PHRASES.length ? s.leave : s.enter}`}>{p}</span>)}
          </span>
        </span>
        <span ref={measure} className={s.measure}>{PHRASES[k]}</span>
      </span>
    </h1>
  )
}
