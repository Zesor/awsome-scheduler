import type { CalendarEvent, Resource } from 'calendarkit-pro'

export const DEMO_CALENDARS = [
  { id: 'work', label: 'Work', color: '#3b82f6', active: true },
  { id: 'personal', label: 'Personal', color: '#10b981', active: true },
]
export const DEMO_RESOURCES: Resource[] = [
  { id: 'room-a', label: 'Room A', color: '#3b82f6' },
  { id: 'room-b', label: 'Room B', color: '#10b981' },
  { id: 'studio', label: 'Studio', color: '#8b5cf6' },
]

// Events around the week of `now` (week starting Sunday), so the demo is never empty.
export function demoEvents(now = new Date()): CalendarEvent[] {
  const sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
  const at = (day: number, h: number, m = 0) => new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + day, h, m)
  const ev = (id: string, title: string, day: number, h: number, dur: number, extra: Partial<CalendarEvent> = {}): CalendarEvent =>
    ({ id, title, start: at(day, h), end: new Date(+at(day, h) + dur * 3600e3), calendarId: 'work', ...extra })
  return [
    ev('standup', 'Team standup', 1, 9, 0.5, { recurrence: { freq: 'WEEKLY', byweekday: [0, 1, 2, 3, 4], count: 30 } }),
    ev('review', 'Design review', 1, 10, 1.5, { location: 'Room B', resourceId: 'room-b' }),
    ev('lunch', 'Lunch with Lea', 2, 13, 1, { calendarId: 'personal' }),
    ev('client', 'Client call', 2, 9, 1, { resourceId: 'room-a' }),
    ev('workshop', 'Workshop', 3, 10, 3, { resourceId: 'studio' }),
    ev('planning', 'Sprint planning', 4, 9, 2, { resourceId: 'room-a' }),
    ev('code', 'Code review', 4, 14, 1.5),
    ev('demo', 'Demo day', 5, 14, 2, { resourceId: 'studio' }),
    ev('gym', 'Gym', 3, 17, 1, { calendarId: 'personal' }),
    { id: 'offsite', title: 'Team offsite', start: at(1, 0), end: at(3, 0), allDay: true, calendarId: 'work' },
    { id: 'trip', title: 'Flight to Tokyo', start: at(4, 0), end: at(7, 0), allDay: true, calendarId: 'personal' },
  ]
}
