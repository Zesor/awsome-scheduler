import Link from 'next/link'
import s from './Upgrade.module.css'

const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M5 12l4.5 4.5L19 7" /></svg>

export function Upgrade() {
  return (
    <section className={s.upgrade}>
      <div className="wrap">
        <Link className={s.up} href="/docs/migration" data-reveal>
          <div className={s.l}>
            <span className="eyebrow">Upgrading from 1.x</span>
            <h2>Your 1.4 code still runs.</h2>
            <p>Every 1.4 example is part of the 2.0 test suite.</p>
            <span className={s.more}>Read the migration guide<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </div>
          <div className={s.r}>
            <div className={`${s.diff} mono`}><span className={s.m}>- &quot;calendarkit-pro&quot;: &quot;^1.4.1&quot;</span><br /><span className={s.p}>+ &quot;calendarkit-pro&quot;: &quot;^2.0.0&quot;</span></div>
            <ul className={s.todo}>
              <li><Check /><span>No Tailwind setup anymore</span></li>
              <li><Check /><span><code>theme=&quot;vivid&quot;</code> for the 1.x look</span></li>
              <li><Check /><span><code>cn</code> is no longer exported</span></li>
            </ul>
          </div>
        </Link>
      </div>
    </section>
  )
}
