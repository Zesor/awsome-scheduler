'use client'
import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import s from './GetStarted.module.css'

export type CodeTab = { label: string; file: string; html: string; code: string }

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [cur, setCur] = useState(0)
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try { await navigator.clipboard.writeText(tabs[cur].code) } catch { return }
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 1200)
  }
  return (
    <div className={s.editor}>
      <div className={s.tabs} role="tablist" aria-label="Code examples">
        {tabs.map((t, i) => (
          <button key={t.label} type="button" role="tab" id={`code-tab-${i}`} aria-selected={cur === i} aria-controls={`code-panel-${i}`} onClick={() => setCur(i)}>{t.label}</button>
        ))}
        <span className={s.file}>{tabs[cur].file}</span>
      </div>
      <div className={s.body}>
        <button type="button" className={s.copy} onClick={copy} aria-label={`Copy ${tabs[cur].file} example`}>
          {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}<span>{done ? 'Copied' : 'Copy'}</span>
        </button>
        <span className="sr-only" role="status">{done ? 'Copied' : ''}</span>
        {tabs.map((t, i) => (
          <div key={t.label} role="tabpanel" id={`code-panel-${i}`} aria-labelledby={`code-tab-${i}`} hidden={cur !== i} className={s.panel} dangerouslySetInnerHTML={{ __html: t.html }} />
        ))}
      </div>
    </div>
  )
}
