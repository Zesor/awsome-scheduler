import { test } from 'node:test'
import assert from 'node:assert/strict'
import { demoEvents, DEMO_CALENDARS, DEMO_RESOURCES } from './demo.ts'

const now = new Date(2026, 9, 21, 15, 0) // Wednesday
const events = demoEvents(now)

test('unique ids, valid ranges, known calendars and resources', () => {
  assert.equal(new Set(events.map((e) => e.id)).size, events.length)
  for (const e of events) {
    assert.ok(+e.end > +e.start, e.id)
    if (e.calendarId) assert.ok(DEMO_CALENDARS.some((c) => c.id === e.calendarId), e.id)
    if (e.resourceId) assert.ok(DEMO_RESOURCES.some((r) => r.id === e.resourceId), e.id)
  }
})

// Every day of the previous, current and next week has a timed event, whatever the day of the visit and
// whether the calendar's week starts on Sunday or Monday (it follows the locale): that is every day within
// 13 days of the visit. A Sunday visit used to show an empty "today" and empty weeks around it.
for (const [label, visit] of [['Wednesday', now], ['Sunday', new Date(2026, 9, 25, 10)], ['Saturday', new Date(2026, 9, 31, 22)], ['Monday', new Date(2026, 9, 26, 8)]] as const) {
  test(`previous, current and next week filled around a ${label} visit`, () => {
    const evs = demoEvents(visit)
    for (let d = -13; d <= 13; d++) {
      const day = new Date(visit.getFullYear(), visit.getMonth(), visit.getDate() + d)
      assert.ok(evs.some((e) => !e.allDay && e.start.toDateString() === day.toDateString()), day.toDateString())
    }
  })
}

test('has an all-day multi-day event, a recurring event and resource events', () => {
  assert.ok(events.some((e) => e.allDay && +e.end - +e.start > 864e5))
  assert.ok(events.some((e) => e.recurrence))
  assert.ok(events.filter((e) => e.resourceId).length >= 3)
})
