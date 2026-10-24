import type { Metadata } from 'next'
import type { DocPage } from './docs.ts'
import { site } from './site.ts'

export function docMetadata(page: Pick<DocPage, 'seoTitle' | 'description' | 'url'>): Metadata {
  return { title: { absolute: page.seoTitle }, description: page.description, alternates: { canonical: `${site.url}${page.url}` } }
}
