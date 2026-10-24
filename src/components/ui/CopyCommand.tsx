'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button type="button" className={`btn btn2 mono ${done ? 'done' : ''} ${className ?? ''}`} onClick={async () => { await navigator.clipboard.writeText(command); setDone(true); setTimeout(() => setDone(false), 1400) }} aria-label={`Copy ${command}`}>
      <span className="prompt">$</span>{command}
      <span className="copy" aria-live="polite">{done ? <><Check size={15} />Copied</> : <Copy size={15} />}</span>
    </button>
  )
}
