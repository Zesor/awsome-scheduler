'use client'
import { createContext, useCallback, useContext, useState } from 'react'

export type Theme = 'calm' | 'vivid' | 'editorial'
export type Layout = 'classic' | 'focus' | 'flow'
type Demo = { theme: Theme; setTheme: (t: Theme) => void; layout: Layout; setLayout: (l: Layout) => void; focusHero: () => void }
const Ctx = createContext<Demo | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('calm')
  const [layout, setLayout] = useState<Layout>('classic')
  const focusHero = useCallback(() => document.getElementById('try')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }), [])
  return <Ctx.Provider value={{ theme, setTheme, layout, setLayout, focusHero }}>{children}</Ctx.Provider>
}

export function useDemo() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemo outside DemoProvider')
  return v
}
