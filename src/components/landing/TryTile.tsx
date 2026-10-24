'use client'
import { useDemo, type Layout, type Theme } from './DemoContext'
import s from './LayoutsThemes.module.css'

type Props = { kind: 'layout'; value: Layout } | { kind: 'theme'; value: Theme }

export function TryTile({ name, desc, i, children, ...p }: Props & { name: string; desc: string; i: number; children: React.ReactNode }) {
  const { setLayout, setTheme, focusHero } = useDemo()
  return (
    <button type="button" className={`tile ${p.kind === 'layout' ? 'wide ' : ''}${s.t}`} data-reveal style={{ '--i': i } as React.CSSProperties}
      aria-label={`Try the ${name} ${p.kind} in the demo above`}
      onClick={() => { if (p.kind === 'layout') setLayout(p.value); else setTheme(p.value); focusHero() }}>
      {children}
      <div className="txt"><div><h3>{name}</h3><p>{desc}</p></div><span className={`go ${s.goF}`} aria-hidden="true">Try it ↑</span></div>
    </button>
  )
}
