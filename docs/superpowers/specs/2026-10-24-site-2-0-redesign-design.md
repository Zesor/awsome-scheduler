# calendarkit.io for CalendarKit Pro 2.0: site redesign

Date: 24 October 2026. Status: design approved in conversation, spec awaiting review.

## 1. Goal

calendarkit.io (this repo, Next.js app `calendarkit-website`) still presents CalendarKit Pro 1.x. Rebuild the landing page, the documentation and the changelog so that the site presents 2.0 exactly as the library ships it, sells it like a SaaS product, and ranks and gets cited better for "react calendar" queries.

Success means:
- Nothing on the site contradicts the 2.0 sources of truth (library repo `~/Work/calendarkit-pro`: `README.md`, `docs/guide.md`, `docs/api.md`, `MIGRATION.md`, `CHANGELOG.md`, `docs/images/`). No invented features (ICS import/export does not exist).
- Landing, docs and changelog match the validated mockups (section 4).
- Each docs topic has its own indexable URL with a self canonical, a targeted title and description.
- The docs come from the library's markdown, synced at a tag, never rewritten by hand.
- `npm run check` and `scripts/check-site.mjs` pass.

Out of scope: a comparison page (`/compare`, later, separate task); off-site work (npm and GitHub README links back, directory listings, Reddit); a blog.

Maintainer rules that apply everywhere: no emoji in UI or docs; no blurred overlays or blur effects; no keyboard shortcuts; minimal copy (one line per item, detail goes to the docs); conventional branch names; no Claude co-author or "Generated with" lines in commits or PRs; push, PR, merge, deploy and publish each need the maintainer's explicit approval.

## 2. Decisions taken

| Topic | Decision |
|---|---|
| calendarkit-basic | Dropped from the site. One product. |
| Visual direction | "Quiet product": neutral, light first, black buttons, the site wears the Calm theme; full dark mode. Font: Instrument Sans (`next/font/google`). |
| Site color mode | Follows the system by default, toggle in the header, choice remembered (`next-themes`, `defaultTheme="system"`, `enableSystem`). The hero calendar's `mode` follows the site mode. |
| Hero | Centred layout A with a live `<Scheduler>` below. |
| Docs source | Library markdown copied into `content/` by a sync script pinned to a tag, rendered at build time. |
| Docs structure | `/docs` is the Introduction; one page per guide section under `/docs/<slug>`; `/docs/migration`; `/docs/api`. Three-column layout. |
| Docs additions | Live examples on 8 pages; a props table per page extracted from `api.md`. |
| Search | Built-in, build-time JSON index, no shortcut, no external service, no dependency. |
| Changelog | From the library `CHANGELOG.md`; releases by default, pre-releases grouped under their stable release; the old unnumbered 1.x block is hidden. |
| Thin guide sections | Expanded in the library's `guide.md` (separate library docs PR) before the site launches. |
| Implementation | Rebuild in place in this app; every dependency at its latest version; unused ones removed. |
| Comparison page | Not now. |

## 3. Facts the copy may use

All copy is short and comes from the library docs. Allowed facts: five views (month, week, day, agenda, resource); create in place by click or drag, quick card that understands a sentence ("Lunch with Lea tomorrow 1pm for 2h") in English and French; Undo for every change (6 seconds); event card beside the event; drag and drop, resize, snap to `slotDuration`; recurring events (daily to yearly, wall-clock times kept across daylight saving); time zones (any IANA zone, all-day events never shifted); time grid (`dayStartHour`, `dayEndHour`, `slotDuration`, `workingHours`, `scrollToHour`, `reverseTimeAxis`); resources; multiple calendars; places (`placeSearch`, `photonPlaces()`, OpenStreetMap, no key); three layouts (Classic, Focus, Flow); three themes (Calm default, Vivid, Editorial) in light and dark, every colour a CSS variable, WCAG AA event colours; phone layout under 768 px of calendar width (day view first, drawer, bottom sheets, 44 px targets); accessibility (Tab, Enter, Space, Escape, named buttons, focus trapped and returned, no shortcuts to learn); zero CSS setup (scoped compiled stylesheet); TypeScript; React 18 and 19 (peer dependency `^18 || ^19`); server rendering; 10,000 events; headless core (`calendarkit-pro/core`) and React bindings (`calendarkit-pro/react`); MIT; `language` is `'en' | 'fr'`.

Social proof: "50,000+ installs" (total since the first release, per the maintainer), a fixed string in config, updated by hand.

## 4. Pages and sections

Validated mockups are in `docs/superpowers/specs/2026-10-24-site-2-0-mockups/`. They load images from `/files/<name>.png`; those images are the library's `docs/images/*.png` (view them with the brainstorm companion or by replacing the path). The mockups are the reference for layout, spacing, copy and motion. Where a mockup shows a screenshot, the site uses the live component or the real screenshot as stated below.

Shared design tokens (from the mockups): background `#fafafa`, surface `#fff`, ink `#0a0a0a`, muted `#5f5f5f`, faint `#8a8a8a`, line `#e7e7e7`, soft `#f4f4f5`, accent green `#059669` (dark `#34d399`); dark mode equivalents as in `hero-full-v7.html`. Radius 18 px tiles, 12 px buttons. Motion: `cubic-bezier(.16,1,.3,1)`; everything disabled under `prefers-reduced-motion` (final state shown).

Shared section pattern: green eyebrow (short line + label), h2 on two lines (second line in faint colour), bento tiles (`viz` area + text row with title, one line, and "Docs →" or "Try it ↑" shown on hover). Tiles reveal on scroll: fade and rise, 70 ms stagger, once (IntersectionObserver).

### 4.1 Landing `/` (in order)

1. **Header** (`hero-full-v7.html`). Sticky, solid background (no blur). Logo, Docs, API, Changelog, version from `content/meta.json` (`v2.0.0`), GitHub, light/dark toggle.
2. **Hero** (`hero-full-v7.html`).
   - Badge: `2.0` Redesigned, accessible, ready for phones →, links to `/changelog#2.0.0`.
   - h1: "The best React calendar," then line 2: "with" + rotating phrase, underlined in accent (thin underline drawn left to right on each change). Phrases: everything built in. (anchor, 3.6 s) / drag and drop. / recurring events. / time zones. / resource views. / three themes. / a phone layout. / undo everywhere. (1.9 s each). Old phrase leaves upward, new one enters from below, width animates. Server HTML holds the complete sentence "The best React calendar, with everything built in." in one h1; the rotation is a client enhancement inside a span marked `aria-hidden` with a visually hidden fixed copy for screen readers.
   - Lead: "CalendarKit Pro is the complete React calendar. Five views, events created from a sentence, drag and drop, recurring events, time zones and a real phone layout. Free and MIT licensed."
   - CTAs: primary "Get started, it's free →" (to `/docs`), sheen once 1.6 s after load and on hover, lift 1 px, arrow slides 3 px; secondary `$ npm i calendarkit-pro`, copies on click, check + "Copied" for 1.4 s.
   - Proof chips with logos: npm logo + **50,000+** installs (to npm), MIT mark + **MIT** licensed (to LICENSE on GitHub), TypeScript logo + **TypeScript** types included (to `/docs/api`). The MIT mark is a text mark, not the MIT institute logo.
   - Background: hairline week grid faded at the edges, fades in once.
   - Entrance: words of the h1 rise one by one, then lead, CTAs, proof, calendar in cascade (under 1 s).
   - Try-it bar above the calendar: green dot + "Try it: click a free slot and type" with the sentence typed once; segmented controls Theme (Calm, Vivid, Editorial) and Layout (Classic, Focus, Flow).
   - Live `<Scheduler>` in a 680 px tall frame (560 px under 720 px), demo events generated around the current week, uncontrolled (`defaultEvents`), `mode` bound to the site mode, no `placeSearch`.
3. **Create in place** (`create-in-place-v4.html`). Eyebrow "Create in place"; h2 "From a click to an event. / In one sentence."; intro "No modal, no form. Type what you mean." Three steps on the left, auto-advancing every 5.5 s with a progress bar, clickable, paused on hover: Click or drag over free time / A quick card opens right beside it. Type a sentence / Dates and times are understood, in English and French. Undo anything / Every change can be undone for six seconds. Right: scene 1 real screenshot `quick-create.png` cropped on the card; scene 2 the quick card redrawn in HTML, typing the sentence then showing "Tomorrow, 1:00 PM – 3:00 PM" in green and the event moving to 1–3 PM; scene 3 real screenshot `event-card.png` with the real undo toast (new screenshot, see 6.3). Bottom row of four titles with green dots: Beside, never on top / Overlaps announced / Nothing lost on close / Or bring your own form.
4. **Features** (`features-v2.html`). Eyebrow "Features"; h2 "Everything a calendar needs. / Nothing left to build." Bento, 3 columns: Five views (wide, view tabs cycle every 2.6 s, hover a tab to show it) / Drag and drop (event moves and stretches on hover, dashed origin) / Recurring events (occurrences fill in when in view) / Time zones (two real clocks, Paris and New York) / Time grid (hours, shaded off-hours, working hours) / Resources (wide, timeline) / Places (Louvre suggestions, OpenStreetMap). Each links to its docs page. Bottom line of green dots: English and French · 10,000 events · Server rendering · Headless core · Zero CSS setup.
5. **Layouts and themes** (`layouts-themes-bento-v2.html`). h2 "Three layouts. Three themes. / Light and dark." Zigzag bento: Classic (wide) + Calm; Vivid + Focus (wide); Flow (wide) + Editorial; Your brand (wide: `.ck-root { --ck-primary; --ck-radius }`, four swatches recolour a sample button and event live) + Light and dark (`mode="system"`). Layout tiles use real screenshots that pan on hover; theme tiles use real screenshots of each theme in light and dark (new screenshots, see 6.3). "Try it ↑" sets the hero calendar's layout or theme and scrolls to it.
6. **Phones and accessibility** (`phones-a11y-v2.html`). h2 "Works on every screen. / And for everyone." Two tiles. Ready for phones: two tilted phone frames with `phone.png` and `phone-sheet.png`, they part on hover; "Under 768 px of calendar width, it becomes a phone app."; chips Day view first · Drawer · Bottom sheets · 44 px targets. Accessible: focus ring moving from a slot to an event, a "screen reader" bubble with the guide's exact announced names; "Every event and slot is a named button."; chips Tab, Enter, Space, Escape · Focus returned · WCAG AA colours · No shortcuts to learn.
7. **Get started** (`code.html`). Eyebrow "Get started"; h2 "Install. Import. Ship. / No CSS to set up." Wide editor tile (tabs Quick start, Your state, Next.js, Customize; file name; Copy; code from the README) with footer "One component / Its own styles, scoped. Nothing leaks into your page." + "Read the guide →". Side: Install tile (npm, pnpm, yarn, bun; "React 18 or 19. That's the only requirement.") and Four entry points tile.
8. **Upgrading from 1.x** (`upgrade-cta-footer.html`). One card to `/docs/migration`: "Your 1.4 code still runs." / "Every 1.4 example is part of the 2.0 test suite."; package.json diff `^1.4.1` → `^2.0.0`; three checks: No Tailwind setup anymore · `theme="vivid"` for the 1.x look · `cn` is no longer exported.
9. **FAQ** (new, no mockup; same visual language: question-form h3s, one-sentence answers, each linking to its docs page; visible, not collapsed). Questions: Is CalendarKit Pro free? Does it work with Next.js? Do I need Tailwind? Does it support time zones and recurring events? Does it work on phones? Is it accessible? Can I use my own event form? Answers only from section 3. `FAQPage` JSON-LD matches the visible text.
10. **Final call** (`upgrade-cta-footer.html`). Faded grid; "Your calendar, / shipped today."; "Free and MIT licensed."; same CTAs as the hero.
11. **Footer**. Logo + "The best React calendar, with everything built in."; Product (Docs, API reference, Changelog, Migration), Open source (GitHub, npm, Issues, License), Contact (support@calendarkit.io); "© 2026 CalendarKit. MIT licensed." and "Made by Illyas Chihi".

Removed from the current site: seasonal banner, pricing, use cases, time savings, testimonials, comparison/demo section, Basic, ICS everywhere, the 1.x `pro-scheduler` demo.

### 4.2 Docs (`docs-intro-v2.html`, `docs-page.html`)

Layout: header with "CalendarKit / Docs"; left sidebar 260 px (search field, groups); content max 760 px; right "On this page" 220 px (scroll-spy) with Edit on GitHub and Report an issue. Under 1100 px the right column hides; under 760 px the sidebar becomes a drawer (solid scrim, no blur).

Page anatomy: breadcrumb (visible + `BreadcrumbList`), h1, a one-sentence lede (plain text, quotable), optional live example, the markdown content, optional "Props" table, Previous / Next, "From `<file>` at v2.0.0 · Last updated <date>" and Edit on GitHub. Code blocks: shiki, file name or language, Copy. Inline code, tables, heading anchors styled as in the mockup. Links underlined in accent.

Navigation and slugs:

| Group | Page | URL | Source |
|---|---|---|---|
| Getting started | Introduction | `/docs` | README: Installation, Quick start, Keeping the events in your state, Next.js and server rendering, Entry points; plus a Core concepts card grid (Events, Views and layouts, Calendars and resources, Callbacks) linking into the docs |
| | Migrating from 1.x | `/docs/migration` | MIGRATION.md |
| Calendar | Views | `/docs/views` | guide `## Views` |
| | Time grid | `/docs/time-grid` | guide |
| | All-day and multi-day events | `/docs/all-day-and-multi-day-events` | guide |
| | Recurring events | `/docs/recurring-events` | guide |
| | Time zones | `/docs/time-zones` | guide |
| | Resource scheduling | `/docs/resource-scheduling` | guide |
| | Multiple calendars | `/docs/multiple-calendars` | guide |
| Editing | Creating, editing and undoing | `/docs/creating-editing-and-undoing` | guide |
| | Custom event form | `/docs/custom-event-form` | guide |
| | Places | `/docs/places` | guide |
| Look and feel | Layouts | `/docs/layouts` | guide |
| | Theming | `/docs/theming` | guide (incl. Styles and Content-Security-Policy) |
| | Customizing | `/docs/customizing` | guide |
| | Internationalization | `/docs/internationalization` | guide |
| Platform | Phones and narrow calendars | `/docs/phones-and-narrow-calendars` | guide |
| | Accessibility | `/docs/accessibility` | guide |
| | Headless core and React bindings | `/docs/headless-core-and-react-bindings` | guide |
| Reference | API reference | `/docs/api` | api.md |
| | Changelog | `/changelog` | CHANGELOG.md |

Live examples (client component, loaded when scrolled into view, controls bound to the page's props): Views (view switcher), Time grid (hours, slot, working hours, reversed), Layouts (layout), Theming (theme, mode), Time zones (timezone), Internationalization (language), Resource scheduling (resource view with resources), Phones and narrow calendars (calendar in a 375 px column).

Props per page: listed by name in `docs-nav.ts`, rows extracted from the `api.md` Props table (name, type, description), links inside descriptions rewritten like the rest.

Search: a field at the top of the sidebar opens a results list as you type (page title, heading, snippet); index of headings and paragraph text built at build time (`/search-index.json`), matched in the browser. No keyboard shortcut. Results are links; arrow keys and Enter work inside the list as normal list navigation.

Old anchors: `/docs#<old-id>` (`installation`, `pro-timezone`, `pro-recurring`, `pro-resources`, `theming`, … every id of the current page) redirect client-side to the matching new page; table in `docs-nav.ts`; ids with no 2.0 equivalent (basic-*, pro-ics, pro-context-menus, pro-notifications, basic-loading) go to the closest page (`/docs`, `/docs/creating-editing-and-undoing`, `/docs/api`). `/docs` stays a real page with links to every docs page.

Unknown slug: styled 404 with links to the docs.

### 4.3 Changelog `/changelog` (`changelog-v2.html`)

Title "Changelog", "Every release of calendarkit-pro." + GitHub releases link; segmented "Releases / Include pre-releases" (Releases default). Each release: sticky left column (version with anchor `#x.y.z`, "Latest" badge on the newest stable, date from npm), right column notes with coloured labels (Highlights black, Added green, Fixed blue, Changed and Deprecated amber, Removed red, Internal grey). 2.0.0: intro sentence, week screenshot, Highlights, Removed, "Upgrading from 1.x? → Migration guide" card, a collapsible "13 pre-releases led to 2.0.0" listing each pre-release (one-line summary = its first bullet, expandable to its full notes). 1.4.1 to 1.2.0 shown normally. Everything after the last numbered release (the old "Features Added" block) is not rendered.

## 5. SEO and GEO

From the OpenSEO audit of 24 October 2026 (report: https://app.openseo.so/p/41b5814e-9e81-4bb4-98cd-9dfd8e530d77/reports/4876a850-e65b-4985-b840-f1f0689f3b60; notes: `seo-geo-audit.md` in the session notes folder). Search Console, last 3 months: 1.47K clicks, 41.4K impressions, CTR 3.5%, average position 12.6; top query "react calendar" (195 clicks, 3,708 impressions). Live US desktop: "react calendar scheduler" #3; "react calendar", "react calendar component", "react scheduler" not in the first 20; AI Overview on all four.

### 5.1 Defects to fix (all verified on the live site)

- `/docs` and `/changelog` declare the homepage as canonical: every page gets a self canonical (absolute URL).
- Host: the apex `https://calendarkit.io` is the only canonical host. Canonicals, `og:url`, sitemap, JSON-LD, `metadataBase` use it. The maintainer switches Vercel to redirect `www` to the apex with a permanent 308 (today the apex 307s to www).
- JSON-LD: remove `aggregateRating` (4.9 / 127, unbacked), the two 1.x offers, the `SearchAction` to `/?q=`, the 404 logo URL; remove ICS from `featureList`.
- Sitemap: real URLs only (landing, `/docs`, every docs page, `/changelog`), no hashes; `lastmod` from `content/meta.json` sync date for docs and changelog, from the git commit date of the page component for the landing (computed at build).
- robots: one `*` group that allows the whole site (the current `/_next/` disallow is removed), no `host` line, the `Sitemap` line kept; explicit allow groups for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended.
- Titles: no doubled brand; meta keywords removed; descriptions 70 to 155 characters.
- ICS removed from all copy.
- Social image: per page, 1200x630, from `/og?title=…&section=…` (existing `og/route.tsx`, redesigned in the quiet style); `twitter:card` `summary_large_image`.

### 5.2 Titles and descriptions

| Page | Primary query | Title | Description |
|---|---|---|---|
| `/` | react calendar | React Calendar and Scheduler Component \| CalendarKit | Free MIT React calendar and scheduler: week, month, day, agenda and resource views, recurring events, time zones, undo. npm install calendarkit-pro. |
| `/docs` | calendarkit pro | Introduction to CalendarKit Pro, a React Calendar | Install calendarkit-pro and render a full React calendar in one component, with its own styles. Quick start, Next.js and entry points. |
| `/docs/migration` | calendarkit 2.0 migration | Migrating CalendarKit from 1.x to 2.0 | Every breaking change in CalendarKit Pro 2.0, why it was made and what to do: styles without Tailwind, the new default theme, removed exports. |
| `/docs/views` | react week view calendar | React Calendar Views: Week, Month, Day, Agenda | Month, week, day, agenda and resource views in the CalendarKit Pro React calendar, and how to control the view from state. |
| `/docs/time-grid` | react day view calendar | React Calendar Time Grid: Hours, Slots, Working Hours | Set the visible hours, slot length, working hours and a reversed time axis in a React week or day view with CalendarKit Pro. |
| `/docs/all-day-and-multi-day-events` | react calendar all day events | All-Day and Multi-Day Events in a React Calendar | All-day and multi-day events in CalendarKit Pro: the all-day row, bars across days, exclusive end dates and dragging bars by whole days. |
| `/docs/recurring-events` | react calendar recurring events | Recurring Events in a React Calendar | Repeat events daily to yearly with freq, interval, count and until, kept at the same wall-clock time across daylight saving. |
| `/docs/time-zones` | react calendar timezone | Time Zones in a React Calendar \| CalendarKit | Show a React calendar in any IANA time zone with the timezone prop, and react to changes with onTimezoneChange. All-day events never shift. |
| `/docs/resource-scheduling` | react resource scheduler | React Resource Scheduler: Rooms, People, Equipment | Schedule events across rooms, people or equipment in a React calendar with the resource view of CalendarKit Pro. Data shape and code. |
| `/docs/multiple-calendars` | react multiple calendars | Multiple Calendars in a React Calendar | Show several calendars at once in CalendarKit Pro, toggle them, and colour events by calendar with readable contrast. |
| `/docs/creating-editing-and-undoing` | react drag and drop calendar | Create, Edit and Undo Events in a React Calendar | Create events by click or drag, type a sentence to fill them in, move and resize by drag and drop, and undo any change in CalendarKit Pro. |
| `/docs/custom-event-form` | react calendar custom event form | Custom Event Form for a React Calendar | Replace the CalendarKit Pro event form with your own using renderEventForm. It opens in every layout. Typed example included. |
| `/docs/places` | react calendar location autocomplete | Location Autocomplete for React Calendar Events | Add place suggestions to the event Location field with placeSearch: the built-in OpenStreetMap adapter, no key, or your own provider. |
| `/docs/layouts` | react calendar layout | React Calendar Layouts: Classic, Focus and Flow | Pick a CalendarKit Pro layout: Classic with a side panel, Focus with a floating toolbar, or Flow with a day feed and free slots to book. |
| `/docs/theming` | react calendar theming | Theming a React Calendar: Colors and Dark Mode | Theme the CalendarKit Pro React calendar with Calm, Vivid or Editorial, light or dark, and --ck-* CSS variables. No Tailwind setup. |
| `/docs/customizing` | customize react calendar | Customizing the CalendarKit React Calendar | Add classes with classNames and swap parts with components: Toolbar, Sidebar, EmptyState, EventContent, EventEditor. Keep the rest. |
| `/docs/internationalization` | react calendar i18n | React Calendar Internationalization and Locales | Translate the CalendarKit Pro React calendar with language, translations and date-fns locales, with a French example. |
| `/docs/phones-and-narrow-calendars` | react mobile calendar | Mobile and Narrow React Calendar \| CalendarKit | Under 768 px of calendar width, CalendarKit Pro switches to its phone layout: day view first, drawer, bottom sheets, 44 px targets. |
| `/docs/accessibility` | accessible react calendar | Accessible React Calendar: Keyboard and ARIA | How CalendarKit Pro works with Tab, Enter, Space and Escape, names every event and slot, and returns the focus. No shortcuts to learn. |
| `/docs/headless-core-and-react-bindings` | headless calendar react | Headless Calendar Core for React and Beyond | Use calendarkit-pro/core, the framework-free calendar engine, and calendarkit-pro/react hooks to build your own calendar UI. |
| `/docs/api` | calendarkit api | CalendarKit Pro API Reference: Props and Types | Every prop, type and export of calendarkit-pro: Scheduler props, CalendarEvent, Resource, CalendarTheme and the four entry points. |
| `/changelog` | calendarkit changelog | CalendarKit Pro Changelog and Release Notes | Release notes for calendarkit-pro: 2.0.0 and every earlier release, with added, changed and fixed items by version. |

The implementer re-checks each description against the page body after the library docs PR; any claim not in the page is rewritten. Titles stay under 60 characters (escaped `|` above is a plain pipe).

### 5.3 Structured data

- Landing: `SoftwareSourceCode` (name "CalendarKit Pro", `codeRepository` github.com/Zesor/calendarkit-pro, `programmingLanguage` TypeScript, `license` MIT URL, `runtimePlatform` React, `sameAs` npm and GitHub) and `SoftwareApplication` (`applicationCategory` DeveloperApplication, `offers` price 0, no rating); `Organization` with a working logo URL; `WebSite` without SearchAction; `FAQPage` for the visible FAQ.
- Docs pages: `TechArticle` (headline, description, `dateModified` = sync date, `author` Organization) and `BreadcrumbList`.
- Changelog: `BreadcrumbList`.
- Every block is validated by `check-site.mjs` (parses, no `aggregateRating`).

### 5.4 GEO

- Quotable definition, plain text near the top: landing (lead) and `/docs` lede: "CalendarKit Pro (calendarkit-pro on npm) is a free, MIT-licensed React calendar and scheduler component for React 18 and 19." Always "CalendarKit Pro" with the npm name, to separate it from the iOS CalendarKit.
- `/llms.txt`: H1 "CalendarKit Pro", one-line summary blockquote, then one link per docs page to its `.md` with a one-line description (the page's meta description). `/llms-full.txt`: README quick start + guide + api + migration in one file.
- `/docs/<slug>.md` (and `/docs.md` for the Introduction): the page's markdown, served as `text/markdown; charset=utf-8`; each docs page has `<link rel="alternate" type="text/markdown" href="…">`.
- Everything server-rendered: h1 sentence, docs text, code (tabs render all panels in the HTML, hidden ones with `hidden`), FAQ.
- Freshness: visible "Last updated" date and version on docs pages; dated changelog.

### 5.5 Internal linking

- Landing: hero "Get started" to `/docs`; each feature, layout and theme tile links to its docs page with a descriptive accessible name; upgrade card to `/docs/migration`; FAQ answers link to their page; footer links Docs, API, Changelog, Migration.
- Docs: Previous / Next plus up to three related pages per page (list in `docs-nav.ts`: e.g. Time grid → Time zones, Views, All-day; Recurring → Creating, API; Resource scheduling → Multiple calendars, Views; Layouts → Phones, Customizing; Theming ↔ Customizing; Internationalization → Time zones; Headless core → API; Migration → Theming, Customizing, API, Changelog). Anchor text is the target page's title.
- Changelog: entries keep their markdown links, rewritten to site URLs.

## 6. Architecture

### 6.1 Stack

Latest versions at implementation time (checked 24 Oct 2026): next 16.4.3, react and react-dom 19.3.1, eslint-config-next 16.4.3, tailwindcss and @tailwindcss/postcss 4.3.3, @tailwindcss/typography, calendarkit-pro 2.0.0, next-themes, lucide-react 1.x, @vercel/analytics 2.x, unified, remark-parse, remark-gfm, remark-rehype, rehype-stringify, rehype-pretty-code, shiki 4.x, clsx, tailwind-merge, typescript 7, eslint 10. If typescript 7 or eslint 10 breaks the build or lint, pin the previous major and tell the maintainer.

Removed: calendarkit-basic, @splinetool/*, @dnd-kit/*, @tanstack/react-virtual, framer-motion, vaul, rrule, date-fns, date-fns-tz, usehooks-ts, react-icons, @radix-ui/*, class-variance-authority, tailwindcss-animate, tw-animate-css, geist, and `pnpm-lock.yaml` (npm only). Any of these still imported after the rebuild is a bug. Umami and Vercel Analytics stay.

`README.md` of this repo rewritten (what the site is, `npm run dev`, `sync-docs`, `check`). `SEO_STRATEGY.md` replaced by a short `SEO.md` pointing to this spec's section 5 and the audit report. `NPM_PUBLISHING_GUIDE.md` deleted if it describes the old Basic/Pro publishing (check first).

### 6.2 Files

```
scripts/sync-docs.mjs        tag -> content/ (README, guide, api, MIGRATION, CHANGELOG, images, meta.json with tag, sync date, npm dates)
scripts/check-site.mjs       post-build SEO and link guard
content/                     synced files, committed
src/app/
  layout.tsx                 fonts, theme provider, analytics, base metadata (metadataBase apex)
  page.tsx                   landing
  docs/page.tsx              Introduction
  docs/[slug]/page.tsx       guide pages, migration, api (generateStaticParams)
  md/[[...slug]]/route.ts    markdown alternates, exposed as /docs.md and /docs/<slug>.md through rewrites in next.config
  changelog/page.tsx
  llms.txt/route.ts  llms-full.txt/route.ts  search-index.json/route.ts (static)
  og/route.tsx  sitemap.ts  robots.ts  not-found.tsx
src/components/landing/      Header, Hero, HeroCalendar, CreateInPlace, Features, LayoutsThemes, PhonesA11y, GetStarted, Upgrade, Faq, FinalCta, Footer
src/components/docs/         Sidebar, Search, Toc, CodeBlock, PropsTable, LiveExample, Pager, OldAnchorRedirect
src/components/ui/           Tile, Reveal, CopyButton, Eyebrow, ThemeToggle
src/lib/content.ts           reads content/, splits guide.md, rewrites links, extracts props, parses changelog
src/lib/docs-nav.ts          slugs, titles, groups, SEO title/description, props per page, live example per page, related pages, old-anchor map
src/lib/site.ts              site constants (URL, version, proof string, FAQ, structured data builders)
```

Everything else under `src/components` and the unused parts of `src/lib` are deleted.

### 6.3 Content flow

1. `npm run sync-docs -- v2.0.0` downloads, at that tag of Zesor/calendarkit-pro, `README.md`, `docs/guide.md`, `docs/api.md`, `MIGRATION.md`, `CHANGELOG.md`, `docs/images/*`, plus npm release dates (`npm view calendarkit-pro time --json`), into a temp folder, then replaces `content/` in one move and writes `content/meta.json` `{ tag, version, syncedAt, releaseDates }`. Unknown tag or network error: clear message, nothing written. The result is committed and reviewed as a diff.
2. Build: `content.ts` splits `guide.md` on `## ` headings; every heading must be in `docs-nav.ts` (else the build fails naming it). Links rewritten: `guide.md#x` and `#x` inside the guide → `/docs/<slug>` (with `#sub` for h3s), `api.md` → `/docs/api`, `../MIGRATION.md` and `MIGRATION.md` → `/docs/migration`, `CHANGELOG.md` → `/changelog`, `docs/images/x.png` → `/images/x.png`, README anchors → `/docs#…`. An internal link with no target fails the build. Props named in `docs-nav.ts` and missing from `api.md` fail the build.
3. Images: `content/images` copied to `public/images` at build (or synced there directly).
4. Extra screenshots for the site (each theme light and dark in Classic week view, the undo toast, Focus and Flow for the tiles if the existing ones crop badly) are produced in the library with `node scripts/screenshots.mjs <dir>` from its demo (`?layout=&theme=&dark=1&view=`). The undo-toast state may need a small addition to that script. This is a library change: separate branch and PR there, maintainer approval, then the files come in through `sync-docs`.
5. Library docs PR (prerequisite, approved): expand the thin `guide.md` sections (Time zones 12 words, Resource scheduling 36, Custom event form 37, Internationalization 70, and Multiple calendars, Places if needed) so each page stands on its own (aim 150 to 300 words with code, facts from the code and api.md only). Released with the next library version or merged to the library's main branch; the site syncs at the resulting ref. If the maintainer wants to launch before it lands, `docs-nav.ts` may map a thin section into a neighbour page (Time zones into Internationalization, Custom event form into Creating), keeping their URLs as anchors; this fallback is used only on explicit request.

### 6.4 Error handling

- Build fails, with file and heading or link, on: unmapped guide heading, dangling internal link, missing prop, malformed `meta.json`.
- Live calendars: server-rendered, container with fixed height (no layout shift), demo events built around the current week, uncontrolled, no `placeSearch`; wrapped in an error boundary that falls back to the matching screenshot. Docs live examples mount when scrolled into view.
- Rotating h1: complete sentence in the server HTML; rotation only on the client; no `aria-live`.
- `prefers-reduced-motion`: every animation shows its final state (no typing, no rotation, no auto-advance, no reveal).
- Unknown docs slug: 404 page with docs links.

## 7. Tests and checks

- `src/lib/content.test.ts` with `node --test` (no new dependency): guide split, link rewriting, props extraction, changelog parsing (versions, labels, pre-releases grouped, old block ignored), and the failure cases (unmapped heading, dangling link, missing prop).
- `npm run check`: `tsc --noEmit`, eslint, the unit tests, `next build`.
- `scripts/check-site.mjs` after the build, against `next start`: every internal link (including sitemap, llms.txt, `.md` alternates) answers 200; each page has a self canonical on the apex host, a unique title of 60 characters or less, a description of 70 to 155 characters, exactly one h1, `og:url` equal to the canonical, JSON-LD that parses and has no `aggregateRating`; `llms.txt` lists every docs page; `/` HTML contains "The best React calendar, with everything built in.".
- Browser checks before the PR: each section against its mockup in light, dark and at 375 px; reduced motion; hero and two docs live examples (create, undo, switch theme and layout); no console errors.
- Maintainer after deploy: Vercel `www` → apex 308; Rich Results Test; PageSpeed Insights before and after; resubmit the sitemap in Search Console and Bing; optionally IndexNow.

## 8. Order of work

1. Library docs PR expanding thin sections, and the extra screenshots (library repo, separate branch, maintainer approval).
2. Site: dependencies update and cleanup; content pipeline (`sync-docs`, `content.ts`, `docs-nav.ts`, tests).
3. Docs pages, search, changelog, markdown alternates, llms files.
4. Landing sections.
5. SEO layer (metadata, structured data, sitemap, robots, OG), `check-site.mjs`.
6. Verification, then PR on a `feat/` branch; push, PR, merge and deploy each on the maintainer's approval.

## 9. Follow-ups (not in this spec)

- `/compare` page (FullCalendar, react-big-calendar), factual, dated.
- Off-site: npm and GitHub README link to calendarkit.io with the same one-line description; listings (awesome-react-components, 21st.dev, reactlibraryhub); r/reactjs post.
- Connect Search Console to OpenSEO; pull the Pages report for "react calendar" (the 195-click gap between Search Console and the live US check is unexplained); AI visibility run when credits allow.
