'use client'
import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const copy = async () => {
    try { await navigator.clipboard.writeText(command) } catch { return }
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 1400)
  }
  const btn = (
    <button type="button" className={`btn btn2 mono ${done ? 'done' : ''} ${className ?? ''}`} onClick={copy} aria-label={`Copy ${command}`}>
      <span className="prompt">$</span>{command}
      <span className="copy" aria-hidden="true">{done ? <><Check size={15} />Copied</> : <Copy size={15} />}</span>
    </button>
  )
  return (
    <>
      {btn}
      <span className="sr-only" role="status">{done ? 'Copied' : ''}</span>
    </>
  )
}
