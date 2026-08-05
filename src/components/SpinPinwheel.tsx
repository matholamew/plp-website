/**
 * SpinPinwheel — decorative pinwheel for the Services page motif.
 *
 * Spins one revolution when scrolled into view (IntersectionObserver) and
 * spins continuously on hover (CSS, .pinwheel-host in index.css). Purely
 * decorative: aria-hidden, no interactivity, and never gates any content —
 * service descriptions are always fully visible (client constraint).
 *
 * Reduced motion: the CSS animations are wrapped in a
 * prefers-reduced-motion: no-preference guard, so opted-out users simply see
 * the static mark.
 *
 * Props: size (px, default 40), className.
 */

import { useEffect, useRef, useState } from 'react'

interface SpinPinwheelProps {
  size?: number
  className?: string
}

export default function SpinPinwheel({
  size = 40,
  className = '',
}: SpinPinwheelProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pinwheel-host inline-block ${className}`}
    >
      <img
        src="/logo/plp-pinwheel.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`object-contain halo-dark pinwheel-spinner ${
          inView ? 'pinwheel-inview' : ''
        }`}
      />
    </span>
  )
}
