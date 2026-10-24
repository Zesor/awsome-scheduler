import { readContent, readMeta } from './docs.ts'
import { splitSections, toPlainText } from './markdown.ts'

export type ChangeKind = 'highlights' | 'added' | 'changed' | 'fixed' | 'removed' | 'deprecated' | 'internal' | 'other'
export type Release = { version: string; date?: string; intro: string; groups: { kind: ChangeKind; title: string; markdown: string }[]; summary: string; prereleases: Release[] }

const VERSION = /^\d+\.\d+\.\d+(-[\w.]+)?$/
const KINDS: Record<string, ChangeKind> = { highlights: 'highlights', added: 'added', features: 'added', changed: 'changed', fixed: 'fixed', 'bug fixes': 'fixed', removed: 'removed', deprecated: 'deprecated', internal: 'internal' }

export function parseChangelog(md: string, dates: Record<string, string>): Release[] {
  const all: Release[] = []
  for (const s of splitSections(md, 2).sections) {
    if (!VERSION.test(s.title)) break // everything after the last numbered release is the old 1.x block
    const { preamble, sections } = splitSections(s.body, 3)
    const groups = sections.map((g) => ({ kind: KINDS[g.title.toLowerCase()] ?? 'other', title: g.title, markdown: g.body }))
    const firstBullet = groups[0]?.markdown.split('\n').find((l) => l.startsWith('- ')) ?? ''
    all.push({ version: s.title, date: dates[s.title], intro: preamble, groups, summary: toPlainText(firstBullet.slice(2)), prereleases: [] })
  }
  const stable = all.filter((r) => !r.version.includes('-'))
  for (const pre of all.filter((r) => r.version.includes('-'))) stable.find((r) => r.version === pre.version.split('-')[0])?.prereleases.push(pre)
  return stable
}

export function loadChangelog(dir = 'content'): Release[] {
  return parseChangelog(readContent('CHANGELOG.md', dir), readMeta(dir).releaseDates)
}
