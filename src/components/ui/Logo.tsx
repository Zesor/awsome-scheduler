export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="4" width="19" height="17.5" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.5 9.5h19M8 2.5v3M16 2.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="6.5" y="12.5" width="6" height="4.5" rx="1.2" fill="currentColor" />
    </svg>
  )
}
