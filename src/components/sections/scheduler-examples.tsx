import { Section } from "@/components/section";
import { codeToHtml } from "shiki";
import { SchedulerExamplesClient } from "./scheduler-examples-client";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  highlightedCode?: string;
}

const basicExamples: CodeExample[] = [
  {
    id: "basic-setup",
    title: "Quick Start",
    description: "Get started in under 5 minutes with minimal configuration.",
    code: `import { BasicScheduler } from '@calendarkit/react';
import { useState } from 'react';

export default function MyCalendar() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2025, 0, 15, 10, 0),
      end: new Date(2025, 0, 15, 11, 0),
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Lunch Break',
      start: new Date(2025, 0, 15, 12, 0),
      end: new Date(2025, 0, 15, 13, 0),
      color: '#10b981'
    }
  ]);

  return (
    <BasicScheduler
      events={events}
      onEventClick={(event) => console.log('Clicked:', event.title)}
      onTimeSlotClick={(date) => {
        const newEvent = {
          id: Date.now().toString(),
          title: 'New Event',
          start: date,
          end: new Date(date.getTime() + 60 * 60 * 1000),
          color: '#8b5cf6'
        };
        setEvents([...events, newEvent]);
      }}
    />
  );
}`,
  },
  {
    id: "basic-calendars",
    title: "Multiple Calendars",
    description: "Filter events by calendar with color-coded categories.",
    code: `import { BasicScheduler } from '@calendarkit/react';
import { useState, useMemo } from 'react';

export default function FilteredCalendar() {
  const [events] = useState([
    { id: '1', title: 'Work Meeting', start: new Date(), end: new Date(), calendarId: 'work', color: '#3b82f6' },
    { id: '2', title: 'Gym', start: new Date(), end: new Date(), calendarId: 'personal', color: '#10b981' },
    { id: '3', title: 'Doctor', start: new Date(), end: new Date(), calendarId: 'health', color: '#ef4444' },
  ]);

  const [calendars, setCalendars] = useState([
    { id: 'work', label: 'Work', color: '#3b82f6', active: true },
    { id: 'personal', label: 'Personal', color: '#10b981', active: true },
    { id: 'health', label: 'Health', color: '#ef4444', active: true },
  ]);

  // Filter events based on active calendars
  const filteredEvents = useMemo(() => {
    const activeIds = calendars.filter(c => c.active).map(c => c.id);
    return events.filter(e => activeIds.includes(e.calendarId));
  }, [events, calendars]);

  return (
    <BasicScheduler
      events={filteredEvents}
      calendars={calendars}
      onCalendarToggle={(id, active) => {
        setCalendars(cals =>
          cals.map(c => c.id === id ? { ...c, active } : c)
        );
      }}
    />
  );
}`,
  },
];

const proExamples: CodeExample[] = [
  {
    id: "pro-full",
    title: "Full Featured Setup",
    description: "Complete setup with all Pro features enabled.",
    code: `import { ProScheduler } from '@calendarkit/react';
import { useState } from 'react';
import { fr } from 'date-fns/locale';

export default function AdvancedCalendar() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/New_York');

  const calendars = [
    { id: 'work', label: 'Work', color: '#3b82f6', active: true },
    { id: 'personal', label: 'Personal', color: '#10b981', active: true },
  ];

  return (
    <ProScheduler
      events={events}
      view={view}
      onViewChange={setView}
      date={date}
      onDateChange={setDate}
      calendars={calendars}
      // Timezone support
      timezone={timezone}
      onTimezoneChange={setTimezone}
      // i18n
      language={language}
      onLanguageChange={setLanguage}
      locale={language === 'fr' ? fr : undefined}
      // Theme
      isDarkMode={isDark}
      onThemeToggle={() => setIsDark(!isDark)}
      // Event handlers
      onEventCreate={(event) => {
        setEvents(prev => [...prev, { ...event, id: Date.now().toString() }]);
      }}
      onEventUpdate={(updated) => {
        setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
      }}
      onEventDelete={(id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
      }}
      // Drag & drop
      onEventDrop={(event, newStart, newEnd) => {
        setEvents(prev => prev.map(e =>
          e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
        ));
      }}
    />
  );
}`,
  },
  {
    id: "pro-recurring",
    title: "Recurring Events",
    description: "Create events that repeat daily, weekly, monthly, or yearly.",
    code: `import { ProScheduler } from '@calendarkit/react';

// Events with recurrence rules
const events = [
  {
    id: '1',
    title: 'Daily Standup',
    start: new Date(2025, 0, 6, 9, 0),
    end: new Date(2025, 0, 6, 9, 30),
    color: '#8b5cf6',
    recurrence: {
      freq: 'DAILY',      // DAILY | WEEKLY | MONTHLY | YEARLY
      interval: 1,         // Every 1 day
      count: 30            // Repeat 30 times
    }
  },
  {
    id: '2',
    title: 'Weekly Review',
    start: new Date(2025, 0, 10, 14, 0),
    end: new Date(2025, 0, 10, 15, 0),
    color: '#f59e0b',
    recurrence: {
      freq: 'WEEKLY',
      interval: 1,
      until: new Date(2025, 6, 1)  // End date instead of count
    }
  },
  {
    id: '3',
    title: 'Monthly Report',
    start: new Date(2025, 0, 1, 10, 0),
    end: new Date(2025, 0, 1, 11, 0),
    color: '#10b981',
    recurrence: {
      freq: 'MONTHLY',
      interval: 1,
      count: 12  // 12 months
    }
  }
];

export default function RecurringCalendar() {
  return (
    <ProScheduler
      events={events}
      onEventCreate={(event) => {
        // event.recurrence contains the recurrence data
        console.log('New event:', event);
        console.log('Repeats:', event.recurrence?.freq);
        console.log('Times:', event.recurrence?.count);
      }}
    />
  );
}`,
  },
];

const backendExamples: CodeExample[] = [
  {
    id: "backend-rest",
    title: "REST API Integration",
    description: "Fetch and sync events with any REST backend.",
    code: `import { ProScheduler } from '@calendarkit/react';
import { useState, useEffect } from 'react';

export default function CalendarWithAPI() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      // Convert ISO strings to Date objects
      setEvents(data.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end)
      })));
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    const created = await res.json();
    setEvents(prev => [...prev, {
      ...created,
      start: new Date(created.start),
      end: new Date(created.end)
    }]);
  };

  const updateEvent = async (event) => {
    await fetch(\`/api/events/\${event.id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    setEvents(prev => prev.map(e => e.id === event.id ? event : e));
  };

  const deleteEvent = async (id) => {
    await fetch(\`/api/events/\${id}\`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <ProScheduler
      events={events}
      isLoading={loading}
      onEventCreate={createEvent}
      onEventUpdate={updateEvent}
      onEventDelete={deleteEvent}
      onEventDrop={async (event, start, end) => {
        await updateEvent({ ...event, start, end });
      }}
    />
  );
}`,
  },
  {
    id: "backend-nextjs",
    title: "Next.js API Routes",
    description: "Complete Next.js implementation with Prisma.",
    code: `// app/api/events/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { start: 'asc' }
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const data = await req.json();
  const event = await prisma.event.create({
    data: {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
      description: data.description,
      color: data.color,
      calendarId: data.calendarId,
      recurrence: data.recurrence ? JSON.stringify(data.recurrence) : null
    }
  });
  return NextResponse.json(event);
}

// app/api/events/[id]/route.ts
export async function PUT(req: Request, { params }) {
  const data = await req.json();
  const event = await prisma.event.update({
    where: { id: params.id },
    data: {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
      description: data.description,
      color: data.color
    }
  });
  return NextResponse.json(event);
}

export async function DELETE(req: Request, { params }) {
  await prisma.event.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}`,
  },
  {
    id: "backend-supabase",
    title: "Supabase Real-time",
    description: "Real-time sync with Supabase subscriptions.",
    code: `import { ProScheduler } from '@calendarkit/react';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RealtimeCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Initial fetch
    fetchEvents();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('events')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setEvents(prev => [...prev, formatEvent(payload.new)]);
          } else if (payload.eventType === 'UPDATE') {
            setEvents(prev => prev.map(e =>
              e.id === payload.new.id ? formatEvent(payload.new) : e
            ));
          } else if (payload.eventType === 'DELETE') {
            setEvents(prev => prev.filter(e => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const formatEvent = (e) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end)
  });

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*');
    setEvents(data?.map(formatEvent) || []);
  };

  const createEvent = async (event) => {
    await supabase.from('events').insert({
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      color: event.color,
      calendar_id: event.calendarId
    });
  };

  return (
    <ProScheduler
      events={events}
      onEventCreate={createEvent}
      onEventUpdate={async (e) => {
        await supabase.from('events').update(e).eq('id', e.id);
      }}
      onEventDelete={async (id) => {
        await supabase.from('events').delete().eq('id', id);
      }}
    />
  );
}`,
  },
];

export async function SchedulerExamples() {
  // Highlight all code examples
  const highlightCode = async (examples: CodeExample[]) => {
    return Promise.all(
      examples.map(async (example) => ({
        ...example,
        highlightedCode: await codeToHtml(example.code, {
          lang: "tsx",
          theme: "github-dark",
        }),
      }))
    );
  };

  const [basicHighlighted, proHighlighted, backendHighlighted] =
    await Promise.all([
      highlightCode(basicExamples),
      highlightCode(proExamples),
      highlightCode(backendExamples),
    ]);

  return (
    <Section id="examples">
      <SchedulerExamplesClient
        basicHighlighted={basicHighlighted}
        proHighlighted={proHighlighted}
        backendHighlighted={backendHighlighted}
      />
    </Section>
  );
}
