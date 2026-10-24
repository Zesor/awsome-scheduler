import { DocPageView } from '@/components/docs/doc-page'
import { OldAnchorRedirect } from '@/components/docs/OldAnchorRedirect'
import { loadDocs } from '@/lib/docs'
import { docMetadata } from '@/lib/seo'

const page = () => loadDocs().find((p) => p.slug === '')!
export const generateMetadata = () => docMetadata(page())
export default function DocsHome() { return <><DocPageView page={page()} /><OldAnchorRedirect /></> }
