'use client'
import { useState } from 'react'
import { CopyCommand } from '@/components/ui/CopyCommand'
import s from './GetStarted.module.css'

const PMS = [['npm', 'npm i calendarkit-pro'], ['pnpm', 'pnpm add calendarkit-pro'], ['yarn', 'yarn add calendarkit-pro'], ['bun', 'bun add calendarkit-pro']]

export function InstallTabs() {
  const [cur, setCur] = useState(0)
  return (
    <>
      <div className={s.pm} role="group" aria-label="Package manager">
        {PMS.map(([n], i) => <button key={n} type="button" aria-pressed={cur === i} onClick={() => setCur(i)}>{n}</button>)}
      </div>
      <CopyCommand command={PMS[cur][1]} className={s.cmd} />
    </>
  )
}
