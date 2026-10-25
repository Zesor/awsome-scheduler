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

// Events every day from two weeks before to two weeks after the week of `now`, so the previous, current and
// next week shown are full whatever the day of the visit and whether the calendar's week starts on Sunday or Monday.
export function demoEvents(now = new Date()): CalendarEvent[] {
  const sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
  const at = (day: number, h: number, m = 0) => new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + day, h, m)
  const ev = (id: string, title: string, day: number, h: number, dur: number, extra: Partial<CalendarEvent> = {}): CalendarEvent =>
    ({ id, title, start: at(day, h), end: new Date(+at(day, h) + dur * 3600e3), calendarId: 'work', ...extra })
  // One week of events, `w` weeks from the current one (-2 to 2); titles vary a little from week to week.
  const week = (w: number): CalendarEvent[] => {
    const d = (day: number) => day + 7 * w
    const k = (id: string) => `${id}${w ? `-w${w}` : ''}`
    return [
      ev(k('run'), 'Morning run', d(0), 9, 1, { calendarId: 'personal' }),
      ev(k('review'), w ? 'Roadmap review' : 'Design review', d(1), 10, 1.5, { location: 'Room B', resourceId: 'room-b' }),
      ev(k('client'), 'Client call', d(2), 9, 1, { resourceId: 'room-a' }),
      ev(k('lunch'), w < 0 ? 'Lunch with Sam' : 'Lunch with Lea', d(2), 13, 1, { calendarId: 'personal' }),
      ev(k('workshop'), w > 0 ? 'Hiring panel' : 'Workshop', d(3), 10, w > 0 ? 2 : 3, { resourceId: 'studio' }),
      ev(k('gym'), 'Gym', d(3), 17, 1, { calendarId: 'personal' }),
      ev(k('planning'), 'Sprint planning', d(4), 9, 2, { resourceId: 'room-a' }),
      ev(k('code'), 'Code review', d(4), 14, 1.5),
      ev(k('demo'), w < 0 ? 'Retro' : 'Demo day', d(5), 14, w < 0 ? 1 : 2, { resourceId: 'studio' }),
      ev(k('brunch'), 'Brunch', d(6), 11, 1.5, { calendarId: 'personal' }),
    ]
  }
  return [
    ...[-2, -1, 0, 1, 2].flatMap(week),
    // 0 = Monday in `byweekday`; five weeks of weekdays from the Monday two weeks back
    ev('standup', 'Team standup', -13, 9, 0.5, { recurrence: { freq: 'WEEKLY', byweekday: [0, 1, 2, 3, 4], count: 25 } }),
    { id: 'offsite', title: 'Team offsite', start: at(1, 0), end: at(3, 0), allDay: true, calendarId: 'work' },
    { id: 'trip', title: 'Flight to Tokyo', start: at(4, 0), end: at(7, 0), allDay: true, calendarId: 'personal' },
    { id: 'conf', title: 'React conference', start: at(9, 0), end: at(11, 0), allDay: true, calendarId: 'work' },
  ]
}
