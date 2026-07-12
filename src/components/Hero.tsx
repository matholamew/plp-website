/**
 * Hero — full-viewport hero with Remix-style pinwheel handoff.
 *
 * Layout: header (4rem) + hero fill exactly 100dvh at every breakpoint
 * (.hero-viewport in index.css). The animated pinwheel occupies roughly the
 * left third of the page; headline, subhead, and CTA sit in the right two
 * thirds. The wordmark image does not appear here at all.
 *
 * Scroll choreography (reference: remix.run logo-to-header shrink):
 *   - The pinwheel's travel is MEASURED, not approximated. Each frame we read
 *     the untransformed rect of its wrapper and the rect of the nav slot
 *     (#nav-pinwheel in SiteNav) and interpolate translate+scale so at
 *     progress 1 the pinwheel lands exactly in the nav slot, then crossfades
 *     into the nav mark (SiteNav reveals at ~0.9 of the same travel).
 *   - All hero text scatters like a gust of wind: headline per letter, subhead
 *     per word, CTA as one piece. Offsets are deterministic (seeded hash per
 *     index — no Math.random, keeps SSR/replay stable and avoids re-scatter on
 *     re-render), staggered so letters at the start of the line leave first.
 *
 * Accessibility (WCAG 2.1 AA):
 *   - h1 carries the full headline via aria-label; the animated letter spans
 *     are aria-hidden. Subhead: sr-only full text + aria-hidden animated spans.
 *   - prefers-reduced-motion: progress stays 0 (resting state, no transforms)
 *     and the pinwheel renders as a static image instead of the looping GIF
 *     (WCAG 2.2.2 pause/stop/hide).
 *   - CTA gets pointer-events: none once mostly faded so a hidden control is
 *     not clickable.
 *
 * Props: headline, subhead, ctaLabel, ctaTo.
 */

import { useRef, useState } from 'react'
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
  const p = useHeroScrollProgress(0.5)
  const reducedMotion = usePrefersReducedMotion()
  const pinwheelWrapRef = useRef<HTMLDivElement>(null)
  const [gifFailed, setGifFailed] = useState(false)

  // Static image when the user opts out of motion (WCAG 2.2.2) or the GIF is
  // missing; animated GIF otherwise.
  const pinwheelSrc =
    reducedMotion || gifFailed ? PINWHEEL_STATIC : PINWHEEL_ANIM

  // Measured Remix-style travel: interpolate from the pinwheel's current
  // layout position to the nav slot. Reading rects during render is safe here:
  // both elements are laid out before scroll can produce nonzero progress.
  let pinwheelTransform = 'none'
  let pinwheelOpacity = 1
  if (p > 0) {
    const wrap = pinwheelWrapRef.current
    const navSlot = document.getElementById('nav-pinwheel')
    if (wrap && navSlot) {
      const from = wrap.getBoundingClientRect() // untransformed (transform is on the img)
      const to = navSlot.getBoundingClientRect() // stable: sticky header
      const scale = 1 + (to.width / from.width - 1) * p
      const dx = (to.left - from.left) * p
      const dy = (to.top - from.top) * p
      pinwheelTransform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(4)})`
      // Hold full opacity through the flight, crossfade into the nav mark at
      // the end (SiteNav reveals its pinwheel at ~0.9 of this travel).
      pinwheelOpacity = p < 0.88 ? 1 : clamp01((1 - p) / 0.12)
    }
  }

  // Gust scatter for a letter/word at sequence index i. Earlier indexes leave
  // first (stagger), drifting right and up with a little rotation.
  function gustStyle(i: number, strength: number): React.CSSProperties {
    const pe = clamp01(p * 1.2 - i * 0.006)
    if (pe === 0) return {}
    const dx = (6 + hash(i, 1) * 26) * strength * pe
    const dy = -(3 + hash(i, 2) * 16) * strength * pe
    const rot = (hash(i, 3) * 50 - 25) * strength * pe
    return {
      transform: `translate(${dx.toFixed(2)}vw, ${dy.toFixed(2)}vh) rotate(${rot.toFixed(1)}deg)`,
      opacity: clamp01(1 - pe * 1.5),
      willChange: 'transform, opacity',
    }
  }

  // Headline: words → letters so wrapping stays word-shaped while letters
  // animate independently. Letter index runs across the whole headline.
  const headlineWords = headline.split(' ')
  let letterIndex = 0

  const subheadWords = subhead.split(' ')

  const ctaP = clamp01(p * 1.3)
  const ctaStyle: React.CSSProperties = {
    transform: `translate(${(ctaP * 9).toFixed(2)}vw, ${(-ctaP * 5).toFixed(2)}vh) rotate(${(ctaP * 3).toFixed(1)}deg)`,
    opacity: clamp01(1 - ctaP * 1.6),
    pointerEvents: ctaP > 0.5 ? 'none' : 'auto',
    willChange: 'transform, opacity',
  }

  return (
    <section className="bg-bg w-full">
      <div className="hero-viewport mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center gap-6 sm:gap-10">
        {/* Pinwheel — left third of the page, measured flight to the nav slot.
            The ref wrapper shrink-wraps the img exactly (same width, no
            transform) so its rect IS the img's untransformed rect — the flight
            math depends on that. */}
        <div className="col-span-1 flex items-center justify-center" aria-hidden="true">
          <div ref={pinwheelWrapRef} className="w-full max-w-[320px]">
            <img
              src={pinwheelSrc}
              onError={() => setGifFailed(true)}
              alt=""
              className="w-full object-contain"
              style={{
                transform: pinwheelTransform,
                opacity: pinwheelOpacity,
                transformOrigin: 'top left',
                willChange: 'transform, opacity',
              }}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Hero text — right two thirds; every piece scatters on scroll */}
        <div className="col-span-2 text-left">
          <h1
            aria-label={headline}
            className="font-display text-2xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-5 sm:mb-6"
          >
            <span aria-hidden="true">
              {headlineWords.map((word, wi) => (
                <span key={wi} className="inline-block whitespace-nowrap">
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
                  {wi < headlineWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl leading-relaxed mb-8 sm:mb-10">
            <span className="sr-only">{subhead}</span>
            <span aria-hidden="true">
              {subheadWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={gustStyle(i, 0.55)}
                >
                  {word}
                  {i < subheadWords.length - 1 ? ' ' : ''}
                </span>
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
