import type { Metadata } from 'next'
import type { DocPage } from './docs.ts'
import { FAQ } from './faq.ts'
import { site } from './site.ts'

export function pageMetadata({ title, description, path, ogSection }: { title: string; description: string; path: string; ogSection?: string }): Metadata {
  const url = `${site.url}${path}`
  const og = `/og?title=${encodeURIComponent(title.replace(/ \| CalendarKit$/, ''))}${ogSection ? `&section=${encodeURIComponent(ogSection)}` : ''}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description, siteName: 'CalendarKit Pro', images: [{ url: og, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [og] },
  }
}

export function docMetadata(page: Pick<DocPage, 'seoTitle' | 'description' | 'url'> & { group?: string }): Metadata {
  const m = pageMetadata({ title: page.seoTitle, description: page.description, path: page.url, ogSection: page.group ? `Docs · ${page.group}` : undefined })
  if (page.url.startsWith('/docs')) m.alternates = { ...m.alternates, types: { 'text/markdown': `${site.url}${page.url}.md` } }
  return m
}

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
})

export function landingJsonLd() {
  const org = { '@type': 'Organization', name: 'CalendarKit', url: site.url, logo: `${site.url}/android-chrome-192x192.png`, sameAs: [site.repo, site.npm] }
  return [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'CalendarKit', url: site.url },
    { '@context': 'https://schema.org', ...org },
    { '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: site.name, description: site.definition, url: site.url, codeRepository: site.repo, programmingLanguage: 'TypeScript', runtimePlatform: 'React', license: 'https://opensource.org/licenses/MIT', sameAs: [site.npm] },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: site.name, applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', description: site.definition, url: site.url, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: org },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ]
}

export function docJsonLd(page: Pick<DocPage, 'title' | 'seoTitle' | 'description' | 'url'>, syncedAt: string) {
  return [
    { '@context': 'https://schema.org', '@type': 'TechArticle', headline: page.seoTitle, description: page.description, url: `${site.url}${page.url}`, dateModified: syncedAt, author: { '@type': 'Organization', name: 'CalendarKit', url: site.url } },
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Docs', path: '/docs' }, ...(page.url === '/docs' ? [] : [{ name: page.title, path: page.url }])]),
  ]
}
