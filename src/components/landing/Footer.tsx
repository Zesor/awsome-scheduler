import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { site } from '@/lib/site'
import s from './Footer.module.css'

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.cols} data-reveal>
          <div>
            <div className={s.logo}><Logo />CalendarKit</div>
            <p className={s.tag}>The best React calendar, with everything built in.</p>
          </div>
          <nav className={s.col} aria-label="Product">
            <h2>Product</h2>
            <Link href="/docs">Docs</Link><Link href="/docs/api">API reference</Link><Link href="/changelog">Changelog</Link><Link href="/docs/migration">Migration</Link>
          </nav>
          <nav className={s.col} aria-label="Open source">
            <h2>Open source</h2>
            <a href={site.repo}>GitHub</a><a href={site.npm}>npm</a><a href={site.issues}>Issues</a><a href={site.license}>License</a>
          </nav>
          <div className={s.col}>
            <h2>Contact</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className={s.bottom}><span>© 2026 CalendarKit. MIT licensed.</span><span>Made by Illyas Chihi</span></div>
      </div>
    </footer>
  )
}
