'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import s from './Features.module.css'

const TABS = ['Month', 'Week', 'Day', 'Agenda', 'Resource']
const cx = (...a: (string | false)[]) => a.filter(Boolean).join(' ')
const wk = (n: number): React.CSSProperties => ({ left: `calc(100%/7*${n} + 3px)`, width: 'calc(100%/7 - 6px)' })

export function FeaturesViews() {
  const [v, setV] = useState(0)
  const hold = useRef(false)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => { if (!hold.current) setV((i) => (i + 1) % TABS.length) }, 2600)
    return () => clearInterval(id)
  }, [])
  const pane = (i: number) => cx(s.pane, v === i && s.paneOn)
  return (
    <Link className={'tile wide'} href="/docs/views" data-reveal style={{ '--i': 2 } as React.CSSProperties}
      onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
      <div className="viz" aria-hidden="true">
        <div className={s.tabs}>
          {TABS.map((t, i) => <span key={t} className={cx(s.tab, v === i && s.tabOn)} onMouseEnter={() => setV(i)}>{t}</span>)}
        </div>
        <div className={pane(0)}>
          <div className={s.monthg}>
            <div>28</div><div>29</div><div>30<i className={s.mb} /></div><div>1</div><div>2<i className={s.mg} /></div><div>3</div><div>4</div>
            <div>5<i className={s.mb} /></div><div>6<i className={s.mv} /></div><div>7</div><div>8</div><div>9<i className={s.mg} /></div><div>10</div><div>11</div>
            <div>12<i className={s.mb} /></div><div>13</div><div>14<i className={s.mg} /></div><div>15<i className={s.mb} /></div><div>16</div><div>17<i className={s.ma} /></div><div>18</div>
          </div>
        </div>
        <div className={pane(1)}><div className={s.weekg} />
          <div className={cx(s.ev, s.cb)} style={{ ...wk(1), top: 20, height: 52 }}>Review</div>
          <div className={cx(s.ev, s.cg)} style={{ ...wk(2), top: 80, height: 34 }}>Lunch</div>
          <div className={cx(s.ev, s.cv)} style={{ ...wk(4), top: 36, height: 70 }}>Workshop</div>
          <div className={cx(s.ev, s.cb)} style={{ ...wk(5), top: 10, height: 40 }}>Planning</div>
        </div>
        <div className={pane(2)}><div className={s.dayg} />
          <div className={cx(s.ev, s.cb)} style={{ left: '12%', top: 14, width: '42%', height: 44 }}>Design review<br /><span style={{ opacity: 0.7 }}>10:00 – 11:30</span></div>
          <div className={cx(s.ev, s.cg)} style={{ left: '56%', top: 30, width: '40%', height: 34 }}>Coffee with Alex</div>
          <div className={cx(s.ev, s.ca)} style={{ left: '12%', top: 80, width: '84%', height: 30 }}>Focus time</div>
        </div>
        <div className={pane(3)}><div className={s.agenda}>
          <div className={s.r}><b>Mon 19</b><span className={s.cb}>Team standup · 9:00</span></div>
          <div className={s.r}><b>Tue 20</b><span className={s.cg}>Lunch with Lea · 13:00</span></div>
          <div className={s.r}><b>Wed 21</b><span className={s.cv}>Workshop · 10:00</span></div>
        </div></div>
        <div className={pane(4)}><div className={s.resg}>
          <div className={s.row} style={{ top: 0 }}>Room A</div><div className={s.row} style={{ top: 38 }}>Room B</div><div className={s.row} style={{ top: 76 }}>Studio</div>
          <div className={cx(s.ev, s.cb)} style={{ left: '24%', top: 8, width: '30%', height: 22 }}>Interview</div>
          <div className={cx(s.ev, s.cg)} style={{ left: '40%', top: 46, width: '40%', height: 22 }}>Training</div>
          <div className={cx(s.ev, s.cv)} style={{ left: '30%', top: 84, width: '22%', height: 22 }}>Shoot</div>
        </div></div>
      </div>
      <div className="txt"><div><h3>Five views</h3><p>Month, week, day, agenda and resource.</p></div><span className="go" aria-hidden="true">Docs →</span></div>
    </Link>
  )
}
