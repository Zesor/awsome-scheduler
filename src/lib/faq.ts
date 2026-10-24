export const FAQ = [
  { q: 'Is CalendarKit Pro free?', a: 'Yes. It is MIT licensed: free for personal and commercial use, with no keys and no seats.', href: '/docs' },
  { q: 'Does it work with Next.js?', a: 'Yes. The package is marked "use client", renders on the server with React 18 and 19, and hydrates without a warning.', href: '/docs#nextjs-and-server-rendering' },
  { q: 'Do I need Tailwind?', a: 'No. The calendar ships its own compiled, scoped stylesheet: nothing to configure, nothing leaks into your page.', href: '/docs/theming' },
  { q: 'Does it support time zones and recurring events?', a: 'Yes. Any IANA time zone for display, and daily to yearly recurrence kept at the same wall-clock time across daylight saving.', href: '/docs/time-zones' },
  { q: 'Does it work on phones?', a: 'Yes. Under 768 px of calendar width it switches to a phone layout with a drawer, bottom sheets and 44 px targets.', href: '/docs/phones-and-narrow-calendars' },
  { q: 'Is it accessible?', a: 'Yes. Every event and slot is a named button, dialogs keep and return the focus, and it all works with Tab, Enter, Space and Escape.', href: '/docs/accessibility' },
  { q: 'Can I use my own event form?', a: 'Yes. Pass renderEventForm and your form opens instead of the built-in one, in every layout.', href: '/docs/custom-event-form' },
]
