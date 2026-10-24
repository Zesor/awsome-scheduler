import Image from 'next/image'

// The CalendarKit mark (same artwork as the favicon and app icons).
export function Logo({ size = 24 }: { size?: number }) {
  return <Image src="/android-chrome-192x192.png" alt="" width={size} height={size} priority aria-hidden style={{ borderRadius: size / 5 }} />
}
