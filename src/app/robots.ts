import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
