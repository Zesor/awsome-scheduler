import { ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CopyCommand } from '@/components/ui/CopyCommand'
import { site } from '@/lib/site'
import { HeroHeadline } from './HeroHeadline'
import { HeroTry } from './HeroTry'
import s from './Hero.module.css'

export function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.gridBg} />
      <div className={s.inner}>
        <Link className={`${s.badge} ${s.in}`} href="/changelog#2.0.0" style={{ animationDelay: '0ms' }}><span className={s.tag}>2.0</span>Redesigned, accessible, ready for phones<ChevronRight size={12} strokeWidth={2} aria-hidden /></Link>
        <HeroHeadline />
        <p className={`${s.lead} ${s.in}`} style={{ animationDelay: '520ms' }}>CalendarKit Pro is the complete React calendar. Five views, events created from a sentence, drag and drop, recurring events, time zones and a real phone layout. Free and MIT licensed.</p>
        <div className={`${s.ctas} ${s.in}`} style={{ animationDelay: '640ms' }}>
          <Link className="btn btn1" href="/docs">Get started, it&apos;s free<ArrowRight size={16} /></Link>
          <CopyCommand command="npm i calendarkit-pro" />
        </div>
        <div className={`${s.proof} ${s.in}`} style={{ animationDelay: '760ms' }}>
          <a className={s.chip} href={site.npm}><svg viewBox="0 0 22 22" aria-hidden="true"><rect width="22" height="22" rx="5" fill="#CB3837" /><path d="M5 7h12v8h-6V8.6H9.3V15H5z" fill="#fff" /><path d="M11 8.6h1.7V13H11z" fill="#CB3837" /></svg><span><b>{site.installs}</b> installs</span></a>
          <a className={s.chip} href={site.license}><svg viewBox="0 0 22 22" aria-hidden="true"><rect width="22" height="22" rx="5" fill="#A31F34" /><text x="11" y="14.6" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.6" fontWeight="700" fill="#fff" letterSpacing=".2">MIT</text></svg><span><b>MIT</b> licensed</span></a>
          <Link className={s.chip} href="/docs/api"><svg viewBox="0 0 22 22" aria-hidden="true"><rect width="22" height="22" rx="5" fill="#3178C6" /><text x="19.2" y="18.6" textAnchor="end" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#fff">TS</text></svg><span><b>TypeScript</b> types included</span></Link>
        </div>
        <HeroTry />
      </div>
    </section>
  )
}
