import { loadDocs } from '@/lib/docs'
import { pageMarkdown } from '@/lib/llms'

export const dynamic = 'force-static'
export const dynamicParams = false
export const generateStaticParams = () => loadDocs().map((p) => ({ slug: p.slug ? [p.slug] : [] }))

export async function GET(_: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const slug = (await params).slug?.[0] ?? ''
  const page = loadDocs().find((p) => p.slug === slug)
  if (!page) return new Response('Not found', { status: 404 })
  return new Response(pageMarkdown(page), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
