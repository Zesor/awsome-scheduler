import { loadDocs } from '@/lib/docs'
import { buildIndex } from '@/lib/search'

export const dynamic = 'force-static'
export function GET() { return Response.json(buildIndex(loadDocs())) }
