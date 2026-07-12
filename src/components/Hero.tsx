/**
 * Hero — homepage hero with scroll-driven logo handoff.
 *
 * On load: the full lockup (pinwheel + wordmark) is the dominant element, with
 * generous negative space (brand-visual.md). As the user scrolls the first
 * ~half viewport, the wordmark and the headline/subhead/CTA drift up and fade
 * ("blow away"), while the pinwheel shrinks and slides toward the top-left,
 * handing off to the persistent pinwheel mark in SiteNav. The lockup is built
 * from two separate assets (plp-pinwheel-lockup.png + plp-wordmark.png, both
 * cropped from the master lockup) so the pieces can animate independently — the
 * dynamic-header behavior specified in brand-visual.md.
 *
 * The hero pinwheel uses the animated spin file when present
 * (/logo/pinwheel-spin.gif) and falls back to the static crop if it is missing,
 * so the build never breaks before that asset is dropped in. The nav pinwheel
 * stays static by design: playfulness reads as an accent in the hero, not as a
 * perpetually-spinning mark in the site chrome (brand-tone.md).
 *
 * Motion respects prefers-reduced-motion: with it set, progress stays 0 and the
 * resting lockup renders with no transforms.
 *
 * Color audit (both modes): sits on bg-bg (light #ffffff / dark #0b1220). The
 * multicolor lockup and text-ink / text-ink-muted all clear contrast on both.
 *
 * Props: headline, subhead, ctaLabel, ctaTo.
 */

import { useState } from 'react'
import CTAButton from './CTAButton'
import { useHeroScrollProgress } from '../hooks/useScrollProgress'

interface HeroProps {
  headline: string
  subhead: string
  ctaLabel: string
  ctaTo: string
}

const PINWHEEL_ANIM = '/logo/pinwheel-spin.gif'
const PINWHEEL_FALLBACK = '/logo/plp-pinwheel-lockup.png'

export default function Hero({ headline, subhead, ctaLabel, ctaTo }: HeroProps) {
  const p = useHeroScrollProgress(0.5)
  const [pinwheelSrc, setPinwheelSrc] = useState(PINWHEEL_ANIM)

  // Independent easing rates per element create the scatter/handoff feel.
  const clamp0 = (v: number) => Math.max(0, v)
  const pinwheelStyle = {
    transform: `translate(${(-p * 16).toFixed(2)}vw, ${(-p * 12).toFixed(2)}vh) scale(${(1 - p * 0.75).toFixed(3)})`,
    opacity: clamp0(1 - p * 1.1),
    transformOrigin: 'left center',
    willChange: 'transform, opacity',
  }
  const wordmarkStyle = {
    transform: `translate(${(p * 6).toFixed(2)}vw, ${(-p * 10).toFixed(2)}vh) rotate(${(p * 4).toFixed(2)}deg)`,
    opacity: clamp0(1 - p * 1.6),
    willChange: 'transform, opacity',
  }
  const headlineStyle = {
    transform: `translateY(${(-p * 8).toFixed(2)}vh) rotate(${(p * -1.5).toFixed(2)}deg)`,
    opacity: clamp0(1 - p * 1.7),
    willChange: 'transform, opacity',
  }
  const subheadStyle = {
    transform: `translateY(${(-p * 11).toFixed(2)}vh)`,
    opacity: clamp0(1 - p * 2),
    willChange: 'transform, opacity',
  }
  const ctaOpacity = clamp0(1 - p * 1.8)
  const ctaStyle = {
    transform: `translateY(${(-p * 6).toFixed(2)}vh)`,
    opacity: ctaOpacity,
    pointerEvents: (ctaOpacity < 0.15 ? 'none' : 'auto') as 'none' | 'auto',
    willChange: 'transform, opacity',
  }

  return (
    <section className="bg-bg w-full">
      <div className="mx-auto max-w-5xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8 lg:pt-36 lg:pb-40 flex flex-col items-center text-center">
        {/* Full lockup — two independently-animated pieces, laid out as the
            horizontal brand lockup. Marked aria-hidden as a group; the section
            heading below carries the accessible name. */}
        <div
          className="mb-12 sm:mb-16 flex items-center justify-center gap-4 sm:gap-6"
          aria-hidden="true"
        >
          <img
            src={pinwheelSrc}
            onError={() => {
              if (pinwheelSrc !== PINWHEEL_FALLBACK) setPinwheelSrc(PINWHEEL_FALLBACK)
            }}
            alt=""
            className="h-24 w-auto sm:h-28 lg:h-36 object-contain flex-shrink-0"
            style={pinwheelStyle}
            fetchPriority="high"
          />
          <img
            src="/logo/plp-wordmark.png"
            alt=""
            className="h-16 w-auto sm:h-20 lg:h-24 object-contain"
            style={wordmarkStyle}
            fetchPriority="high"
          />
        </div>

        {/* Accessible name for the lockup, visually hidden */}
        <h1 className="sr-only">Playful Learning Partners</h1>

        {/* Marketing headline — font-display (Explode w/ Montserrat fallback) */}
        <p
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-6"
          style={headlineStyle}
        >
          {headline}
        </p>

        <p
          className="font-body text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed mb-10"
          style={subheadStyle}
        >
          {subhead}
        </p>

        <div style={ctaStyle}>
          <CTAButton to={ctaTo} size="lg">
            {ctaLabel}
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
