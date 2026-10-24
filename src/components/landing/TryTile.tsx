'use client'
import { useDemo, type Layout, type Theme } from './DemoContext'
import s from './LayoutsThemes.module.css'

type Props = { kind: 'layout'; value: Layout } | { kind: 'theme'; value: Theme }

export function TryTile({ name, desc, i, children, ...p }: Props & { name: string; desc: string; i: number; children: React.ReactNode }) {
  const { layout, theme, setLayout, setTheme, focusHero } = useDemo()
  const on = (p.kind === 'layout' ? layout : theme) === p.value
  return (
    <button type="button" className={`tile ${p.kind === 'layout' ? 'wide ' : ''}${s.t}${on ? ` ${s.on}` : ''}`} aria-pressed={on} data-reveal style={{ '--i': i } as React.CSSProperties}
      aria-label={`Try the ${name} ${p.kind} in the demo above`}
      onClick={() => { if (p.kind === 'layout') setLayout(p.value); else setTheme(p.value); focusHero() }}>
      {children}
      <div className="txt"><div><span className={s.nm}>{name}</span><span className={s.ds}>{desc}</span></div><span className={`go ${s.goF}`} aria-hidden="true">Try it ↑</span></div>
    </button>
  )
}
