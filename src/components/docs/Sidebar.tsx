'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GROUPS, NAV, docUrl } from '@/lib/docs-nav'
import s from '@/app/docs/docs.module.css'
import { Search } from './Search'

export function Sidebar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={`${s.iconBtn} ${s.drawerBtn}`} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={16} /> : <Menu size={16} />}</button>
      <nav className={`${s.nav} ${open ? s.open : ''}`} aria-label="Docs">
        <Search />
        {GROUPS.map((g) => (
          <div className={s.grp} key={g}>
            <h4>{g}</h4>
            {NAV.filter((p) => p.group === g).map((p) => (
              <Link key={p.slug} href={docUrl(p.slug)} className={path === docUrl(p.slug) ? s.on : undefined} aria-current={path === docUrl(p.slug) ? 'page' : undefined} onClick={() => setOpen(false)}>{p.title}</Link>
            ))}
            {g === 'Reference' && <Link href="/changelog">Changelog</Link>}
          </div>
        ))}
      </nav>
    </>
  )
}
