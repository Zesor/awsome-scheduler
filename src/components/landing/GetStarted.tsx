import Link from 'next/link'
import { codeToHtml } from 'shiki'
import { CodeTabs } from './CodeTabs'
import { InstallTabs } from './InstallTabs'
import s from './GetStarted.module.css'

const SNIPPETS = [
  { label: 'Quick start', file: 'MyCalendar.tsx', code: `import { Scheduler } from 'calendarkit-pro';

export function MyCalendar() {
  return (
    <div style={{ height: 720 }}>
      <Scheduler defaultEvents={events} onEventsChange={save} />
    </div>
  );
}

// The calendar fills its parent and keeps its events.
// onEventsChange gets the full list after every change.` },
  { label: 'Your state', file: 'MyCalendar.tsx', code: `import { useState } from 'react';
import { Scheduler, type CalendarEvent } from 'calendarkit-pro';

export function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <Scheduler
      events={events}
      onEventCreate={(e) => setEvents((l) => [...l, { ...e, id: crypto.randomUUID() }])}
      onEventUpdate={(e) => setEvents((l) => l.map((x) => (x.id === e.id ? e : x)))}
      onEventDelete={(id) => setEvents((l) => l.filter((x) => x.id !== id))}
    />
  );
}` },
  { label: 'Next.js', file: 'app/calendar/page.tsx', code: `// A Server Component page: no "use client" needed here,
// calendarkit-pro is marked "use client" itself.
import { Scheduler } from 'calendarkit-pro';
import { getEvents } from '@/lib/events';

export default async function Page() {
  const events = await getEvents();
  return <Scheduler defaultEvents={events} />;
}

// Renders on the server, hydrates without a warning. React 18 and 19.` },
  { label: 'Customize', file: 'MyCalendar.tsx', code: `<Scheduler
  theme="editorial"
  mode="system"
  layout="focus"
  language="fr"
  classNames={{ event: 'my-event', dialog: 'my-dialog' }}
  components={{ EventContent: ({ event }) => <strong>{event.title}</strong> }}
  renderEventForm={(props) => <MyEventForm {...props} />}
/>` },
]
const ENTRIES = [['calendarkit-pro', 'The calendar'], ['/core', 'Engine, no React'], ['/react', 'Hooks and helpers'], ['/styles.css', 'The stylesheet']]
const rv = (i: number) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties })

export async function GetStarted() {
  const tabs = await Promise.all(SNIPPETS.map(async (t) => ({ ...t, html: await codeToHtml(t.code, { lang: 'tsx', theme: 'github-dark-default' }) })))
  return (
    <section className="section" id="get-started">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Get started</span>
        <h2 className="h2" data-reveal style={{ '--i': 1 } as React.CSSProperties}>Install. Import. Ship.<br /><span className="soft">No CSS to set up.</span></h2>
        <div className="bento">
          <div className="tile wide" {...rv(2)}>
            <CodeTabs tabs={tabs} />
            <div className={s.foot}>
              <div><h3>One component</h3><p>Its own styles, scoped. Nothing leaks into your page.</p></div>
              <Link href="/docs" className={s.guide}>Read the guide →</Link>
            </div>
          </div>
          <div className={s.side}>
            <div className="tile" {...rv(3)}>
              <h3>Install</h3><p>React 18 or 19. That&apos;s the only requirement.</p>
              <InstallTabs />
            </div>
            <div className="tile" {...rv(4)}>
              <h3>Four entry points</h3><p>Use the calendar, or build your own on its engine.</p>
              <ul className={s.entries}>{ENTRIES.map(([c, d]) => <li key={c}><code>{c}</code><span>{d}</span></li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
