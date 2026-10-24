import Link from 'next/link'
import { linkMap } from '@/lib/docs'
import { renderMarkdown } from '@/lib/markdown'
import type { Release } from '@/lib/changelog'
import s from '@/app/changelog/changelog.module.css'

const md = async (text: string) => (await renderMarkdown(text, { fromFile: 'CHANGELOG.md', map: linkMap() })).html
const day = (iso?: string) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '')

async function Notes({ release }: { release: Release }) {
  const groups = await Promise.all(release.groups.map(async (g) => ({ ...g, html: await md(g.markdown) })))
  return (
    <div className={s.notes}>
      {release.intro && <div className={s.intro} dangerouslySetInnerHTML={{ __html: await md(release.intro) }} />}
      {groups.map((g) => (<div key={g.title}><span className={`${s.kind} ${s[g.kind === 'highlights' ? 'hi' : g.kind]}`}>{g.title}</span><div dangerouslySetInnerHTML={{ __html: g.html }} /></div>))}
    </div>
  )
}

export async function ReleaseView({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <article className={s.rel} id={release.version}>
      <div className={s.when}>
        <div className={s.v}><a href={`#${release.version}`}>{release.version}</a>{latest && <span className={s.tag}>Latest</span>}</div>
        {release.date && <time dateTime={release.date}>{day(release.date)}</time>}
      </div>
      <div>
        {release.version === '2.0.0' && <div className={s.shot}><img src="/images/week.png" alt="CalendarKit Pro 2.0 week view" /></div>}
        <Notes release={release} />
        {release.version.startsWith('2.0.0') && <div className={s.migrate}><span>Upgrading from 1.x? Every 1.4 example still runs.</span><Link href="/docs/migration">Migration guide →</Link></div>}
        {release.prereleases.length > 0 && (
          <details className={s.pre} data-pre>
            <summary><span><b>{release.prereleases.length} pre-releases</b> led to {release.version}</span><span>Show</span></summary>
            <div className={s.prelist}>
              {release.prereleases.map((p) => (
                <details key={p.version} id={p.version}>
                  <summary className={s.row}><b>{p.version}</b><span>{day(p.date)} · {p.summary}</span></summary>
                  <Notes release={p} />
                </details>
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  )
}
