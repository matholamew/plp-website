/**
 * SpinPinwheel — decorative spinning pinwheel for the Services page.
 *
 * Uses Maria's spinning-pinwheel artwork (Debra, Aug 2026: "use the one that
 * Maria created that is just the pinwheel spinning") rather than CSS-rotating
 * the flat mark. Source is public/logo/pinwheel-spin.gif at 887x1073 and
 * 5.7MB, far too heavy to sit on a page six times, so it is served as
 * pinwheel-spin-sm.webp: 112px wide, every 4th frame, ~205KB, alpha intact.
 * Regenerate that file if Maria supplies new artwork; the source GIF stays in
 * the repo as the master.
 *
 * Behavior keeps the choreography Debra liked: the mark rests as a static
 * image and plays only while hovered, plus once when it first scrolls into
 * view (~1.2s, matching roughly one revolution). Swapping the src rather than
 * looping forever avoids six perpetually moving objects on one page, which is
 * both visual noise and a WCAG 2.2.2 problem (motion over 5s must be
 * pausable).
 *
 * Reduced motion: never animates, renders the static mark only.
 * Decorative throughout: aria-hidden, no interactivity, and it never gates
 * any service copy.
 *
 * Props: size (px, default 40), className.
 */

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'

const STATIC_SRC = '/logo/plp-pinwheel.png'
const SPIN_SRC = '/logo/pinwheel-spin-sm.webp'
const SCROLL_SPIN_MS = 1200

interface SpinPinwheelProps {
  size?: number
  className?: string
}

export default function SpinPinwheel({
  size = 40,
  className = '',
}: SpinPinwheelProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [scrollSpin, setScrollSpin] = useState(false)

  // Warm the animation so the first spin plays instead of showing a gap
  useEffect(() => {
    if (reducedMotion) return
    const preload = new Image()
    preload.src = SPIN_SRC
  }, [reducedMotion])

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion || !('IntersectionObserver' in window)) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.disconnect()
          setScrollSpin(true)
          timer = window.setTimeout(() => setScrollSpin(false), SCROLL_SPIN_MS)
          break
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [reducedMotion])

  const spinning = !reducedMotion && (hovered || scrollSpin)

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={spinning ? SPIN_SRC : STATIC_SRC}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain halo-dark"
      />
    </span>
  )
}
