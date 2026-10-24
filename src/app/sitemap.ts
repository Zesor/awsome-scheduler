import type { MetadataRoute } from 'next'
import { execSync } from 'node:child_process'
import { loadDocs, readMeta } from '@/lib/docs'
import { site } from '@/lib/site'

const lastCommit = (file: string, fallback: string) => {
  try { return execSync(`git log -1 --format=%cI -- ${file}`, { encoding: 'utf8' }).trim() || fallback } catch { return fallback }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const synced = readMeta().syncedAt
  return [
    { url: site.url, lastModified: lastCommit('src/components/landing', synced), priority: 1 },
    ...loadDocs().map((p) => ({ url: `${site.url}${p.url}`, lastModified: synced, priority: p.slug ? 0.7 : 0.9 })),
    { url: `${site.url}/changelog`, lastModified: synced, priority: 0.5 },
  ]
}
