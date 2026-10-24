import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, cpSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { loadDocs, renderDoc, readMeta } from './docs.ts'
import { NAV } from './docs-nav.ts'

test('every nav page loads from the synced content, with its props', () => {
  const pages = loadDocs('content')
  assert.equal(pages.length, NAV.length)
  const grid = pages.find((p) => p.slug === 'time-grid')!
  assert.match(grid.markdown, /dayStartHour/)
  assert.deepEqual(grid.props.map((p) => p.name), ['dayStartHour', 'dayEndHour', 'slotDuration', 'reverseTimeAxis', 'workingHours', 'scrollToHour'])
  assert.equal(pages[0].url, '/docs')
  assert.match(pages[0].markdown, /## Installation/)
})

test('every page renders without a dangling link', async () => {
  for (const page of loadDocs('content')) {
    const { html } = await renderDoc(page)
    assert.ok(html.length > 200, page.slug)
  }
})

test('an unmapped guide heading fails the load, naming it', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ck-docs-'))
  cpSync('content', dir, { recursive: true })
  writeFileSync(join(dir, 'guide.md'), readGuide() + '\n## Brand new section\n\ntext\n')
  assert.throws(() => loadDocs(dir), /guide.md heading "Brand new section" is not in docs-nav.ts/)
})

test('a prop missing from api.md fails the load, naming it', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ck-docs-'))
  cpSync('content', dir, { recursive: true })
  writeFileSync(join(dir, 'api.md'), readApi().replace(/^\| `slotDuration`.*$/m, ''))
  assert.throws(() => loadDocs(dir), /Prop "slotDuration" \(page time-grid\) is not in api.md/)
})

test('meta.json is read and validated', () => {
  assert.match(readMeta('content').version, /^\d+\.\d+\.\d+/)
  const dir = mkdtempSync(join(tmpdir(), 'ck-docs-'))
  writeFileSync(join(dir, 'meta.json'), '{"ref":"x"}')
  assert.throws(() => readMeta(dir), /content\/meta.json is malformed/)
})

function readGuide() { return readFileSync('content/guide.md', 'utf8') }
function readApi() { return readFileSync('content/api.md', 'utf8') }
