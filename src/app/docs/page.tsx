import { Metadata } from "next";
import { DocsContent } from "./docs-content";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
  title: "Documentation | CalendarKit",
  description: "Complete documentation for CalendarKit React calendar components. Learn how to build beautiful calendars with TypeScript, drag & drop, and dark mode support.",
};

// Code examples for documentation
const codeExamples = {
  installation: `# Basic (Free - Open Source)
# Install from npm - no purchase needed!
npm install calendarkit-basic
# or
yarn add calendarkit-basic
# or
pnpm add calendarkit-basic

# Pro (After Purchase)
# You'll receive access to our private GitHub repository.
# Clone the repository using your GitHub account:
git clone https://github.com/calaboratehq/pro-scheduler.git

# Install dependencies
cd pro-scheduler
npm install

# Run the development server
npm run dev`,

  basicImport: `import { BasicScheduler } from 'calendarkit-basic';
import { CalendarEvent, ViewType } from 'calendarkit-basic';
import { useState } from 'react';

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<ViewType>('week');
  const [date, setDate] = useState(new Date());

  return (
    <BasicScheduler
      events={events}
      view={view}
      onViewChange={setView}
      date={date}
      onDateChange={setDate}
      onEventCreate={(event) => {
        setEvents([...events, { ...event, id: Date.now().toString() }]);
      }}
    />
  );
}`,

  proImport: `import { Scheduler } from '@/components/pro-scheduler';
import { CalendarEvent, ViewType, Resource } from '@/components/pro-scheduler/types';
import { useState } from 'react';

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<ViewType>('week');
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Scheduler
      events={events}
      view={view}
      onViewChange={setView}
      date={date}
      onDateChange={setDate}
      isDarkMode={isDarkMode}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      onEventCreate={(event) => {
        setEvents([...events, { ...event, id: Date.now().toString() }]);
      }}
    />
  );
}`,

  eventStructure: `interface CalendarEvent {
  id: string;           // Unique identifier
  title: string;        // Event title
  start: Date;          // Start date/time
  end: Date;            // End date/time
  description?: string; // Optional description
  color?: string;       // Hex color (e.g., '#3b82f6')
  allDay?: boolean;     // Is all-day event
  calendarId?: string;  // Associated calendar ID
  resourceId?: string;  // For resource view (Pro only)
  guests?: string[];    // Email addresses (Pro only)
  attachments?: EventAttachment[]; // Files (Pro only)
  recurrence?: {        // Recurring rules (Pro only)
    freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    interval?: number;
    count?: number;     // Number of occurrences
    until?: Date;       // End date
  };
}`,

  calendars: `const calendars = [
  { id: 'work', label: 'Work', color: '#3b82f6', active: true },
  { id: 'personal', label: 'Personal', color: '#10b981', active: true },
  { id: 'family', label: 'Family', color: '#8b5cf6', active: false },
];

<BasicScheduler
  events={events}
  calendars={calendars}
  onCalendarToggle={(id, active) => {
    setCalendars(cals =>
      cals.map(c => c.id === id ? { ...c, active } : c)
    );
  }}
/>`,

  eventHandlers: `<ProScheduler
  events={events}
  // Called when user clicks on an event
  onEventClick={(event) => {
    console.log('Event clicked:', event);
  }}
  // Called when user creates a new event
  onEventCreate={(event) => {
    setEvents([...events, { ...event, id: Date.now().toString() }]);
  }}
  // Called when user updates an existing event
  onEventUpdate={(updatedEvent) => {
    setEvents(events.map(e =>
      e.id === updatedEvent.id ? updatedEvent : e
    ));
  }}
  // Called when user deletes an event
  onEventDelete={(eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  }}
  // Called when user drags an event to a new time (Pro only)
  onEventDrop={(event, newStart, newEnd) => {
    setEvents(events.map(e =>
      e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
    ));
  }}
/>`,

  theming: `const customTheme = {
  colors: {
    primary: '#6366f1',      // Primary accent color
    secondary: '#ec4899',    // Secondary color
    background: '#ffffff',   // Background color
    foreground: '#0f172a',   // Text color
    border: '#e2e8f0',       // Border color
    muted: '#f1f5f9',        // Muted backgrounds
    accent: '#f1f5f9',       // Accent backgrounds
  },
  fontFamily: 'Inter, sans-serif',
  borderRadius: '0.75rem',
};

<ProScheduler
  events={events}
  theme={customTheme}
  isDarkMode={isDarkMode}
  onThemeToggle={() => setIsDarkMode(!isDarkMode)}
/>`,

  i18n: `import { fr, de, es } from 'date-fns/locale';

// Custom translations
const customTranslations = {
  today: 'Heute',
  month: 'Monat',
  week: 'Woche',
  day: 'Tag',
  createEvent: 'Ereignis erstellen',
  editEvent: 'Ereignis bearbeiten',
  delete: 'Löschen',
  save: 'Speichern',
  cancel: 'Abbrechen',
  // ... more translations
};

<ProScheduler
  events={events}
  language="fr"                    // Built-in: 'en' | 'fr'
  locale={fr}                      // date-fns locale for date formatting
  translations={customTranslations} // Override specific strings
  onLanguageChange={(lang) => setLanguage(lang)}
/>`,

  timezone: `<ProScheduler
  events={events}
  timezone="America/New_York"      // IANA timezone
  onTimezoneChange={(tz) => {
    setTimezone(tz);
    // Events will automatically adjust to new timezone
  }}
/>

// Supported timezones include:
// - America/New_York
// - America/Los_Angeles
// - Europe/London
// - Europe/Paris
// - Asia/Tokyo
// - And all IANA timezone identifiers`,

  resources: `const resources = [
  { id: 'room-a', label: 'Conference Room A', color: '#3b82f6' },
  { id: 'room-b', label: 'Conference Room B', color: '#10b981' },
  { id: 'john', label: 'John Doe', color: '#f59e0b', avatar: '/avatars/john.jpg' },
];

const events = [
  {
    id: '1',
    title: 'Client Meeting',
    start: new Date(2025, 0, 15, 10, 0),
    end: new Date(2025, 0, 15, 11, 0),
    resourceId: 'room-a',  // Link event to resource
  },
];

<ProScheduler
  events={events}
  resources={resources}
  view="resource"
/>`,

  recurring: `const recurringEvents = [
  {
    id: '1',
    title: 'Daily Standup',
    start: new Date(2025, 0, 6, 9, 0),
    end: new Date(2025, 0, 6, 9, 30),
    recurrence: {
      freq: 'DAILY',
      interval: 1,      // Every 1 day
      count: 30,        // Repeat 30 times
    },
  },
  {
    id: '2',
    title: 'Weekly Team Meeting',
    start: new Date(2025, 0, 6, 14, 0),
    end: new Date(2025, 0, 6, 15, 0),
    recurrence: {
      freq: 'WEEKLY',
      interval: 1,
      until: new Date(2025, 12, 31), // End date
    },
  },
  {
    id: '3',
    title: 'Monthly Report',
    start: new Date(2025, 0, 1, 10, 0),
    end: new Date(2025, 0, 1, 11, 0),
    recurrence: {
      freq: 'MONTHLY',
      interval: 1,
      count: 12,
    },
  },
];`,

  customEventForm: `<ProScheduler
  events={events}
  renderEventForm={({ isOpen, onClose, event, initialDate, onSave, onDelete }) => (
    <MyCustomModal isOpen={isOpen} onClose={onClose}>
      <MyEventForm
        event={event}
        initialDate={initialDate}
        onSave={(data) => {
          onSave(data);
          onClose();
        }}
        onDelete={event?.id ? () => {
          onDelete?.(event.id);
          onClose();
        } : undefined}
      />
    </MyCustomModal>
  )}
/>`,

  basicPropsTable: `// BasicScheduler Props
interface BasicSchedulerProps {
  // Data
  events?: CalendarEvent[];
  calendars?: Calendar[];

  // View Control
  view?: 'month' | 'week' | 'day';
  onViewChange?: (view: ViewType) => void;
  date?: Date;
  onDateChange?: (date: Date) => void;

  // Event Handlers
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Partial<CalendarEvent>) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  onCalendarToggle?: (calendarId: string, active: boolean) => void;

  // Customization
  theme?: CalendarTheme;
  locale?: Locale;
  className?: string;
  readOnly?: boolean;
  isLoading?: boolean;

  // Custom Rendering
  renderEventForm?: (props: EventFormProps) => React.ReactNode;
}`,

  proPropsTable: `// ProScheduler Props (includes all BasicScheduler props)
interface ProSchedulerProps extends BasicSchedulerProps {
  // Additional Views
  view?: 'month' | 'week' | 'day' | 'agenda' | 'resource';
  resources?: Resource[];

  // Drag & Drop
  onEventDrop?: (event: CalendarEvent, start: Date, end: Date) => void;
  onEventResize?: (event: CalendarEvent, start: Date, end: Date) => void;

  // Timezone
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;

  // Theme
  isDarkMode?: boolean;
  onThemeToggle?: () => void;

  // i18n
  language?: 'en' | 'fr';
  onLanguageChange?: (lang: 'en' | 'fr') => void;
  translations?: Partial<CalendarTranslations>;

  // Pro Features
  eventTypes?: EventType[];
  hideViewSwitcher?: boolean;
}`,
};

async function highlightCode(code: string, lang: string = "tsx") {
  return codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}

export default async function DocsPage() {
  // Pre-highlight all code examples
  const highlighted: Record<string, string> = {};

  for (const [key, code] of Object.entries(codeExamples)) {
    const lang = key === "installation" ? "bash" : "tsx";
    highlighted[key] = await highlightCode(code, lang);
  }

  return <DocsContent highlightedCode={highlighted} />;
}
