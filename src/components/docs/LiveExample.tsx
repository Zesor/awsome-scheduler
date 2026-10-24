'use client'
import { useState } from 'react'
import type { LiveKind } from '@/lib/docs-nav'
import { DEMO_RESOURCES } from '@/lib/demo'
import { LiveScheduler } from '@/components/ui/LiveScheduler'
import s from '@/app/docs/docs.module.css'

export function LiveExample({ kind }: { kind: LiveKind }) {
  const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('week')
  const [hours, setHours] = useState<[number, number]>([7, 20])
  const [slot, setSlot] = useState(30)
  const [working, setWorking] = useState(true)
  const [reversed, setReversed] = useState(false)
  const [layout, setLayout] = useState<'classic' | 'focus' | 'flow'>('classic')
  const [theme, setTheme] = useState<'calm' | 'vivid' | 'editorial'>('calm')
  const [tz, setTz] = useState('Europe/Paris')
  const [lang, setLang] = useState<'en' | 'fr'>('en')

  const seg = <T extends string>(value: T, options: T[], set: (v: T) => void, label: string) => (
    <label>{label} <select value={value} onChange={(e) => set(e.target.value as T)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
  )
  const controls = {
    views: seg(view, ['month', 'week', 'day', 'agenda'], setView, 'View'),
    'time-grid': (<>
      <label>Hours <input type="number" min={0} max={23} value={hours[0]} onChange={(e) => setHours([Math.min(+e.target.value, hours[1] - 1), hours[1]])} /> to <input type="number" min={1} max={24} value={hours[1]} onChange={(e) => setHours([hours[0], Math.max(+e.target.value, hours[0] + 1)])} /></label>
      {seg(String(slot), ['15', '30', '60'], (v) => setSlot(+v), 'Slot (min)')}
      <label><input type="checkbox" checked={working} onChange={(e) => setWorking(e.target.checked)} /> Working hours</label>
      <label><input type="checkbox" checked={reversed} onChange={(e) => setReversed(e.target.checked)} /> Reversed</label>
    </>),
    layouts: seg(layout, ['classic', 'focus', 'flow'], setLayout, 'Layout'),
    theming: seg(theme, ['calm', 'vivid', 'editorial'], setTheme, 'Theme'),
    'time-zones': seg(tz, ['Europe/Paris', 'America/New_York', 'Asia/Tokyo'], setTz, 'Time zone'),
    i18n: seg(lang, ['en', 'fr'], setLang, 'Language'),
    resources: null,
    phone: null,
  }[kind]

  return (
    <section className={s.live} id="live-example" aria-label="Live example">
      <div className={s.bar}><b>Live example</b><div className={s.ctrl}>{controls}</div></div>
      <LiveScheduler
        lazy
        height={kind === 'phone' ? 680 : 520}
        width={kind === 'phone' ? 375 : undefined}
        minWidth={kind === 'phone' ? undefined : 768} // the docs column is under 768 px: keep the full layout and scroll
        fallback="/images/week.png"
        view={kind === 'views' ? view : kind === 'resources' ? 'resource' : undefined}
        onViewChange={kind === 'views' ? (v) => v !== 'resource' && setView(v) : undefined}
        resources={kind === 'resources' ? DEMO_RESOURCES : undefined}
        layout={kind === 'layouts' ? layout : undefined}
        theme={kind === 'theming' ? theme : undefined}
        timezone={kind === 'time-zones' ? tz : undefined}
        language={kind === 'i18n' ? lang : undefined}
        {...(kind === 'time-grid' ? { dayStartHour: hours[0], dayEndHour: hours[1], slotDuration: slot, workingHours: working ? { start: 9, end: 18 } : undefined, reverseTimeAxis: reversed } : {})}
      />
    </section>
  )
}
