import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, splitSections, resolveLink, extractProps, renderMarkdown, toPlainText, type LinkMap } from './markdown.ts'

test('slugify matches GitHub heading ids', () => {
  assert.equal(slugify('Creating, editing and undoing'), 'creating-editing-and-undoing')
  assert.equal(slugify('All-day and multi-day events'), 'all-day-and-multi-day-events')
  assert.equal(slugify('Styles and Content-Security-Policy'), 'styles-and-content-security-policy')
  assert.equal(slugify('`cn` is no longer exported'), 'cn-is-no-longer-exported')
})

test('splitSections keeps the preamble and splits on the given depth only', () => {
  const md = '# Guide\n\nintro\n\n## Views\n\n### Month View\nA\n\n## Time grid\nB\n'
  const { preamble, sections } = splitSections(md, 2)
  assert.match(preamble, /intro/)
  assert.deepEqual(sections.map((s) => [s.title, s.slug]), [['Views', 'views'], ['Time grid', 'time-grid']])
  assert.match(sections[0].body, /### Month View\nA/)
  assert.doesNotMatch(sections[0].body, /## Views/)
})

test('splitSections ignores headings inside code fences', () => {
  const { sections } = splitSections('## A\n```md\n## not a heading\n```\n## B\n', 2)
  assert.deepEqual(sections.map((s) => s.title), ['A', 'B'])
})

const map: LinkMap = {
  anchors: new Map([['guide.md#time-zones', '/docs/time-zones'], ['guide.md#styles-and-content-security-policy', '/docs/theming#styles-and-content-security-policy'], ['api.md#calendarevent', '/docs/api#calendarevent']]),
  files: { 'guide.md': '/docs', 'api.md': '/docs/api', 'MIGRATION.md': '/docs/migration', 'CHANGELOG.md': '/changelog', 'README.md': '/docs', LICENSE: 'https://github.com/Zesor/calendarkit-pro/blob/main/LICENSE' },
}

test('resolveLink rewrites every known form', () => {
  assert.equal(resolveLink('#time-zones', 'guide.md', map), '/docs/time-zones')
  assert.equal(resolveLink('guide.md#time-zones', 'api.md', map), '/docs/time-zones')
  assert.equal(resolveLink('docs/guide.md#styles-and-content-security-policy', 'README.md', map), '/docs/theming#styles-and-content-security-policy')
  assert.equal(resolveLink('../MIGRATION.md', 'guide.md', map), '/docs/migration')
  assert.equal(resolveLink('guide.md', 'api.md', map), '/docs')
  assert.equal(resolveLink('LICENSE', 'README.md', map), 'https://github.com/Zesor/calendarkit-pro/blob/main/LICENSE')
  assert.equal(resolveLink('docs/images/week.png', 'README.md', map), '/images/week.png')
  assert.equal(resolveLink('https://photon.komoot.io', 'guide.md', map), 'https://photon.komoot.io')
})

test('resolveLink throws on a dangling link, naming file and target', () => {
  assert.throws(() => resolveLink('#nope', 'guide.md', map), /Dangling link in guide.md: #nope/)
  assert.throws(() => resolveLink('CONTRIBUTING.md', 'README.md', map), /Dangling link in README.md: CONTRIBUTING.md/)
})

test('extractProps reads the Props table, including escaped pipes', () => {
  const api = '## Props\n\n| Prop | Type | Description |\n|------|------|-------------|\n| `view` | `ViewType` | Current view: `\'month\'` \\| `\'week\'` |\n| `layout` | `\'classic\'` \\| `\'focus\'` | How it is laid out |\n\n## Types\n'
  const props = extractProps(api)
  assert.deepEqual([...props.keys()], ['view', 'layout'])
  assert.equal(props.get('layout')!.type, "`'classic'` | `'focus'`")
  assert.equal(props.get('view')!.description, "Current view: `'month'` | `'week'`")
})

test('renderMarkdown adds heading ids, collects headings, rewrites links and highlights code', async () => {
  const { html, headings } = await renderMarkdown('## Time grid\n\nSee [zones](#time-zones).\n\n```tsx\n<Scheduler />\n```\n', { fromFile: 'guide.md', map, shiftHeadings: 0 })
  assert.match(html, /<h2 id="time-grid">/)
  assert.match(html, /href="\/docs\/time-zones"/)
  assert.match(html, /<pre class="shiki/)
  assert.deepEqual(headings, [{ depth: 2, id: 'time-grid', text: 'Time grid' }])
})

test('renderMarkdown rejects a dangling link', async () => {
  await assert.rejects(renderMarkdown('[x](#missing)', { fromFile: 'guide.md', map }), /Dangling link/)
})

test('toPlainText strips markdown', () => {
  assert.equal(toPlainText('**Bold** `code` [link](/x) and _em_'), 'Bold code link and em')
})
