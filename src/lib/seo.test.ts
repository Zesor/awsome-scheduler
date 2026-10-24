import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pageMetadata, landingJsonLd, docJsonLd } from './seo.ts'
import { loadDocs } from './docs.ts'
import { NAV } from './docs-nav.ts'

test('every docs title fits 60 characters and every description 70 to 155', () => {
  for (const p of NAV) {
    assert.ok(p.seoTitle.length <= 60, `${p.slug} title ${p.seoTitle.length}`)
    assert.ok(p.description.length >= 70 && p.description.length <= 155, `${p.slug} description ${p.description.length}`)
  }
})

test('titles are unique', () => {
  assert.equal(new Set(NAV.map((p) => p.seoTitle)).size, NAV.length)
})

test('metadata has an absolute self canonical, og:url equal to it, a 1200x630 image', () => {
  const m = pageMetadata({ title: 'T', description: 'D', path: '/docs/time-grid' })
  assert.equal(m.alternates?.canonical, 'https://calendarkit.io/docs/time-grid')
  assert.equal((m.openGraph as { url: string }).url, 'https://calendarkit.io/docs/time-grid')
  const img = (m.openGraph as { images: { width: number; height: number; url: string }[] }).images[0]
  assert.deepEqual([img.width, img.height], [1200, 630])
  assert.match(img.url, /^\/og\?title=T/)
})

test('structured data never carries a rating and uses the apex host', () => {
  const all = JSON.stringify([landingJsonLd(), docJsonLd(loadDocs('content')[2], '2026-10-24')])
  assert.doesNotMatch(all, /aggregateRating|www\.calendarkit/)
  assert.match(all, /"@type":"SoftwareSourceCode"/)
  assert.match(all, /"@type":"FAQPage"/)
  assert.match(all, /"@type":"TechArticle"/)
  assert.match(all, /"@type":"BreadcrumbList"/)
})
