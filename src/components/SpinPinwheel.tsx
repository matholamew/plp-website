/**
 * SpinPinwheel — the animated pinwheel that marks section headings.
 *
 * Uses Maria's artwork rather than CSS-rotating the flat mark. The source is
 * public/logo/pinwheel-spin.gif at 887x1073 and 5.7MB, far too heavy to place
 * on a page a dozen times, so it ships as pinwheel-spin-sm.webp: 112px wide,
 * every 4th frame, ~205KB, alpha intact. Regenerate that file if Maria
 * supplies new artwork; the source GIF stays in the repo as the master.
 *
 * Note on the motion itself: the artwork is a slow sway, not a hard rotation.
 * The head holds roughly steady while the stick rocks, on about a 9 second
 * cycle. That is why running it continuously reads as ambient rather than
 * busy, and why several on one page is tolerable where a rigid spin would
 * not be.
 *
 * Motion runs constantly (Aug 2026 direction) instead of only on hover and
 * scroll-into-view. Accessibility trade-off, stated plainly: WCAG 2.2.2 asks
 * for a pause mechanism for motion that auto-starts and runs past five
 * seconds. There is no in-page pause control here; the accommodation is
 * prefers-reduced-motion, which swaps in the static mark and is the standard
 * accepted route for decorative motion. If a pause control is ever wanted,
 * add it here once and every instance inherits it.
 *
 * Decorative throughout: aria-hidden, no interactivity, never gates content.
 *
 * Props: size (px, default 40), className.
 */

import { usePrefersReducedMotion } from '../hooks/useScrollProgress'

const STATIC_SRC = '/logo/plp-pinwheel.png'
const SPIN_SRC = '/logo/pinwheel-spin-sm.webp'

interface SpinPinwheelProps {
  size?: number
  className?: string
}

export default function SpinPinwheel({
  size = 40,
  className = '',
}: SpinPinwheelProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <img
      src={reducedMotion ? STATIC_SRC : SPIN_SRC}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain halo-dark ${className}`}
      loading="lazy"
      decoding="async"
    />
  )
}
