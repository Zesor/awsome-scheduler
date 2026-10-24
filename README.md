# calendarkit.io

The website of [CalendarKit Pro](https://github.com/Zesor/calendarkit-pro): landing page, docs and changelog. The docs and the changelog come from the library repo; they are not written here.

```bash
npm install
npm run dev                      # http://localhost:3000
npm run sync-docs -- v2.0.0      # copy the library docs at a tag, branch or commit into content/
npm run check                    # types, lint, unit tests, build
npm run check-site               # after a build: canonicals, titles, links, JSON-LD, llms.txt
```

After a library release: `npm run sync-docs -- <tag>`, review the diff of `content/`, open a PR. A new guide section needs an entry in `src/lib/docs-nav.ts` (the build says so).
