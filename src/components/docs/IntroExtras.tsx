import Link from 'next/link'
import s from '@/app/docs/docs.module.css'

const CARDS = [
  { href: '/docs/api#calendarevent', title: 'Events', text: 'The CalendarEvent shape: dates, all-day, recurrence.' },
  { href: '/docs/views', title: 'Views and layouts', text: 'Month to resource, Classic, Focus, Flow.' },
  { href: '/docs/multiple-calendars', title: 'Calendars and resources', text: 'Colours, toggles, rows in the resource view.' },
  { href: '/docs/creating-editing-and-undoing', title: 'Callbacks', text: 'Create, update, delete, drop, resize, every change.' },
]
const ENTRIES = [['calendarkit-pro', 'The <Scheduler>'], ['calendarkit-pro/core', 'The framework-free engine'], ['calendarkit-pro/react', 'Hooks and helpers to build your own calendar UI'], ['calendarkit-pro/styles.css', 'The stylesheet as a file']]

export function IntroExtras() {
  return (
    <section className={s.prose}>
      <h2 id="core-concepts">Core concepts</h2>
      <div className={s.cards}>{CARDS.map((c) => <Link key={c.href} href={c.href}><b>{c.title}</b><span>{c.text}</span></Link>)}</div>
      <h2 id="entry-points">Entry points</h2>
      <table><thead><tr><th>Import</th><th>What it is</th></tr></thead><tbody>{ENTRIES.map(([i, w]) => <tr key={i}><td><code>{i}</code></td><td>{w}</td></tr>)}</tbody></table>
    </section>
  )
}
