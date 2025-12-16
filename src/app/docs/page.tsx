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
git clone https://github.com/Zesor/pro-scheduler.git

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

  eventResizing: `// Event resizing is enabled by default in ProScheduler
// Users can drag the bottom edge of events to resize them

<Scheduler
  events={events}
  // Called when user resizes an event by dragging
  onEventResize={(event, newStart, newEnd) => {
    setEvents(events.map(e =>
      e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
    ));
  }}
/>

// The ResizableEvent component handles:
// - 15-minute snap intervals for precise scheduling
// - Visual feedback during resize (cursor, preview)
// - Minimum duration constraints`,

  notifications: `// Events can have multiple reminders
interface EventReminder {
  id: string;
  minutes: number;  // Minutes before event
  type: 'notification' | 'email';
}

const event: CalendarEvent = {
  id: '1',
  title: 'Team Meeting',
  start: new Date(2025, 0, 15, 14, 0),
  end: new Date(2025, 0, 15, 15, 0),
  reminders: [
    { id: 'r1', minutes: 15, type: 'notification' },  // 15 min before
    { id: 'r2', minutes: 60, type: 'email' },         // 1 hour before
  ],
};

// Built-in reminder options in EventModal:
// - 5 minutes before
// - 10 minutes before
// - 15 minutes before
// - 30 minutes before
// - 1 hour before
// - 1 day before`,

  icsImportExport: `import { generateICS, parseICS } from '@/lib/ics';

// Export events to ICS file
const handleExport = () => {
  const icsContent = generateICS(events, calendars);
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendar.ics';
  link.click();
};

// Import events from ICS file
const handleImport = async (file: File) => {
  const text = await file.text();
  const importedEvents = parseICS(text);
  setEvents([...events, ...importedEvents]);
};

// Supports:
// - Recurring events (RRULE)
// - All-day events
// - Event attachments
// - Multiple calendars`,

  contextMenus: `// Context menus appear on right-click
// Use the useEventContextMenu hook for custom actions

import { useEventContextMenu } from '@/hooks/useEventContextMenu';

function MyScheduler() {
  const { contextMenu, handleContextMenu, closeContextMenu } =
    useEventContextMenu();

  return (
    <Scheduler
      events={events}
      onEventContextMenu={handleContextMenu}
      // Built-in actions: Edit, Delete, Duplicate
      onEventEdit={(event) => openEditModal(event)}
      onEventDelete={(eventId) => deleteEvent(eventId)}
      onEventDuplicate={(event) => {
        const duplicate = { ...event, id: Date.now().toString() };
        setEvents([...events, duplicate]);
      }}
    />
  );
}`,

  mobileGestures: `// Swipe gestures are automatically enabled on touch devices
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

// The hook provides swipe detection with configurable threshold
const { swipeDirection, swipeHandlers } = useSwipeGesture({
  threshold: 50,  // Minimum swipe distance in pixels
  onSwipeLeft: () => navigateToNextPeriod(),
  onSwipeRight: () => navigateToPreviousPeriod(),
});

// Usage in custom component
<div {...swipeHandlers}>
  <CalendarContent />
</div>

// Built into ProScheduler:
// - Swipe left: Go to next week/month/day
// - Swipe right: Go to previous week/month/day
// - Works in all calendar views`,

  loadingStates: `// Show loading skeleton
<Scheduler
  events={events}
  isLoading={isLoadingEvents}  // Shows skeleton when true
/>

// Skeleton components available:
// - MonthViewSkeleton
// - WeekViewSkeleton
// - DayViewSkeleton
// - AgendaViewSkeleton

// Empty states are shown automatically when:
// - No events exist for the current view
// - All calendars are filtered out

// Customize empty state
<Scheduler
  events={events}
  emptyStateMessage="No meetings scheduled"
  emptyStateAction={{
    label: "Schedule a meeting",
    onClick: () => openNewEventModal(),
  }}
/>`,

  // Basic Feature Examples
  basicWeekStart: `// Configure which day the week starts on
<BasicScheduler
  events={events}
  weekStartsOn={1}  // 0 = Sunday (default), 1 = Monday, etc.
  // Affects Week view, Month view, and Mini Calendar
/>

// Common configurations:
// weekStartsOn={0}  // Sunday (US default)
// weekStartsOn={1}  // Monday (EU/ISO standard)
// weekStartsOn={6}  // Saturday (Middle East)`,

  basicRenderEvent: `// Custom event renderer for complete control over appearance
<BasicScheduler
  events={events}
  renderEvent={({ event, view, onClick }) => (
    <div
      onClick={onClick}
      className="p-2 rounded cursor-pointer hover:opacity-80"
      style={{ backgroundColor: event.color }}
    >
      <div className="font-semibold text-white truncate">
        {event.title}
      </div>
      {view !== 'month' && (
        <div className="text-xs text-white/80">
          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
        </div>
      )}
    </div>
  )}
/>`,

  basicMobile: `// Mobile features are built-in:
// - Swipe left/right to navigate dates
// - Mobile bottom sheet for calendar/filters
// - Floating action buttons (FAB)

// Swipe gestures work automatically on touch devices
<BasicScheduler
  events={events}
  view={view}
  onViewChange={setView}
/>

// Mobile Bottom Sheet provides:
// - Mini calendar for date selection
// - Calendar filter toggles
// - View switcher (Month/Week/Day)`,

  basicLoadingStates: `import {
  BasicScheduler,
  CalendarSkeleton,
  MonthViewSkeleton,
  WeekViewSkeleton,
  DayViewSkeleton,
  EmptyState
} from 'calendarkit-basic';

// Use isLoading prop for built-in skeleton
<BasicScheduler
  events={events}
  isLoading={isLoadingEvents}
/>

// Or use skeleton components directly
{isLoading ? (
  <CalendarSkeleton />
) : (
  <BasicScheduler events={events} />
)}

// Empty state component
<EmptyState
  title="No events scheduled"
  description="Create your first event to get started"
  actionLabel="Create Event"
  onAction={() => setIsModalOpen(true)}
/>`,

  // Pro Feature Examples
  proDragDrop: `// Drag & drop is built-in to ProScheduler
<ProScheduler
  events={events}
  // Called when an event is dragged to a new time
  onEventDrop={(event, newStart, newEnd) => {
    setEvents(events.map(e =>
      e.id === event.id
        ? { ...e, start: newStart, end: newEnd }
        : e
    ));
  }}
  // Optional: disable drag for specific scenarios
  readOnly={false}
/>

// Drag features:
// - Smooth drag with snap-to-grid (15-min intervals)
// - Visual drag preview with event color
// - Works in Month, Week, Day, and Resource views`,

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

  // Week Start Configuration
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;  // 0 = Sunday, 1 = Monday, etc.

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
  renderEvent?: (props: {
    event: CalendarEvent;
    view: ViewType;
    onClick: () => void;
  }) => React.ReactNode;
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
