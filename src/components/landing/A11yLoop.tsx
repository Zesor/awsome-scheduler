'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import s from './PhonesA11y.module.css'

const LINES = ['Create an event on Thursday 15 October at 9:00 AM', 'Design review, Thursday 15 October, 10:00 AM to 11:45 AM, Work calendar, Room B']
const RM = '(prefers-reduced-motion: reduce)'
const useReducedMotion = () => useSyncExternalStore(
  (cb) => { const m = matchMedia(RM); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
  () => matchMedia(RM).matches,
  () => false,
)

// Decorative: a focus ring walks from a slot to an event and the announced name changes.
export function A11yLoop() {
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  const [down, setDown] = useState(false)
  const keyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setDown(true)
      clearTimeout(keyTimer.current)
      keyTimer.current = setTimeout(() => setDown(false), 220)
    }, 2800)
    return () => { clearInterval(id); clearTimeout(keyTimer.current) }
  }, [reduce])

  const onEvent = reduce || tick % 2 === 1
  return (
    <div className="viz" aria-hidden="true">
      <div className={s.hrs}><div>9 AM</div><div>10 AM</div><div>11 AM</div><div>12 PM</div><div>1 PM</div></div>
      <div className={s.grid} />
      <div className={s.slot} />
      <div className={s.event}>Design review<small>10:00 AM – 11:45 AM · Room B</small></div>
      <div className={`${s.ring} ${onEvent ? s.onEvent : ''}`} />
      <div className={s.keys}><kbd className={down ? s.down : ''}>Tab</kbd><kbd>Enter</kbd></div>
      <div className={s.sr}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /></svg>
        <span>{LINES[onEvent ? 1 : 0]}</span>
      </div>
    </div>
  )
}
