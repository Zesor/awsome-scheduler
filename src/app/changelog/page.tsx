import { DocsHeader } from '@/components/docs/DocsHeader'
import { PreToggle } from '@/components/changelog/PreToggle'
import { ReleaseView } from '@/components/changelog/ReleaseView'
import { loadChangelog } from '@/lib/changelog'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumb, docMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import s from './changelog.module.css'

export const metadata = docMetadata({ seoTitle: 'CalendarKit Pro Changelog and Release Notes', description: 'Release notes for calendarkit-pro: 2.0.0 and every earlier release, with added, changed and fixed items by version.', url: '/changelog' })

export default function Changelog() {
  const releases = loadChangelog()
  return (
    <>
      <DocsHeader />
      <main className={s.wrap}>
        <JsonLd data={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Changelog', path: '/changelog' }])]} />
        <h1>Changelog</h1>
        <p className={s.sub}>Every release of calendarkit-pro. <a href={`${site.repo}/releases`}>GitHub releases</a></p>
        <PreToggle />
        {releases.map((r, i) => <ReleaseView key={r.version} release={r} latest={i === 0} />)}
      </main>
    </>
  )
}
