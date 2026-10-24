'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OLD_ANCHORS } from '@/lib/docs-nav'

// Links to the 1.x single-page docs (/docs#pro-timezone) land on their new page. A hash that exists here is left alone.
export function OldAnchorRedirect() {
  const router = useRouter()
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (id && !document.getElementById(id) && OLD_ANCHORS[id]) router.replace(OLD_ANCHORS[id])
  }, [router])
  return null
}
