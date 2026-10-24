import { linkMap, type DocPage } from './docs.ts'
import { resolveLink } from './markdown.ts'

const SITE = 'https://calendarkit.io'
const DEFINITION = 'CalendarKit Pro (calendarkit-pro on npm) is a free, MIT-licensed React calendar and scheduler component for React 18 and 19.'

export function pageMarkdown(page: DocPage): string {
  const map = linkMap()
  const body = page.markdown.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (_, label: string, href: string) => {
    const url = resolveLink(href, page.sourceFile, map)
    return `${label}(${url.startsWith('/') ? SITE + url : url})`
  })
  const shifted = page.source === 'guide' ? body.replace(/^###/gm, '##') : body
  return `# ${page.title}\n\n${page.lede}\n\n${shifted.trim()}\n`
}

export function llmsTxt(pages: DocPage[]): string {
  const lines = pages.map((p) => `- [${p.title}](${SITE}${p.url}.md): ${p.description}`)
  return `# CalendarKit Pro\n\n> ${DEFINITION}\n\n## Docs\n\n${lines.join('\n')}\n\n## Optional\n\n- [Changelog](${SITE}/changelog): every release, newest first.\n- [Full docs in one file](${SITE}/llms-full.txt)\n`
}

export function llmsFull(pages: DocPage[]): string {
  return pages.map(pageMarkdown).join('\n\n')
}
