import { readMeta, renderDoc, type DocPage } from '@/lib/docs'
import { NAV, docUrl } from '@/lib/docs-nav'
import { site } from '@/lib/site'
import s from '@/app/docs/docs.module.css'
import { CodeCopy } from './CodeCopy'
import { LiveExample } from './LiveExample'
import { Pager } from './Pager'
import { PropsTable } from './PropsTable'
import { Toc } from './Toc'
import { IntroExtras } from './IntroExtras'

export async function DocPageView({ page }: { page: DocPage }) {
  const { html, headings } = await renderDoc(page)
  const meta = readMeta()
  const i = NAV.findIndex((p) => p.slug === page.slug)
  const toc = [...(page.live ? [{ depth: 2 as const, id: 'live-example', text: 'Live example' }] : []), ...headings.filter((h) => h.depth === 2), ...(page.slug === '' ? [{ depth: 2 as const, id: 'core-concepts', text: 'Core concepts' }, { depth: 2 as const, id: 'entry-points', text: 'Entry points' }] : []), ...(page.props.length ? [{ depth: 2 as const, id: 'props', text: 'Props' }] : [])]
  return (
    <>
      <main className={s.main}>
        <div className={s.crumb}><b>{page.group}</b> / {page.title}</div>
        <h1 className={s.h1}>{page.title}</h1>
        {!page.markdown.trimStart().startsWith(page.lede.trim()) && <p className={s.lede}>{page.lede}</p>}
        {page.live && <LiveExample kind={page.live} />}
        <article className={s.prose} dangerouslySetInnerHTML={{ __html: html }} />
        {page.slug === '' && <IntroExtras />}
        {page.props.length > 0 && <PropsTable props={page.props} />}
        <Pager prev={NAV[i - 1]} next={NAV[i + 1]} related={page.related} />
        <div className={s.meta}>
          <span>From <span className="mono">{page.sourceFile === 'guide.md' ? 'docs/guide.md' : page.sourceFile === 'api.md' ? 'docs/api.md' : page.sourceFile}</span> at v{meta.version} · Last updated {meta.syncedAt}</span>
          <a href={`${site.repo}/blob/main/${page.sourceFile === 'guide.md' || page.sourceFile === 'api.md' ? 'docs/' : ''}${page.sourceFile}`}>Edit on GitHub</a>
        </div>
        <CodeCopy />
      </main>
      <Toc items={toc} />
    </>
  )
}
export { docUrl }
