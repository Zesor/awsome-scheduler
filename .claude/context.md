# CalendarKit Marketing Website & Components

## Overview
This is the main CalendarKit (calendarkit.io) marketing website that showcases both BasicScheduler and ProScheduler components. It includes the landing page, documentation, blog, and examples. The actual scheduler components are distributed via separate private GitHub repositories (basic-scheduler and pro-scheduler).

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Syntax Highlighting**: Shiki for code examples
- **Dependencies**: Same as pro-scheduler plus marketing components

## Project Structure
```
src/
├── app/
│   ├── page.tsx         # Landing page
│   ├── docs/            # Documentation pages
│   │   ├── page.tsx     # Server component with Shiki
│   │   └── docs-content.tsx  # Client component
│   ├── blog/            # Blog section
│   └── globals.css
├── components/
│   ├── basic-scheduler/ # BasicScheduler component source
│   ├── pro-scheduler/   # ProScheduler component source
│   └── sections/        # Landing page sections
│       ├── hero.tsx
│       ├── features.tsx
│       ├── pricing.tsx
│       ├── faq.tsx
│       └── scheduler-examples.tsx
└── lib/
    └── utils.ts
```

## Distribution Model
- Customers purchase via LemonSqueezy
- After purchase, they provide GitHub username
- Zapier automation adds them as READ-ONLY collaborator
- They clone the private repository (basic-scheduler or pro-scheduler)

## Related Repositories
- `/Users/illyas/Perso/basic-scheduler` - Standalone BasicScheduler
- `/Users/illyas/Perso/pro-scheduler` - Standalone ProScheduler

## Key Pages
- `/` - Landing page with Hero, Features, Examples, Pricing, FAQ
- `/docs` - Full documentation with code examples
## Important Notes
- All text colors should use theme-aware classes NOT hardcoded gray colors
- Keep components in sync between this repo and standalone repos
- Documentation explains GitHub-based distribution process
- Code examples use local imports (@/components/scheduler)

## Commands
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```
