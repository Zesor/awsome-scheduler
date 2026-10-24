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

test('the current week is never empty: at least one timed event every weekday', () => {
  for (let d = 1; d <= 5; d++) {
    assert.ok(events.some((e) => !e.allDay && e.start.getDay() === d && Math.abs(+e.start - +now) < 7 * 864e5), `weekday ${d}`)
  }
})

test('has an all-day multi-day event, a recurring event and resource events', () => {
  assert.ok(events.some((e) => e.allDay && +e.end - +e.start > 864e5))
  assert.ok(events.some((e) => e.recurrence))
  assert.ok(events.filter((e) => e.resourceId).length >= 3)
})
