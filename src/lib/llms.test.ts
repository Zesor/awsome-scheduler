import { test } from 'node:test'
import assert from 'node:assert/strict'
import { llmsTxt, llmsFull, pageMarkdown } from './llms.ts'
import { loadDocs } from './docs.ts'

const pages = loadDocs('content')

test('llms.txt: title, summary, one link per docs page with its description', () => {
  const txt = llmsTxt(pages)
  assert.match(txt, /^# CalendarKit Pro\n\n> CalendarKit Pro \(calendarkit-pro on npm\) is a free, MIT-licensed/)
  for (const p of pages) assert.ok(txt.includes(`](https://calendarkit.io${p.url}.md): ${p.description}`), p.slug)
})

test('page markdown starts with the page title and keeps code, with site links', () => {
  const md = pageMarkdown(pages.find((p) => p.slug === 'time-grid')!)
  assert.match(md, /^# Time grid\n/)
  assert.match(md, /```tsx/)
  assert.doesNotMatch(md, /\]\(guide\.md|\]\(#/)
})

test('llms-full.txt contains every page once', () => {
  const full = llmsFull(pages)
  for (const p of pages) assert.equal(full.split(`\n# ${p.title}\n`).length - 1 + (full.startsWith(`# ${p.title}\n`) ? 1 : 0), 1, p.slug)
})
