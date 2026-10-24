import type { DocPage } from './docs.ts'
import { slugify, splitSections, toPlainText } from './markdown.ts'
import type { SearchEntry } from './search-match.ts'

export { search, type SearchEntry } from './search-match.ts'

export function buildIndex(pages: DocPage[]): SearchEntry[] {
  const out: SearchEntry[] = []
  for (const p of pages) {
    const depth = p.source === 'guide' ? 3 : 2
    const { preamble, sections } = splitSections(p.markdown, depth)
    out.push({ url: p.url, page: p.title, heading: '', text: toPlainText(`${p.lede} ${preamble} ${p.props.map((x) => x.name).join(' ')}`) })
    for (const s of sections) out.push({ url: `${p.url}#${slugify(s.title)}`, page: p.title, heading: s.title, text: toPlainText(s.body) })
  }
  return out
}
