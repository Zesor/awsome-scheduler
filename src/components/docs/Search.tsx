'use client'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { Search as Icon } from 'lucide-react'
import { search, type SearchEntry } from '@/lib/search-match'
import s from '@/app/docs/docs.module.css'

export function Search() {
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [q, setQ] = useState('')
  const loading = useRef(false)
  const load = () => { if (loading.current) return; loading.current = true; fetch('/search-index.json').then((r) => r.json()).then(setIndex) }
  const results = useMemo(() => (index ? search(index, q) : []), [index, q])
  return (
    <div className={s.searchWrap} role="search">
      <label className={s.search}><Icon size={15} aria-hidden /><input type="search" placeholder="Search the docs" value={q} onFocus={load} onChange={(e) => setQ(e.target.value)} aria-label="Search the docs" aria-controls="search-results" /></label>
      {q.trim() && (
        <ul id="search-results" className={s.results} aria-live="polite">
          {results.length === 0 && <li className={s.none}>{index ? 'No results' : 'Loading…'}</li>}
          {results.map((r) => <li key={r.url}><Link href={r.url} onClick={() => setQ('')}><b>{r.heading || r.page}</b>{r.heading && <small>{r.page}</small>}<span>{r.text.slice(0, 90)}</span></Link></li>)}
        </ul>
      )}
    </div>
  )
}
