import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseChangelog, loadChangelog } from './changelog.ts'

const md = `# Pro-Scheduler Changelog

## 2.0.0

The new CalendarKit.

### Highlights
- **No setup.** Styles included.

### Removed
- The root \`cn\` export.

## 2.0.0-beta.1

Pre-release.

### Added
- \`ToolbarProps.compact\`: a custom toolbar knows.

## 2.0.0-alpha.0

### Added
- The core.

## 1.4.1

### Deprecated
- \`cn\`.

## Features Added

### Event Resizing
- old stuff
`

test('stable releases with their pre-releases, old unnumbered block dropped', () => {
  const r = parseChangelog(md, { '2.0.0': '2026-10-24T03:22:56.853Z' })
  assert.deepEqual(r.map((x) => x.version), ['2.0.0', '1.4.1'])
  assert.deepEqual(r[0].prereleases.map((x) => x.version), ['2.0.0-beta.1', '2.0.0-alpha.0'])
  assert.equal(r[0].date, '2026-10-24T03:22:56.853Z')
  assert.equal(r[0].intro, 'The new CalendarKit.')
  assert.deepEqual(r[0].groups.map((g) => g.kind), ['highlights', 'removed'])
  assert.equal(r[1].groups[0].kind, 'deprecated')
  assert.doesNotMatch(JSON.stringify(r), /old stuff/)
})

test('a pre-release summary is its first bullet in plain text', () => {
  const r = parseChangelog(md, {})
  assert.equal(r[0].prereleases[0].summary, 'ToolbarProps.compact: a custom toolbar knows.')
})

test('the synced changelog parses: 2.0.0 first with 13 pre-releases', () => {
  const r = loadChangelog('content')
  assert.equal(r[0].version, '2.0.0')
  assert.equal(r[0].prereleases.length, 13)
  assert.ok(r.every((x) => !x.version.includes('-')))
})
