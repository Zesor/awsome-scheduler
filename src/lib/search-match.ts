export type SearchEntry = { url: string; page: string; heading: string; text: string }

export function search(index: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const score = (e: SearchEntry) => {
    const title = `${e.page} ${e.heading}`.toLowerCase()
    const all = `${title} ${e.text.toLowerCase()}`
    if (!words.every((w) => all.includes(w))) return 0
    return words.reduce((n, w) => n + (title.includes(w) ? 10 : 1), 0) + (e.heading ? 0 : 1)
  }
  return index.map((e) => [score(e), e] as const).filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]).slice(0, limit).map(([, e]) => e)
}
