/**
 * Hero — full-viewport hero: anchored spinning pinwheel, text blown away.
 *
 * Layout: header (4rem) + hero fill exactly 100dvh at every breakpoint
 * (.hero-viewport in index.css). The animated pinwheel occupies roughly the
 * left third of the page; headline, subhead, and CTA sit in the right two
 * thirds. The wordmark image does not appear here at all.
 *
 * Scroll choreography (per 2026-07-12 direction): the pinwheel does NOT move —
 * it stays anchored and spinning (the GIF), reading as the wind source, while
 * all hero text scatters like a gust: headline per letter, subhead per word,
 * CTA as one piece. Offsets are deterministic (seeded hash per index — no
 * Math.random, so no re-scatter on re-render) and staggered so letters at the
 * start of a line leave first. The gust plays out over ~0.85 of a viewport of
 * scrolling (slower, calmer pace). The nav pinwheel is always present
 * (SiteNav); there is no handoff.
 *
 * Accessibility (WCAG 2.1 AA):
 *   - h1 carries the full headline via aria-label; animated letter spans are
 *     aria-hidden. Subhead: sr-only full text + aria-hidden animated spans.
 *   - prefers-reduced-motion: progress stays 0 (no transforms) and the
 *     pinwheel renders as a static image instead of the looping GIF
 *     (WCAG 2.2.2 pause/stop/hide).
 *   - CTA gets pointer-events: none once mostly faded so a hidden control is
 *     not clickable.
 *
 * Props: headline, subhead, ctaLabel, ctaTo.
 */

import { Fragment, useState } from 'react'
import CTAButton from './CTAButton'
import {
  useHeroScrollProgress,
  usePrefersReducedMotion,
} from '../hooks/useScrollProgress'

interface HeroProps {
  headline: string
  subhead: string
  ctaLabel: string
  ctaTo: string
}

const PINWHEEL_ANIM = '/logo/pinwheel-spin.gif'
const PINWHEEL_STATIC = '/logo/plp-pinwheel-lockup.png'

/** Deterministic pseudo-random in [0,1) from an index + salt. */
function hash(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function Hero({ headline, subhead, ctaLabel, ctaTo }: HeroProps) {
  // Gust plays out over ~0.85 viewport of scroll — calm, not a snap.
  const p = useHeroScrollProgress(0.85)
  const reducedMotion = usePrefersReducedMotion()
  const [gifFailed, setGifFailed] = useState(false)

  // Static image when the user opts out of motion (WCAG 2.2.2) or the GIF is
  // missing; animated GIF otherwise.
  const pinwheelSrc =
    reducedMotion || gifFailed ? PINWHEEL_STATIC : PINWHEEL_ANIM

  // Gust scatter for a letter/word at sequence index i. Earlier indexes leave
  // first (stagger), drifting right and up with a little rotation.
  function gustStyle(i: number, strength: number): React.CSSProperties {
    const pe = clamp01(p - i * 0.005)
    if (pe === 0) return {}
    const dx = (6 + hash(i, 1) * 26) * strength * pe
    const dy = -(3 + hash(i, 2) * 16) * strength * pe
    const rot = (hash(i, 3) * 50 - 25) * strength * pe
    return {
      transform: `translate(${dx.toFixed(2)}vw, ${dy.toFixed(2)}vh) rotate(${rot.toFixed(1)}deg)`,
      opacity: clamp01(1 - pe * 1.25),
      willChange: 'transform, opacity',
    }
  }

  // Headline: words → letters so wrapping stays word-shaped while letters
  // animate independently. Letter index runs across the whole headline.
  const headlineWords = headline.split(' ')
  let letterIndex = 0

  const subheadWords = subhead.split(' ')

  const ctaP = clamp01(p * 1.1)
  const ctaStyle: React.CSSProperties = {
    transform: `translate(${(ctaP * 9).toFixed(2)}vw, ${(-ctaP * 5).toFixed(2)}vh) rotate(${(ctaP * 3).toFixed(1)}deg)`,
    opacity: clamp01(1 - ctaP * 1.3),
    pointerEvents: ctaP > 0.55 ? 'none' : 'auto',
    willChange: 'transform, opacity',
  }

  return (
    <section className="bg-bg w-full">
      <div className="hero-viewport relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 sm:gap-10">
        {/* Pinwheel — anchored, spinning in place; the wind source the text
            reacts to. Mobile (<md): a faded background layer behind the text
            (opacity keeps text contrast at AA — ink on near-white). md+: solid,
            in the left third. */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none md:pointer-events-auto md:static md:col-span-1"
          aria-hidden="true"
        >
          <img
            src={pinwheelSrc}
            onError={() => setGifFailed(true)}
            alt=""
            className="w-4/5 max-w-[360px] object-contain opacity-20 md:opacity-100 md:w-full md:max-w-[320px]"
            fetchPriority="high"
          />
        </div>

        {/* Hero text — overlaid above the background pinwheel on mobile,
            right two thirds on md+; every piece scatters on scroll */}
        <div className="relative z-10 text-center md:text-left md:col-span-2">
          <h1
            aria-label={headline}
            className="font-display text-2xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-5 sm:mb-6"
          >
            <span aria-hidden="true">
              {headlineWords.map((word, wi) => (
                <Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((ch) => {
                      const i = letterIndex++
                      return (
                        <span
                          key={i}
                          className="inline-block"
                          style={gustStyle(i, 1)}
                        >
                          {ch}
                        </span>
                      )
                    })}
                  </span>
                  {/* space lives BETWEEN the inline-block spans — a trailing
                      space inside one is trimmed by CSS line layout */}
                  {wi < headlineWords.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8 sm:mb-10">
            <span className="sr-only">{subhead}</span>
            <span aria-hidden="true">
              {subheadWords.map((word, i) => (
                <Fragment key={i}>
                  <span className="inline-block" style={gustStyle(i, 0.55)}>
                    {word}
                  </span>
                  {i < subheadWords.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </span>
          </p>

          <div style={ctaStyle}>
            <CTAButton to={ctaTo} size="lg">
              {ctaLabel}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
