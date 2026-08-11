/**
 * SpinPinwheel — the animated pinwheel that marks section headings.
 *
 * Uses Maria's artwork rather than CSS-rotating the flat mark. The source is
 * public/logo/pinwheel-spin.gif at 887x1073 and 5.7MB (300 frames, 30fps),
 * far too heavy to place on a page a dozen times, so it ships as
 * pinwheel-spin-sm.webp: 96px wide, every 3rd frame, ~234KB, alpha intact.
 * 96px covers 3x pixel density for the largest render size on the site.
 * Regenerate that file if Maria supplies new artwork; the source GIF stays in
 * the repo as the master.
 *
 * Note on the motion: the head rotates a full 360 degrees while the stick
 * stays put at a fixed angle, which is why CSS-rotating the flat mark is not
 * a substitute — that would swing the stick around too. The blades also
 * change shape through the turn (the artwork has 3D twist), so the real
 * frames are doing work a transform cannot fake.
 *
 * One revolution takes 10 seconds. That slowness is what makes several of
 * these on a page read as ambient rather than busy, and it is also why the
 * export samples every 3rd frame: at 36 degrees per second, 11fps is smooth
 * enough at a 22-32px render size, and it costs 234KB instead of 416KB.
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
