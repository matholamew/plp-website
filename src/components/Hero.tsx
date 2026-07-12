/**
 * Hero — homepage hero section.
 *
 * Background: bg-bg (true white in light, #0b1220 near-black in dark).
 * No section background color (not bg-surface) — hero sits directly on the
 * page background per spec: "just bg-bg."
 *
 * Color audit (both modes):
 *   - bg-bg: light = #ffffff, dark = #0b1220
 *   - text-ink: light = #1a1a2e, dark = #e8e8f0 — high contrast on respective bg
 *   - text-ink-muted: light = #4b4b63, dark = #a8aec4 — contrast OK on both bg values
 *   - Full lockup logo (multicolor mark) works on both backgrounds per brand-visual.md
 *
 * Layout: full-lockup logo dominant, lots of negative space, no competing
 * focal points near the wordmark (brand-visual.md: "negative space doing real work").
 * Headline + subhead + CTA stack below with clear vertical breathing room.
 *
 * Props:
 *   - headline: string — display heading (font-display = Explode/Montserrat)
 *   - subhead: string — supporting paragraph (font-body)
 *   - ctaLabel: string — CTA button text
 *   - ctaTo: string — internal route for CTA
 */

import CTAButton from './CTAButton'

interface HeroProps {
  headline: string
  subhead: string
  ctaLabel: string
  ctaTo: string
}

export default function Hero({ headline, subhead, ctaLabel, ctaTo }: HeroProps) {
  return (
    <section className="bg-bg w-full">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 flex flex-col items-center text-center">
        {/* Full lockup logo — dominant visual, generous negative space per spec */}
        <div className="mb-12 sm:mb-16">
          <img
            src="/logo/plp-logo-full.png"
            alt="Playful Learning Partners"
            className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            width={512}
            height={256}
            fetchPriority="high"
          />
        </div>

        {/* Headline — font-display (Explode w/ Montserrat fallback) */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-6">
          {headline}
        </h1>

        {/* Subhead — font-body, ink-muted */}
        <p className="font-body text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed mb-10">
          {subhead}
        </p>

        {/* CTA */}
        <CTAButton to={ctaTo} size="lg">
          {ctaLabel}
        </CTAButton>
      </div>
    </section>
  )
}
