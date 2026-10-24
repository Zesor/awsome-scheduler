'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- the stored theme is unknown on the server, so the icon waits for mount
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'
  return (
    <button type="button" className={className} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setTheme(dark ? 'light' : 'dark')}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
