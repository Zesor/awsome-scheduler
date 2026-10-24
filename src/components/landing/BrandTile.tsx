'use client'
import Link from 'next/link'
import { useState } from 'react'
import s from './LayoutsThemes.module.css'

const SW = [{ c: '#0b7285', r: '10px' }, { c: '#7c3aed', r: '999px' }, { c: '#e8590c', r: '4px' }, { c: '#111111', r: '8px' }]

export function BrandTile({ i }: { i: number }) {
  const [v, setV] = useState(SW[0])
  return (
    <div className={`tile wide ${s.vars}`} data-reveal style={{ '--i': i, '--sw': v.c, '--rd': v.r } as React.CSSProperties}>
      <div className="viz">
        <div className={`mono ${s.code}`} aria-hidden="true">.ck-root {'{'}<br />&nbsp;&nbsp;<i>--ck-primary</i>: <u>{v.c}</u>;<br />&nbsp;&nbsp;<i>--ck-radius</i>: <span>{v.r}</span>;<br />{'}'}</div>
        <div className={s.demo} aria-hidden="true"><span className={s.btn}>Create</span><span className={s.ev}>Design review</span></div>
        <div className={s.sw}>
          {SW.map((x) => (
            <button key={x.c} type="button" aria-pressed={v.c === x.c} aria-label={`Use colour ${x.c}, radius ${x.r}`} style={{ background: x.c }}
              onMouseEnter={() => setV(x)} onFocus={() => setV(x)} onClick={() => setV(x)} />
          ))}
        </div>
      </div>
      <div className="txt"><div><h3><Link className={s.lnk} href="/docs/theming">Your brand</Link></h3><p>Every colour is a CSS variable.</p></div><span className="go" aria-hidden="true">Docs →</span></div>
    </div>
  )
}
