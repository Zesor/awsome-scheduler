import { useState } from 'react';
import { Scheduler, CalendarEvent, ViewType, EventType } from 'calendarkit-pro';
import { addDays, startOfWeek, addHours } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { Users, GraduationCap, Briefcase, Coffee } from 'lucide-react';

export const ResourceDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('week');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [timezone, setTimezone] = useState<string>('');

  const currentLocale = language === 'en' ? enUS : fr;

  // --- 1. Fake Data Generation --

  // Event Types
  const eventTypes: EventType[] = [
    { id: 'meeting', label: 'Meeting', icon: <Users className="w-4 h-4" />, color: '#3b82f6' },
    { id: 'training', label: 'Training', icon: <GraduationCap className="w-4 h-4" />, color: '#f59e0b' },
    { id: 'project', label: 'Project Work', icon: <Briefcase className="w-4 h-4" />, color: '#10b981' },
    { id: 'break', label: 'Break/Lunch', icon: <Coffee className="w-4 h-4" />, color: '#6b7280' },
  ];

  // Calendars (Categories) - Moved to state
  const [calendars, setCalendars] = useState([
    { id: 'work', label: 'Work', color: '#3b82f6', active: true },
    { id: 'personal', label: 'Personal', color: '#10b981', active: true },
    { id: 'urgent', label: 'Urgent', color: '#ef4444', active: true },
    { id: 'family', label: 'Family', color: '#8b5cf6', active: true },
  ]);

  // Handle Calendar Toggle
  const handleCalendarToggle = (calendarId: string, active: boolean) => {
    setCalendars(prev => prev.map(cal => 
        cal.id === calendarId ? { ...cal, active } : cal
    ));
  };

  // Generate Events
  const generateEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today);

    // Helper to create event
    const createEvent = (
      id: string, 
      title: string, 
      dayOffset: number, 
      hourStart: number, 
      duration: number, 
      resourceId: string, 
      type: string,
      calendarId: string,
      description: string
    ) => {
      const start = addHours(addDays(startOfCurrentWeek, dayOffset), hourStart);
      const end = addHours(start, duration);
      const typeObj = eventTypes.find(t => t.id === type);
      
      return {
        id,
        title,
        start,
        end,
        resourceId,
        type,
        calendarId,
        description,
        color: typeObj?.color,
        allDay: false
      };
    };

    // Monday
    events.push(createEvent('1', 'Team Standup', 1, 9, 0.5, 'r1', 'meeting', 'work', 'Daily sync with the team'));
    events.push(createEvent('2', 'React Workshop', 1, 10, 3, 'r3', 'training', 'work', 'Advanced React Patterns'));
    events.push(createEvent('3', 'Lunch with Client', 1, 13, 1, 'r4', 'break', 'personal', 'Discuss project roadmap'));
    events.push(createEvent('4', 'Design Review', 1, 14, 2, 'r2', 'project', 'work', 'Review new UI mockups'));

    // Tuesday
    events.push(createEvent('5', 'Client Call', 2, 10, 1, 'r1', 'meeting', 'urgent', 'Urgent issue resolution'));
    events.push(createEvent('6', 'Code Review', 2, 11, 2, 'r4', 'project', 'work', 'Review PRs for feature X'));
    events.push(createEvent('7', 'Strategy Meeting', 2, 14, 1.5, 'r2', 'meeting', 'work', 'Q3 Planning'));

    // Wednesday
    events.push(createEvent('8', 'Town Hall', 3, 9, 1, 'r3', 'meeting', 'work', 'All hands meeting'));
    events.push(createEvent('9', 'Dev Focus Time', 3, 10, 4, 'r4', 'project', 'work', 'Do not disturb'));
    events.push(createEvent('10', 'UX Research', 3, 14, 3, 'r5', 'project', 'work', 'User interviews'));

    // Thursday
    events.push(createEvent('11', 'Training: Accessibility', 4, 13, 3, 'r3', 'training', 'work', 'WCAG 2.1 Guidelines'));
    events.push(createEvent('12', 'Weekly Sync', 4, 10, 1, 'r1', 'meeting', 'work', 'Status update'));

    // Friday
    events.push(createEvent('13', 'Demo Day', 5, 15, 2, 'r3', 'meeting', 'work', 'Showcase recent work'));
    events.push(createEvent('14', 'Happy Hour', 5, 17, 2, 'r5', 'break', 'personal', 'Team bonding'));

    return events;
  };

  const [events, setEvents] = useState<CalendarEvent[]>(generateEvents());

  // Filtered Events
  const filteredEvents = events.filter(event => {
    // If event has a calendarId, check if that calendar is active
    if (event.calendarId) {
        const cal = calendars.find(c => c.id === event.calendarId);
        return cal ? cal.active : true;
    }
    return true;
  });

  // Handlers
  const handleEventCreate = (newEvent: Partial<CalendarEvent>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      start: newEvent.start as Date,
      end: newEvent.end as Date,
      title: newEvent.title || 'New Event'
    };
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 2. Calendar View Container */}
      <div className="flex-1 overflow-hidden p-0 md:p-6">
        <div className="h-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-slate-900/5">
            <Scheduler
                events={filteredEvents}
                view={view}
                onViewChange={setView}
                date={currentDate}
                onDateChange={setCurrentDate}
                eventTypes={eventTypes}
                calendars={calendars}
                onCalendarToggle={handleCalendarToggle}
                onEventCreate={handleEventCreate}
                onEventUpdate={handleEventUpdate}
                onEventDelete={handleEventDelete}
                isDarkMode={isDarkMode}
                onThemeToggle={() => setIsDarkMode(!isDarkMode)}
                language={language}
                onLanguageChange={setLanguage}
                locale={currentLocale} // Pass locale to Scheduler
                hideViewSwitcher={false} // Show internal view switcher now
                timezone={timezone}
                onTimezoneChange={setTimezone}
            />
        </div>
      </div>
    </div>
  );
};
