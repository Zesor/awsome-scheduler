# SEO

- Canonical host is `https://calendarkit.io` (apex, no www); every canonical, og:url, sitemap and llms.txt URL uses it.
- Page titles and descriptions live in `src/lib/docs-nav.ts` (docs pages) and `src/app/page.tsx` (landing page).
- `npm run build && npm run check-site` checks canonicals, titles, descriptions, h1, JSON-LD, links and llms.txt.
- Design spec: `docs/superpowers/specs/2026-10-24-site-2-0-redesign-design.md`, section 5.
- SEO audit report: https://app.openseo.so/p/41b5814e-9e81-4bb4-98cd-9dfd8e530d77/reports/4876a850-e65b-4985-b840-f1f0689f3b60
