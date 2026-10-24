import Link from 'next/link'
import { FeaturesViews } from './FeaturesViews'
import { FeaturesClocks } from './FeaturesClocks'
import s from './Features.module.css'

const cx = (...a: string[]) => a.join(' ')
const rv = (i: number) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties })
const Pin = ({ solid }: { solid?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />{!solid && <circle cx="12" cy="10" r="2.3" />}</svg>
)
const Txt = ({ h, p }: { h: string; p: string }) => (
  <div className="txt"><div><h3>{h}</h3><p>{p}</p></div><span className="go">Docs →</span></div>
)
const ALSO = ['English and French', '10,000 events', 'Server rendering', 'Headless core', 'Zero CSS setup']
const HOURS = ['8', '9', '10', '11', '12', '13']

export function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Features</span>
        <h2 className="h2" data-reveal style={{ '--i': 1 } as React.CSSProperties}>Everything a calendar needs.<br /><span className="soft">Nothing left to build.</span></h2>

        <div className={cx('bento', s.root)}>
          <FeaturesViews />

          <Link className={cx('tile', s.dnd)} href="/docs/creating-editing-and-undoing" {...rv(3)}>
            <div className="viz"><div className={s.grid} /><div className={cx(s.ev, s.ghost)} /><div className={cx(s.ev, s.cb, s.mv2)}>Sprint review</div></div>
            <Txt h="Drag and drop" p="Move and stretch, snapped to your slots." />
          </Link>

          <Link className={cx('tile', s.rec)} href="/docs/recurring-events" {...rv(4)}>
            <div className="viz"><span className={s.rule}>Every Tuesday and Thursday</span>
              <div className={s.strip}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <div key={d} className={d === 'Tue' || d === 'Thu' ? s.on : undefined}>{d}</div>)}
              </div>
            </div>
            <Txt h="Recurring events" p="Daily to yearly, steady across clock changes." />
          </Link>

          <Link className={cx('tile')} href="/docs/time-zones" {...rv(5)}>
            <div className="viz"><FeaturesClocks /></div>
            <Txt h="Time zones" p="Any IANA zone. All-day events never shift." />
          </Link>

          <Link className={cx('tile')} href="/docs/time-grid" {...rv(6)}>
            <div className="viz"><div className={s.axis}>
              <div className={s.hrs}><div />{HOURS.map((h) => <div key={h}>{h}</div>)}</div>
              <div className={s.off} style={{ top: 0, height: 52 }} />
              {[26, 52, 78, 104, 130].map((t) => <div key={t} className={s.line} style={{ top: t }} />)}
              <div className={cx(s.ev, s.cg)} style={{ left: 56, right: 16, top: 60, height: 40 }}>Working hours, 9 to 18</div>
            </div></div>
            <Txt h="Time grid" p="Your hours, slot length and working hours." />
          </Link>

          <Link className={cx('tile', 'wide')} href="/docs/resource-scheduling" {...rv(7)}>
            <div className="viz"><div className={s.tl}>
              <div className={s.hours}>{['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((h) => <div key={h}>{h}</div>)}</div>
              <div className={s.lane} style={{ top: 24 }}><span>Room A</span><div className={cx(s.ev, s.cb)} style={{ left: 'calc(120px + 6%)', width: '22%' }}>Interview</div><div className={cx(s.ev, s.cb)} style={{ left: 'calc(120px + 52%)', width: '14%' }}>1:1</div></div>
              <div className={s.lane} style={{ top: 70 }}><span>Room B</span><div className={cx(s.ev, s.cg)} style={{ left: 'calc(120px + 20%)', width: '36%' }}>Training</div></div>
              <div className={s.lane} style={{ top: 116 }}><span>Lea Martin</span><div className={cx(s.ev, s.cv)} style={{ left: 'calc(120px + 2%)', width: '18%' }}>Shoot</div><div className={cx(s.ev, s.ca)} style={{ left: 'calc(120px + 44%)', width: '26%' }}>Client visit</div></div>
            </div></div>
            <Txt h="Resources" p="Rooms, people and equipment on one timeline." />
          </Link>

          <Link className={cx('tile')} href="/docs/places" {...rv(8)}>
            <div className="viz"><div className={s.field}>
              <div className={s.in}><Pin />Louvre<span className={s.caret} /></div>
              <div className={cx(s.s, s.sOn)}><Pin solid /><span>Musée du Louvre<small>Rue de Rivoli, Paris</small></span></div>
              <div className={s.s}><Pin solid /><span>Louvre-Rivoli<small>Paris 1er</small></span></div>
            </div><span className={s.osm}>OpenStreetMap</span></div>
            <Txt h="Places" p="Optional location suggestions, no key." />
          </Link>
        </div>

        <div className={s.also} data-reveal style={{ '--i': 9 } as React.CSSProperties}>{ALSO.map((a) => <span key={a}>{a}</span>)}</div>
      </div>
    </section>
  )
}
