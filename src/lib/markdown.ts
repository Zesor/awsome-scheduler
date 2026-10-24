import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export type Section = { title: string; slug: string; body: string }
export type LinkMap = { anchors: Map<string, string>; files: Record<string, string> }
export type Prop = { name: string; type: string; description: string }
export type Heading = { depth: 2 | 3; id: string; text: string }

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s/g, '-')
}

export function splitSections(md: string, depth: 2 | 3): { preamble: string; sections: Section[] } {
  const marker = '#'.repeat(depth) + ' '
  const sections: Section[] = []
  const pre: string[] = []
  let current: { title: string; lines: string[] } | null = null
  let fenced = false
  for (const line of md.split('\n')) {
    if (line.startsWith('```')) fenced = !fenced
    if (!fenced && line.startsWith(marker)) {
      if (current) sections.push({ title: current.title, slug: slugify(current.title), body: current.lines.join('\n').trim() + '\n' })
      current = { title: line.slice(marker.length).trim(), lines: [] }
    } else (current ? current.lines : pre).push(line)
  }
  if (current) sections.push({ title: current.title, slug: slugify(current.title), body: current.lines.join('\n').trim() + '\n' })
  return { preamble: pre.join('\n').trim(), sections }
}

const FILE_ALIASES: Record<string, string> = {
  'guide.md': 'guide.md', 'docs/guide.md': 'guide.md', '../docs/guide.md': 'guide.md',
  'api.md': 'api.md', 'docs/api.md': 'api.md',
  'MIGRATION.md': 'MIGRATION.md', '../MIGRATION.md': 'MIGRATION.md',
  'CHANGELOG.md': 'CHANGELOG.md', '../CHANGELOG.md': 'CHANGELOG.md',
  'README.md': 'README.md', '../README.md': 'README.md',
  LICENSE: 'LICENSE', '../LICENSE': 'LICENSE',
}

export function resolveLink(href: string, fromFile: string, map: LinkMap): string {
  if (/^(https?:|mailto:)/.test(href)) return href
  const image = href.match(/^(?:\.\.\/)?(?:docs\/)?images\/([\w.-]+\.png)$/)
  if (image) return `/images/${image[1]}`
  const [path, anchor] = href.split('#')
  const file = path === '' ? fromFile : FILE_ALIASES[path]
  const fail = () => { throw new Error(`Dangling link in ${fromFile}: ${href}`) }
  if (!file) return fail()
  if (anchor) return map.anchors.get(`${file}#${anchor}`) ?? fail()
  return map.files[file] ?? fail()
}

export function extractProps(apiMd: string): Map<string, Prop> {
  const props = new Map<string, Prop>()
  const table = apiMd.split('## Props')[1]?.split('\n## ')[0] ?? ''
  for (const row of table.split('\n').filter((l) => l.startsWith('| `'))) {
    const cells = row.slice(1, -1).split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'))
    const name = cells[0].replace(/`/g, '')
    props.set(name, { name, type: cells[1], description: cells[2] })
  }
  return props
}

type Node = { type: string; tagName?: string; url?: string; depth?: number; properties?: Record<string, unknown>; children?: Node[]; value?: string }
const walk = (node: Node, fn: (n: Node) => void) => { fn(node); node.children?.forEach((c) => walk(c, fn)) }
const textOf = (node: Node): string => node.value ?? (node.children ?? []).map(textOf).join('')

export async function renderMarkdown(md: string, opts: { fromFile: string; map: LinkMap; shiftHeadings?: number }): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = []
  const shift = opts.shiftHeadings ?? 0
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: Node) => walk(tree, (n) => {
      if ((n.type === 'link' || n.type === 'image') && n.url) n.url = resolveLink(n.url, opts.fromFile, opts.map)
      if (n.type === 'heading' && n.depth) n.depth = Math.min(6, n.depth + shift)
    }))
    .use(remarkRehype)
    .use(() => (tree: Node) => walk(tree, (n) => {
      if (n.type === 'element' && (n.tagName === 'h2' || n.tagName === 'h3')) {
        const text = textOf(n)
        const id = slugify(text)
        n.properties = { ...n.properties, id }
        headings.push({ depth: n.tagName === 'h2' ? 2 : 3, id, text })
      }
    }))
    .use(rehypeShiki, { theme: 'github-dark-default' })
    .use(rehypeStringify)
    .process(md)
  return { html: String(file), headings }
}

export function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
