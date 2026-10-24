import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { NAV, docUrl, type NavPage } from './docs-nav.ts'
import { extractProps, renderMarkdown, slugify, splitSections, type Heading, type LinkMap, type Prop } from './markdown.ts'

export type DocPage = Omit<NavPage, 'props'> & { url: string; markdown: string; sourceFile: string; props: Prop[] }
type Meta = { ref: string; version: string; syncedAt: string; releaseDates: Record<string, string> }

const LICENSE = 'https://github.com/Zesor/calendarkit-pro/blob/main/LICENSE'
const README_SECTIONS = ['Installation', 'Quick start'] // shown on /docs, in this order
const cache = new Map<string, DocPage[]>()

export const readContent = (name: string, dir = 'content') => readFileSync(join(dir, name), 'utf8')

export function readMeta(dir = 'content'): Meta {
  const meta = JSON.parse(readContent('meta.json', dir))
  if (typeof meta.ref !== 'string' || typeof meta.version !== 'string' || typeof meta.syncedAt !== 'string' || typeof meta.releaseDates !== 'object') {
    throw new Error('content/meta.json is malformed: expected ref, version, syncedAt, releaseDates (run npm run sync-docs)')
  }
  return meta
}

export function linkMap(dir = 'content'): LinkMap {
  const anchors = new Map<string, string>()
  for (const s of splitSections(readContent('guide.md', dir), 2).sections) {
    const page = NAV.find((p) => p.source === 'guide' && p.title === s.title)
    if (!page) continue // loadDocs reports it
    anchors.set(`guide.md#${s.slug}`, docUrl(page.slug))
    for (const sub of splitSections(s.body, 3).sections) anchors.set(`guide.md#${sub.slug}`, `${docUrl(page.slug)}#${sub.slug}`)
  }
  const headingIds = (file: string, url: string) => {
    for (const line of readContent(file, dir).split('\n')) {
      const m = line.match(/^#{2,3} (.+)$/)
      if (m) anchors.set(`${file}#${slugify(m[1])}`, `${url}#${slugify(m[1])}`)
    }
  }
  headingIds('api.md', '/docs/api')
  headingIds('MIGRATION.md', '/docs/migration')
  headingIds('README.md', '/docs')
  return { anchors, files: { 'guide.md': '/docs', 'api.md': '/docs/api', 'MIGRATION.md': '/docs/migration', 'CHANGELOG.md': '/changelog', 'README.md': '/docs', LICENSE } }
}

export function loadDocs(dir = 'content'): DocPage[] {
  const hit = cache.get(dir)
  if (hit) return hit
  const guide = splitSections(readContent('guide.md', dir), 2).sections
  for (const s of guide) if (!NAV.some((p) => p.source === 'guide' && p.title === s.title)) throw new Error(`guide.md heading "${s.title}" is not in docs-nav.ts`)
  const props = extractProps(readContent('api.md', dir))
  const readme = splitSections(readContent('README.md', dir), 2).sections
  const pages = NAV.map((nav): DocPage => {
    let markdown: string
    let sourceFile: string
    if (nav.source === 'guide') {
      const s = guide.find((g) => g.title === nav.title)
      if (!s) throw new Error(`docs-nav.ts page "${nav.title}" has no "## ${nav.title}" in guide.md`)
      markdown = s.body; sourceFile = 'guide.md'
    } else if (nav.source === 'readme') {
      markdown = README_SECTIONS.map((t) => {
        const s = readme.find((r) => r.title === t)
        if (!s) throw new Error(`README.md has no "## ${t}"`)
        return `## ${t}\n\n${s.body}`
      }).join('\n'); sourceFile = 'README.md'
    } else {
      sourceFile = nav.source === 'api' ? 'api.md' : 'MIGRATION.md'
      markdown = readContent(sourceFile, dir).replace(/^# .*\n/, '') // the page h1 replaces the file title
    }
    const pageProps = nav.props.map((name) => {
      const p = props.get(name)
      if (!p) throw new Error(`Prop "${name}" (page ${nav.slug}) is not in api.md`)
      return p
    })
    return { ...nav, url: docUrl(nav.slug), markdown, sourceFile, props: pageProps }
  })
  cache.set(dir, pages)
  return pages
}

export async function renderDoc(page: DocPage, dir = 'content'): Promise<{ html: string; headings: Heading[] }> {
  // Guide sections are written under "## Title" with "### " subsections: the page h1 is the title, so subsections become h2.
  return renderMarkdown(page.markdown, { fromFile: page.sourceFile, map: linkMap(dir), shiftHeadings: page.source === 'guide' ? -1 : 0 })
}
