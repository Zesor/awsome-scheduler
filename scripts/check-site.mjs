// SEO and link guard for the built site. Usage: npm run build && npm run check-site
import { spawn } from 'node:child_process'

const PORT = 3999
const BASE = `http://localhost:${PORT}`
const APEX = 'https://calendarkit.io'
const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore' })
const errors = []
const fail = (page, msg) => errors.push(`${page}: ${msg}`)
const get = async (path) => { const r = await fetch(BASE + path, { redirect: 'manual' }); return { status: r.status, type: r.headers.get('content-type') ?? '', text: await r.text() } }

try {
  for (let i = 0; i < 60; i++) { try { await fetch(BASE); break } catch { await new Promise((r) => setTimeout(r, 500)) } }
  const sitemap = (await get('/sitemap.xml')).text
  const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(APEX, '') || '/')
  const titles = new Map()
  const links = new Set(['/llms.txt', '/llms-full.txt', '/robots.txt', '/search-index.json'])
  for (const path of pages) {
    const { status, text } = await get(path)
    if (status !== 200) { fail(path, `status ${status}`); continue }
    const title = text.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
    const desc = text.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
    const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    const ogUrl = text.match(/<meta property="og:url" content="([^"]+)"/)?.[1]
    const self = APEX + (path === '/' ? '' : path)
    if (canonical !== self && canonical !== self + '/') fail(path, `canonical ${canonical}`)
    if (ogUrl !== canonical) fail(path, `og:url ${ogUrl} differs from canonical`)
    if (!title || title.length > 60) fail(path, `title length ${title.length}`)
    if (titles.has(title)) fail(path, `title also on ${titles.get(title)}`); else titles.set(title, path)
    if (desc.length < 70 || desc.length > 155) fail(path, `description length ${desc.length}`)
    const h1 = (text.match(/<h1[\s>]/g) ?? []).length
    if (h1 !== 1) fail(path, `${h1} h1`)
    if (/<meta name="keywords"/.test(text)) fail(path, 'meta keywords')
    for (const m of text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { const d = JSON.parse(m[1]); if (JSON.stringify(d).includes('aggregateRating')) fail(path, 'aggregateRating') } catch { fail(path, 'JSON-LD does not parse') }
    }
    for (const m of text.matchAll(/href="(\/[^"#?]*)/g)) if (!m[1].startsWith('/_next')) links.add(m[1])
    if (path.startsWith('/docs')) links.add(`${path}.md`)
  }
  for (const link of links) { const { status } = await get(link); if (status !== 200) fail(link, `linked, status ${status}`) }
  const llms = (await get('/llms.txt')).text
  for (const p of pages.filter((p) => p.startsWith('/docs'))) if (!llms.includes(`${APEX}${p}.md`)) fail('/llms.txt', `missing ${p}`)
  if (!(await get('/')).text.includes('The best React calendar, with everything built in.')) fail('/', 'h1 sentence missing from server HTML')
  if (!/text\/markdown/.test((await get('/docs/time-grid.md')).type)) fail('/docs/time-grid.md', 'not text/markdown')
} finally {
  server.kill()
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log('check-site: ok')
