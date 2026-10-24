import { DocsHeader } from '@/components/docs/DocsHeader'
import { Sidebar } from '@/components/docs/Sidebar'
import s from './docs.module.css'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsHeader />
      <div className={s.layout}><Sidebar />{children}</div>
    </>
  )
}
