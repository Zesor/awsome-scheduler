import Link from 'next/link'
import { NAV, docUrl, type NavPage } from '@/lib/docs-nav'
import s from '@/app/docs/docs.module.css'

export function Pager({ prev, next, related }: { prev?: NavPage; next?: NavPage; related: string[] }) {
  return (
    <>
      {related.length > 0 && (
        <div className={s.related}><h2 id="related">Related</h2><ul>{related.map((slug) => { const p = NAV.find((n) => n.slug === slug)!; return <li key={slug}><Link href={docUrl(slug)}>{p.title}</Link></li> })}</ul></div>
      )}
      <div className={s.pager}>
        {prev ? <Link href={docUrl(prev.slug)}><small>Previous</small><b>{prev.title}</b></Link> : <span />}
        {next ? <Link className={s.next} href={docUrl(next.slug)}><small>Next</small><b>{next.title}</b></Link> : <Link className={s.next} href="/changelog"><small>Next</small><b>Changelog</b></Link>}
      </div>
    </>
  )
}
