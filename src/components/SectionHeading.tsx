/**
 * SectionHeading — an h2 with the animated pinwheel as its marker.
 *
 * The pinwheel-as-marker is a brand motif (brand-visual.md, Maria's draft);
 * as of Aug 2026 it marks section titles across the site rather than only on
 * Services, and it animates continuously. Centralised here so the size,
 * spacing, and wrap behaviour stay identical everywhere, and so a pause
 * control (see SpinPinwheel) would only need adding in one place.
 *
 * The pinwheel sits inside the heading but is aria-hidden and contributes no
 * text, so screen readers announce the heading exactly as written.
 *
 * Props:
 *   - children: heading text
 *   - center: centre the pinwheel and text together
 *   - className: spacing overrides (margin-bottom, etc.)
 */

import type { ReactNode } from 'react'
import SpinPinwheel from './SpinPinwheel'

interface SectionHeadingProps {
  children: ReactNode
  center?: boolean
  className?: string
}

export default function SectionHeading({
  children,
  center = false,
  className = 'mb-6',
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-display text-fluid-h2 text-ink flex items-start gap-3 ${
        center ? 'justify-center' : ''
      } ${className}`}
    >
      <SpinPinwheel size={32} className="flex-shrink-0 mt-1" />
      <span>{children}</span>
    </h2>
  )
}
