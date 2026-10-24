import Link from 'next/link'
import { CopyCommand } from '@/components/ui/CopyCommand'
import s from './FinalCta.module.css'

export function FinalCta() {
  return (
    <section className={s.final}>
      <div className={s.gridBg} aria-hidden />
      <div className={`${s.in} wrap`}>
        <h2 data-reveal>Your calendar,<br /><span className={s.soft}>shipped today.</span></h2>
        <p data-reveal style={{ '--i': 1 } as React.CSSProperties}>Free and MIT licensed.</p>
        <div className={s.ctas} data-reveal style={{ '--i': 2 } as React.CSSProperties}>
          <Link className="btn btn1" href="/docs">Get started, it&apos;s free<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          <CopyCommand command="npm i calendarkit-pro" />
        </div>
      </div>
    </section>
  )
}
