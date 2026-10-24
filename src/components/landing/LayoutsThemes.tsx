import Link from 'next/link'
import { TryTile } from './TryTile'
import { BrandTile } from './BrandTile'
import s from './LayoutsThemes.module.css'

const cx = (...a: string[]) => a.join(' ')
const Win = ({ img }: { img: string }) => (
  <div className="viz" aria-hidden="true"><div className={s.win} style={{ backgroundImage: `url(/images/${img}.png)` }} /></div>
)
const Mini = ({ m }: { m: 'l' | 'd' }) => (
  <div className={cx(s.mini, s[m])}><div className={s.hd}>October</div>
    <div className={s.days}><span>Mon 19</span><span className={s.today}>Tue 20</span><span>Wed 21</span></div>
    <div className={s.e}>Design review</div><div className={cx(s.e, s.g)}>Lunch with Lea</div></div>
)
const Pair = ({ t }: { t: string }) => (
  <div className={cx('viz', t)} aria-hidden="true"><div className={s.pair}><Mini m="l" /><Mini m="d" /></div></div>
)

export function LayoutsThemes() {
  return (
    <section className="section" id="layouts">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Layouts and themes</span>
        <h2 className="h2" data-reveal style={{ '--i': 1 } as React.CSSProperties}>Three layouts. Three themes.<br /><span className="soft">Light and dark.</span></h2>
        <div className={cx('bento', s.root)}>
          <TryTile i={2} kind="layout" value="classic" name="Classic" desc="Side panel, cards beside events."><Win img="week" /></TryTile>
          <TryTile i={3} kind="theme" value="calm" name="Calm" desc="Neutral. The default."><Pair t={s.calm} /></TryTile>
          <TryTile i={4} kind="theme" value="vivid" name="Vivid" desc="Saturated colours."><Pair t={s.vivid} /></TryTile>
          <TryTile i={5} kind="layout" value="focus" name="Focus" desc="Full-width grid, edit in a side panel."><Win img="focus" /></TryTile>
          <TryTile i={6} kind="layout" value="flow" name="Flow" desc="The day as a feed, free slots to book."><Win img="flow" /></TryTile>
          <TryTile i={7} kind="theme" value="editorial" name="Editorial" desc="Warm tones, serif titles."><Pair t={s.editorial} /></TryTile>
          <BrandTile i={8} />
          <Link className={cx('tile', s.mode)} href="/docs/theming" data-reveal style={{ '--i': 9 } as React.CSSProperties}>
            <div className="viz" aria-hidden="true">
              <div className={s.half} style={{ left: 0, background: '#fff', color: '#111' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg></div>
              <div className={s.half} style={{ right: 0, background: '#111113', color: '#eee' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg></div>
              <code className="mono">mode=&quot;system&quot;</code>
            </div>
            <div className="txt"><div><h3>Light and dark</h3><p>Or follow the system.</p></div><span className="go" aria-hidden="true">Docs →</span></div>
          </Link>
        </div>
      </div>
    </section>
  )
}
