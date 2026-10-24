import Link from 'next/link'
import { readMeta } from '@/lib/docs'
import { site } from '@/lib/site'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import s from '@/app/docs/docs.module.css'

export function DocsHeader() {
  return (
    <header className={s.header}>
      <div className={s.hd}>
        <Link className={s.logo} href="/">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="19" height="17.5" rx="4" stroke="currentColor" strokeWidth="1.8" /><path d="M2.5 9.5h19M8 2.5v3M16 2.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="6.5" y="12.5" width="6" height="4.5" rx="1.2" fill="currentColor" /></svg>
          CalendarKit<span className={s.sep}>/</span><span className={s.sec}>Docs</span>
        </Link>
        <nav className={s.hnav} aria-label="Site">
          <Link className={`${s.hlink} ${s.on}`} href="/docs">Docs</Link>
          <Link className={s.hlink} href="/docs/api">API</Link>
          <Link className={s.hlink} href="/changelog">Changelog</Link>
          <span className={`${s.ver} mono`}>v{readMeta().version}</span>
          <a className={s.iconBtn} href={site.repo} aria-label="GitHub"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg></a>
          <ThemeToggle className={s.iconBtn} />
        </nav>
      </div>
    </header>
  )
}
