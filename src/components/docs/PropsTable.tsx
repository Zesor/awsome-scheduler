import { linkMap } from '@/lib/docs'
import { renderMarkdown, type Prop } from '@/lib/markdown'
import s from '@/app/docs/docs.module.css'

export async function PropsTable({ props }: { props: Prop[] }) {
  const map = linkMap()
  const cell = async (md: string) => (await renderMarkdown(md, { fromFile: 'api.md', map })).html.replace(/^<p>|<\/p>\s*$/g, '')
  const rows = await Promise.all(props.map(async (p) => ({ name: p.name, type: await cell(p.type), description: await cell(p.description) })))
  return (
    <section className={s.prose}>
      <h2 id="props">Props</h2>
      <table><thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.name}><td><code>{r.name}</code></td><td className={s.ty} dangerouslySetInnerHTML={{ __html: r.type }} /><td dangerouslySetInnerHTML={{ __html: r.description }} /></tr>)}</tbody>
      </table>
    </section>
  )
}
