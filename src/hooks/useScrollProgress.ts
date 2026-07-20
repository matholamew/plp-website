/**
 * Motion preference hook. (The scroll-gust progress hook that used to live
 * here was removed with the old animated hero, 2026-07-13 homepage redesign.)
 */

import { useEffect, useState } from 'react'

/** True when the user has asked the OS to reduce motion. Reactive to changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
