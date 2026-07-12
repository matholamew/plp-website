/**
 * Scroll-choreography hooks for the homepage hero handoff.
 *
 * The hero shows the full logo lockup on load. As the user scrolls the first
 * ~half viewport, the wordmark and supporting copy drift up and fade out while
 * the pinwheel shrinks and slides toward the top-left, handing off to the
 * persistent pinwheel mark in the nav. Both Hero and SiteNav read the same
 * window.scrollY, so a single shared progress value keeps the handoff aligned
 * without cross-component wiring.
 *
 * Motion is opt-out: usePrefersReducedMotion lets callers render the resting
 * state (full lockup, nav mark already present) with no transforms.
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

/**
 * Scroll progress from 0 to 1 over the first `viewportFraction` of the window
 * height. rAF-throttled; recomputes on resize so the travel distance tracks the
 * viewport. Returns 0 when reduced motion is preferred (callers treat 0 as the
 * resting/expanded state).
 */
export function useHeroScrollProgress(viewportFraction = 0.5): number {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduced) {
      setProgress(0)
      return
    }

    let raf = 0
    const compute = () => {
      raf = 0
      const travel = Math.max(1, window.innerHeight * viewportFraction)
      const p = Math.min(1, Math.max(0, window.scrollY / travel))
      setProgress(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, viewportFraction])

  return progress
}
