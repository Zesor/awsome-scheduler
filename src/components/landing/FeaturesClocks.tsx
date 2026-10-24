'use client'
import { useEffect, useState } from 'react'
import s from './Features.module.css'

const fmt = (tz: string) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())

// "--:--" on the server and first paint, so hydration matches; real times after mount.
export function FeaturesClocks() {
  const [t, setT] = useState<[string, string]>(['--:--', '--:--'])
  useEffect(() => {
    const tick = () => setT([fmt('Europe/Paris'), fmt('America/New_York')])
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className={s.clocks}>
      <div className={s.c}><small>Paris</small><b>{t[0]}</b></div>
      <div className={s.c}><small>New York</small><b>{t[1]}</b></div>
    </div>
  )
}
