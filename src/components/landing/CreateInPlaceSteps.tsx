'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import s from './CreateInPlace.module.css'

const STEPS = [
  { title: 'Click or drag over free time', body: 'A quick card opens right beside it.' },
  { title: 'Type a sentence', body: 'Dates and times are understood, in English and French.' },
  { title: 'Undo anything', body: 'Every change can be undone for six seconds.' },
]
const TEXT = 'Lunch with Lea tomorrow 1pm for 2h'
const TIMES = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM']
const RM = '(prefers-reduced-motion: reduce)'

const useReducedMotion = () => useSyncExternalStore(
  (cb) => { const m = matchMedia(RM); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
  () => matchMedia(RM).matches,
  () => false,
)

export function CreateInPlaceSteps() {
  const reduce = useReducedMotion()
  const [cur, setCur] = useState(0)
  const [hovered, setHovered] = useState(false)
  const resumed = useRef(false)

  useEffect(() => {
    if (reduce || hovered) return
    const t = setTimeout(() => { resumed.current = false; setCur((c) => (c + 1) % 3) }, resumed.current ? 3000 : 5500)
    return () => clearTimeout(t)
  }, [cur, hovered, reduce])

  const hover = (h: boolean) => { resumed.current = !h; setHovered(h) }

  return (
    <div className={`${s.split} ${hovered ? s.paused : ''}`} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <div className={s.steps} role="tablist" aria-label="Create an event">
        {STEPS.map((st, i) => (
          <button key={st.title} type="button" role="tab" id={`cip-tab-${i}`} aria-selected={cur === i} aria-controls={`cip-panel-${i}`} tabIndex={cur === i ? 0 : -1}
            className={s.step} onClick={() => { resumed.current = false; setCur(i) }}>
            <span className={s.n}>0{i + 1}</span><span className={s.stepTitle}>{st.title}</span>
            <span className={s.stepBody}>{st.body}</span>
            <span className={s.bar}><i className={s.fill} key={cur === i ? 'on' : 'off'} /></span>
          </button>
        ))}
      </div>

      <div className={s.stage}>
        <div className={`${s.scene} ${s.s1} ${cur === 0 ? s.on : ''}`} role="tabpanel" id="cip-panel-0" aria-labelledby="cip-tab-0">
          <div className={s.crop} role="img" aria-label="Quick card next to a new event" />
        </div>
        <TypeScene active={cur === 1} reduce={reduce} />
        <div className={`${s.scene} ${s.s3} ${cur === 2 ? s.on : ''}`} role="tabpanel" id="cip-panel-2" aria-labelledby="cip-tab-2">
          <div className={s.crop} role="img" aria-label="Event card beside an event" />
          <div className={s.toast}>
            <svg className={s.ring} viewBox="0 0 20 20" aria-hidden><circle className={s.ringC} cx="10" cy="10" r="8" /></svg>Event duplicated<span className={s.undo}>Undo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypeScene({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active || reduce) return
    let iv: ReturnType<typeof setInterval>, fin: ReturnType<typeof setTimeout>
    const start = setTimeout(() => {
      let k = 0
      iv = setInterval(() => {
        setN(++k)
        if (k >= TEXT.length) { clearInterval(iv); fin = setTimeout(() => setDone(true), 500) }
      }, 55)
    }, 400)
    return () => { clearTimeout(start); clearInterval(iv); clearTimeout(fin); setN(0); setDone(false) }
  }, [active, reduce])

  const parsed = done || reduce
  const typed = parsed ? 'Lunch with Lea' : TEXT.slice(0, n)
  const started = parsed || n > 0
  return (
    <div className={`${s.scene} ${s.s2} ${active ? s.on : ''}`} role="tabpanel" id="cip-panel-1" aria-labelledby="cip-tab-1">
      <div className={s.times} aria-hidden>{TIMES.map((t) => <div key={t} className={s.t}>{t}</div>)}</div>
      <div className={s.col} />
      <div className={`${s.ev} ${parsed ? s.saved : s.draft}`}>
        <span>{started ? typed : '(No title)'}</span>
        <span className={s.sm}>{parsed ? '1:00 PM – 3:00 PM' : '11:00 AM – 12:00 PM'}</span>
      </div>
      <div className={s.qc}>
        <div className={s.title}><span>{typed}</span>{!reduce && <span className={s.caret} />}{!started && <span className={s.ph}>Add title</span>}</div>
        <div className={`${s.row} ${parsed ? s.flash : ''}`}>
          <svg className={s.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          <span><b className={s.whenB}>{parsed ? 'Tomorrow, 1:00 PM – 3:00 PM' : 'Today, 11:00 AM – 12:00 PM'}</b><span className={s.sub}>GMT+2 · Does not repeat</span></span>
        </div>
        <div className={s.row}><svg className={s.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5M16 5.5a3 3 0 010 5.6M18.5 14.8c1 .7 1.7 1.9 2 4.2" /></svg>Add guests</div>
        <div className={s.row}><svg className={s.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>Add location</div>
        <div className={s.foot}><span>More options</span><span className={s.save}>Save</span></div>
      </div>
    </div>
  )
}
