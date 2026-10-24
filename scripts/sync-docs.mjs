// Copies the library's docs at a git ref into content/ and public/images/.
// Usage: npm run sync-docs -- <tag|branch|sha>   (for example v2.0.0)
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, renameSync, existsSync, readdirSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ref = process.argv[2]
if (!ref) { console.error('usage: npm run sync-docs -- <git ref>'); process.exit(1) }
const RAW = `https://raw.githubusercontent.com/Zesor/calendarkit-pro/${ref}/`
const API = `https://api.github.com/repos/Zesor/calendarkit-pro/contents/docs/images?ref=${ref}`
const FILES = { 'README.md': 'README.md', 'docs/guide.md': 'guide.md', 'docs/api.md': 'api.md', 'MIGRATION.md': 'MIGRATION.md', 'CHANGELOG.md': 'CHANGELOG.md' }

async function get(url, as = 'text') {
  const res = await fetch(url, { headers: { 'User-Agent': 'calendarkit-website-sync' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return as === 'json' ? res.json() : as === 'buffer' ? Buffer.from(await res.arrayBuffer()) : res.text()
}

const tmp = mkdtempSync(join(tmpdir(), 'ck-sync-'))
try {
  mkdirSync(join(tmp, 'content'))
  mkdirSync(join(tmp, 'images'))
  for (const [from, to] of Object.entries(FILES)) writeFileSync(join(tmp, 'content', to), await get(RAW + from))
  for (const f of (await get(API, 'json')).filter((f) => f.name.endsWith('.png'))) writeFileSync(join(tmp, 'images', f.name), await get(f.download_url, 'buffer'))
  const version = JSON.parse(await get(RAW + 'package.json')).version
  const releaseDates = JSON.parse(execFileSync('npm', ['view', 'calendarkit-pro', 'time', '--json'], { encoding: 'utf8' }))
  delete releaseDates.created; delete releaseDates.modified
  const meta = { ref, version, syncedAt: new Date().toISOString().slice(0, 10), releaseDates }
  writeFileSync(join(tmp, 'content', 'meta.json'), JSON.stringify(meta, null, 2) + '\n')
} catch (err) {
  rmSync(tmp, { recursive: true, force: true })
  console.error(`sync-docs: nothing written. ${err.message}`)
  process.exit(1)
}
// Everything downloaded: replace in one move.
rmSync('content', { recursive: true, force: true })
renameSync(join(tmp, 'content'), 'content')
mkdirSync('public/images', { recursive: true })
for (const f of readdirSync('public/images')) if (f.endsWith('.png') && !existsSync(join(tmp, 'images', f))) rmSync(join('public/images', f))
for (const f of readdirSync(join(tmp, 'images'))) copyFileSync(join(tmp, 'images', f), join('public/images', f))
rmSync(tmp, { recursive: true, force: true })
console.log(`sync-docs: content/ and public/images/ at ${ref}`)
