import { notFound } from 'next/navigation'
import { DocPageView } from '@/components/docs/doc-page'
import { loadDocs } from '@/lib/docs'
import { docMetadata } from '@/lib/seo'

export const dynamicParams = false
export const generateStaticParams = () => loadDocs().filter((p) => p.slug).map((p) => ({ slug: p.slug }))
const find = (slug: string) => loadDocs().find((p) => p.slug === slug && slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = find((await params).slug)
  return page ? docMetadata({ ...page }) : {}
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = find((await params).slug)
  if (!page) notFound()
  return <DocPageView page={page} />
}
