# Site 2.0, part A: library prerequisites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the calendarkit.io docs enough source material: expand the four thin sections of the library's `docs/guide.md`, and add the screenshots the site needs (each theme in light and dark, the undo toast).

**Architecture:** Two changes in the library repo `~/Work/calendarkit-pro` on one branch: prose in `docs/guide.md`, and new entries in `scripts/screenshots.mjs` that write PNGs to `docs/images/`. No library code changes. The site (plan B) syncs these files from the resulting git ref.

**Tech Stack:** Markdown; Node 24 script driving headless Chrome over CDP (existing); the library's Next.js demo on port 3140.

**Spec:** `docs/superpowers/specs/2026-10-24-site-2-0-redesign-design.md` in `~/Work/awsome-scheduler` (sections 6.3 items 4 and 5).

## Global Constraints

- Every sentence added to `guide.md` must be backed by the library's code, `docs/api.md`, `MIGRATION.md` or `CHANGELOG.md`. A sentence the executor cannot verify with the listed check is deleted, not softened.
- No emoji; no keyboard shortcuts described (Tab, Enter, Space, Escape are browser keys and may be named); house style of `guide.md`: short sentences, bullets, code blocks in `tsx`.
- Branch `docs/site-assets` from the library's `main`. Push, PR, merge, release each need the maintainer's explicit approval. No Claude co-author or "Generated with" lines.
- The library repo was read-only for the brainstorming session; this plan is the approved change to it.

## Review Focus

- A drafted sentence that describes behaviour the code does not have (for example `onTimezoneChange` firing when nothing in the UI changes the zone): each task lists the check that decides it.
- Relative links inside `guide.md` (`#all-day-and-multi-day-events`) must keep resolving: the site rewrites `#anchor` links to pages, and a renamed heading breaks its build.
- Headings: no `## ` heading added, removed or renamed (the site maps every `## ` heading to a page); new structure goes in `### ` or bullets.
- Screenshots: the theme shots must show the Classic week view at the same size as `week.png` (1440 x 900 at device scale 2) so the site tiles crop consistently.
- The undo toast disappears after 6 seconds: the capture must happen before that.

---

### Task 1: Expand Time zones, Resource scheduling, Custom event form and Internationalization in `docs/guide.md`

**Files:**
- Modify: `~/Work/calendarkit-pro/docs/guide.md` (sections `## Time zones`, `## Resource scheduling`, `## Custom event form`, `## Internationalization`)

**Interfaces:**
- Produces: the same four `## ` headings, longer bodies. Plan B maps them to `/docs/time-zones`, `/docs/resource-scheduling`, `/docs/custom-event-form`, `/docs/internationalization`.

- [ ] **Step 1: Create the branch**

```bash
cd ~/Work/calendarkit-pro
git switch main && git pull --ff-only
git switch -c docs/site-assets
```

- [ ] **Step 2: Replace the body of `## Time zones` with this draft**

````markdown
## Time zones

```tsx
<Scheduler
  timezone="Europe/Paris"
  onTimezoneChange={(tz) => console.log('Timezone:', tz)}
/>
```

`timezone` is an IANA time zone name, such as `'America/New_York'` or `'Asia/Tokyo'`. Without it, the calendar uses the browser's zone.

- Events are drawn at their time in that zone. Your data does not change: `start` and `end` stay the same instants, so an event at 9:00 in New York shows at 15:00 with `timezone="Europe/Paris"`.
- "Today", the current-time line, the hour the grid opens at and the grouping of the agenda follow `timezone` in the week, day, agenda and resource views.
- The built-in event form shows and saves times in `timezone`.
- All-day events are calendar dates: `timezone` never shifts them (see [All-day and multi-day events](#all-day-and-multi-day-events)).
- Recurring events keep their wall-clock time across daylight-saving changes, in that zone (see [Recurring events](#recurring-events)).
- The side panel shows the zone and its current time. Picking another zone there calls `onTimezoneChange` with its name; keep it in your state so the choice sticks:

```tsx
const [timezone, setTimezone] = useState('Europe/Paris');

<Scheduler timezone={timezone} onTimezoneChange={setTimezone} />
```
````

- [ ] **Step 3: Verify every Time zones bullet, delete what fails**

Run each check; a bullet whose check finds nothing is deleted.

```bash
cd ~/Work/calendarkit-pro
grep -n "timezone" docs/api.md                                   # prop and IANA example exist
grep -rn "Intl.DateTimeFormat().resolvedOptions\|resolvedOptions().timeZone" src | head   # browser default
grep -n "timezone" CHANGELOG.md | head -20                       # "today, the current-time line, initial scroll, grouping" (1.3.0); form in timezone (alpha)
grep -n "timezone" MIGRATION.md                                  # built-in form shows and saves times in timezone
grep -rn "onTimezoneChange" src --include=*.tsx | grep -v test   # where it is called: must be a user pick in the side panel
grep -rn "Time zone\|timeZone" src/components/Sidebar*.tsx src/components/*Timezone* 2>/dev/null | head
```

Expected: `onTimezoneChange` is called from the side panel's zone picker. If the picker updates the zone internally without the prop being controlled, keep the code sample but change "keep it in your state so the choice sticks" to what the code does.

- [ ] **Step 4: Replace the body of `## Resource scheduling` with this draft**

````markdown
## Resource scheduling

```tsx
const resources: Resource[] = [
  { id: 'room-a', label: 'Conference Room A', color: '#3b82f6' },
  { id: 'room-b', label: 'Conference Room B', color: '#10b981' },
];

<Scheduler
  view="resource"
  resources={resources}
  events={events}
/>
```

The resource view is a horizontal timeline with one row per resource: rooms, people, equipment.

- A resource is `{ id, label, color?, avatar? }`. An event goes on a row through its `resourceId`.
- An event without its own `color` or calendar takes its resource's colour.
- A click on a free slot of a row creates an event already assigned to that resource.
- Drag an event along its row to change its time, or to another row to change its resource. `onEventDrop` and `onEventUpdate` receive the event with its new `resourceId`.
- The view shares the time grid settings: `dayStartHour`, `dayEndHour` and `slotDuration` apply, left to right. `reverseTimeAxis` does not.
- Resources are rows, calendars are colours and filters: an event can have both a `resourceId` and a `calendarId` (see [Multiple calendars](#multiple-calendars)).
````

- [ ] **Step 5: Verify every Resource scheduling bullet, delete what fails**

```bash
cd ~/Work/calendarkit-pro
sed -n '/export interface Resource/,/^}/p' src/types.ts          # id, label, color?, avatar?
grep -n "resource" docs/guide.md | head                           # colour fallback "else its resource's in the resource view"
grep -n "pre-assigns\|resource" CHANGELOG.md | head -20           # "Clicking a slot in the resource view pre-assigns that resource" (1.3.0)
grep -n "resourceId" src/views/ResourceView.tsx | head -30        # drop handler writes resourceId
grep -n "dayStartHour\|slotDuration\|reverseTimeAxis" src/views/ResourceView.tsx | head
```

Expected: the drop handler sets `resourceId` from the target row; `dayStartHour`/`slotDuration` are read; `reverseTimeAxis` is not (the guide's Time grid section already says "The resource view keeps its left-to-right timeline"). Delete any bullet the code contradicts.

- [ ] **Step 6: Replace the body of `## Custom event form` with this draft**

````markdown
## Custom event form

```tsx
<Scheduler
  renderEventForm={({ isOpen, onClose, event, onSave, onDelete }) => (
    <MyCustomForm
      open={isOpen}
      onClose={onClose}
      event={event}
      onSave={onSave}
      onDelete={onDelete}
    />
  )}
/>
```

Your form replaces the built-in quick card and full form. It receives:

| Prop | Type | |
|------|------|---|
| `isOpen` | `boolean` | Whether the form should be shown |
| `onClose` | `() => void` | Call it to close the form |
| `event` | `CalendarEvent \| null` | The event being edited, or `null` for a new one |
| `initialDate` | `Date` | Start of the slot that was clicked, for a new event |
| `initialAllDay` | `boolean` | `true` when the form is opened from the all-day row |
| `onSave` | `(event: Partial<CalendarEvent>) => void` | Save the event (create or update) |
| `onDelete` | `(eventId: string) => void` | Delete the event |

- A click on a free slot, or **Create**, opens your form for a new event; a click on an event opens it with that event (`onEventClick` is still called first).
- It opens in every layout: Classic, Focus and Flow.
- When it closes, the focus goes back to what opened it.
- `components.EventEditor` is the same thing under another name; pass one or the other.
````

- [ ] **Step 7: Verify every Custom event form line, delete what fails**

```bash
cd ~/Work/calendarkit-pro
sed -n '/export interface EventEditorProps/,/^}/p' src/types.ts  # the table rows match these fields exactly
grep -n "renderEventForm\|EventEditor" MIGRATION.md CHANGELOG.md docs/guide.md | head -20
grep -rn "initialDate" src/index.tsx | head                      # what initialDate carries
```

Expected: the table matches `EventEditorProps` field for field (add or remove rows to match, and fix the `initialDate` description to what `src/index.tsx` passes). "Create opens your form" must be confirmed in `src/index.tsx`; if Create opens the quick card even with `renderEventForm`, remove "or **Create**".

- [ ] **Step 8: Replace the body of `## Internationalization` with this draft**

````markdown
## Internationalization

```tsx
import { fr } from 'date-fns/locale';

const frenchTranslations = {
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  createEvent: 'Créer un événement',
  // ... more translations
};

<Scheduler
  language="fr"
  locale={fr}
  translations={frenchTranslations}
/>
```

Three props work together:

- `language` (`'en'` or `'fr'`) picks the built-in language pack: every interface text, the event form, the side panel and the accessible labels read by screen readers.
- `translations` overrides single keys of that pack. The `CalendarTranslations` type lists every key.
- `locale` is a date-fns locale. It formats dates and month names, and sets the 12 or 24 hour clock and the first day of the week.

The quick card understands typed sentences in the calendar's `language`: "Lunch with Lea tomorrow 1pm for 2h" in English, the same kind of sentence in French. Time zones are separate: see [Time zones](#time-zones).

Calendars are only listed in the sidebar when you pass `calendars`.
````

- [ ] **Step 9: Verify every Internationalization line, delete what fails**

```bash
cd ~/Work/calendarkit-pro
grep -n "language" docs/api.md                                   # 'en' | 'fr'
grep -n "12h/24h\|week start\|locale" CHANGELOG.md | head        # 1.2.0: clock and week start follow the locale
grep -rn "language" src/lib/*parse* src/core/*parse* 2>/dev/null | head   # sentence parser takes the language
grep -n "CalendarTranslations" src/types.ts
```

Expected: the parser uses `language`; the week start comes from `locale` (1.2.0 "derived from the locale").

- [ ] **Step 10: Check the guide still renders and links resolve**

```bash
cd ~/Work/calendarkit-pro
grep -n "^## " docs/guide.md          # same 17 headings as before, same text
for a in $(grep -o "](#[a-z0-9-]*)" docs/guide.md | sed 's/](#//; s/)//' | sort -u); do
  t=$(grep -E "^#{2,3} " docs/guide.md | sed -E 's/^#+ //' | tr 'A-Z' 'a-z' | sed -E 's/[^a-z0-9 -]//g; s/ /-/g' | grep -x "$a")
  [ -z "$t" ] && echo "BROKEN #$a"
done
wc -w <(sed -n '/^## Time zones/,/^## Internationalization/p' docs/guide.md)
```

Expected: 17 headings unchanged, no `BROKEN` line, each of the four sections now 120 to 300 words.

- [ ] **Step 11: Commit**

```bash
git add docs/guide.md
git commit -m "docs: expand time zones, resources, custom form and i18n guide sections"
```

---

### Task 2: Theme and undo-toast screenshots

**Files:**
- Modify: `~/Work/calendarkit-pro/scripts/screenshots.mjs` (the `SHOTS` array)
- Create (generated): `docs/images/theme-calm.png`, `theme-calm-dark.png`, `theme-vivid.png`, `theme-vivid-dark.png`, `theme-editorial.png`, `theme-editorial-dark.png`, `undo-toast.png`

**Interfaces:**
- Produces: the seven PNG names above. Plan B uses them in the Layouts and themes section, the Create in place step 3 and the changelog.

- [ ] **Step 1: Add the shots to `SHOTS` (after the `phone-sheet` entry)**

```js
  ...['calm', 'vivid', 'editorial'].flatMap((t) => [
    { name: `theme-${t}`, url: `?tz=local&hour=8&theme=${t}`, w: 1440, h: 900 },
    { name: `theme-${t}-dark`, url: `?tz=local&hour=8&theme=${t}&dark=1`, w: 1440, h: 900 },
  ]),
  { name: 'undo-toast', url: '?tz=local&hour=8', w: 1440, h: 900, act: [click(byLabel('/^Code Review/')), click("[...document.querySelectorAll('[role=dialog] button')].find((b) => /^Delete$/.test(b.textContent.trim()))")] },
```

The undo toast lives outside `.ck-root` only if the library portals it; if the capture clips it, the clip already uses `.ck-root`'s rectangle, which contains the calendar's own toasts (they are rendered inside the root). Check in Step 3.

- [ ] **Step 2: Start the demo**

```bash
cd ~/Work/calendarkit-pro
npm run dev
```

Run it in the background; the script expects `http://localhost:3140/`.

- [ ] **Step 3: Generate only the new shots and look at each one**

```bash
node scripts/screenshots.mjs docs/images theme-calm theme-calm-dark theme-vivid theme-vivid-dark theme-editorial theme-editorial-dark undo-toast
```

Expected: seven `wrote <name> 1440 x <h>` lines. Open each PNG: the theme shots show the Classic week view in the right theme and mode; `undo-toast.png` shows the "Event deleted" toast with Undo. If the toast is missing, the 700 ms wait after the click plus 500 ms is under the 6 s lifetime, so the cause is the button selector: read the event card's markup (`src/components/EventPopover.tsx`) and fix the selector.

- [ ] **Step 4: Stop the demo, commit**

```bash
git add scripts/screenshots.mjs docs/images/theme-*.png docs/images/undo-toast.png
git commit -m "docs: theme and undo toast screenshots for the website"
```

- [ ] **Step 5: Hand-off (maintainer approval needed for each)**

Ask the maintainer to approve: push `docs/site-assets`, open the PR against `main`, merge. Record the resulting commit SHA (or the release tag if the maintainer releases 2.0.1): plan B's `sync-docs` takes it as its ref. Until then plan B syncs at `v2.0.0`.
