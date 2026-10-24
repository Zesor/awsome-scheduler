import Link from 'next/link'
import { NAV, docUrl } from '@/lib/docs-nav'

export default function NotFound() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '120px 24px' }}>
      <h1 style={{ fontSize: 40, letterSpacing: '-0.035em', margin: '0 0 12px' }}>Page not found</h1>
      <p style={{ color: 'var(--muted)', margin: '0 0 28px' }}>This page does not exist. The docs are here:</p>
      <ul style={{ lineHeight: 2 }}>{NAV.map((p) => <li key={p.slug}><Link href={docUrl(p.slug)}>{p.title}</Link></li>)}</ul>
    </main>
  )
}
