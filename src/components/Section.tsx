/**
 * Section — shared page-section wrapper (DRY: replaces the
 * `<section class="bg-*"><div class="mx-auto max-w-* px-4 sm:px-6 lg:px-8
 * py-*">` pattern that was repeated across every page).
 *
 * Spacing and gutters are fluid (index.css utilities): .px-page scales the
 * inline padding 16px -> 32px with the viewport and respects notch safe
 * areas; .py-section / .pt-intro + .pb-intro scale vertical rhythm without
 * breakpoint jumps.
 *
 * Props:
 *   - surface: cool-gray band background (bg-surface) instead of page bg
 *   - width:   content max-width, default '3xl' (long-form measure)
 *   - pad:     'default' (py-section) | 'intro' (taller top, shorter bottom,
 *              for page-opening sections) | 'none' (caller supplies padding
 *              via className)
 *   - center:  text-center
 *   - className: extra classes for the inner container
 */

import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  surface?: boolean
  width?: 'xl' | '3xl' | '5xl' | '7xl'
  pad?: 'default' | 'intro' | 'none'
  center?: boolean
  className?: string
}

const widthClasses: Record<NonNullable<SectionProps['width']>, string> = {
  xl: 'max-w-xl',
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
}

const padClasses: Record<NonNullable<SectionProps['pad']>, string> = {
  default: 'py-section',
  intro: 'pt-intro pb-intro',
  none: '',
}

export default function Section({
  children,
  surface = false,
  width = '3xl',
  pad = 'default',
  center = false,
  className = '',
}: SectionProps) {
  return (
    <section className={surface ? 'bg-surface' : 'bg-bg'}>
      <div
        className={`mx-auto px-page ${widthClasses[width]} ${padClasses[pad]} ${
          center ? 'text-center' : ''
        } ${className}`.trim()}
      >
        {children}
      </div>
    </section>
  )
}
