import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildIndex, search } from './search.ts'
import { loadDocs } from './docs.ts'

const index = buildIndex(loadDocs('content'))

test('a prop name finds the page and section that document it', () => {
  const hit = search(index, 'slotDuration')[0]
  assert.equal(hit.url.split('#')[0], '/docs/time-grid')
})

test('several words must all match, case-insensitive', () => {
  assert.ok(search(index, 'TIME zone').every((e) => /time/i.test(e.page + e.heading + e.text) && /zone/i.test(e.page + e.heading + e.text)))
})

test('empty query returns nothing; limit applies', () => {
  assert.deepEqual(search(index, '  '), [])
  assert.ok(search(index, 'the', 5).length <= 5)
})

test('page titles rank before body matches', () => {
  assert.equal(search(index, 'theming')[0].url, '/docs/theming')
})
