/**
 * HomeReel — the homepage hero image reel (Aug 2026 content build).
 *
 * 16:9 (aspect-video) with a viewport-height cap. The cap exists only to keep
 * the three cards above the fold on short viewports; it was raised from 38vh
 * to 52vh in Aug 2026 so that on ordinary laptop and desktop sizes the reel
 * renders at its full column width instead of being cropped short (Debra
 * asked why the picture had been shrunk — the answer was the fold, and
 * removing the hero eyebrow and card boxes freed up enough room to give it
 * back). The aspect-ratio box reserves space before load — no layout shift.
 *
 * Slides cross-fade every 7s. Currently the brand-tinted placeholder SVGs
 * (public/images/placeholder-1..4.svg) — swap the SLIDES list when converted
 * photos land in the repo (noted in the PR).
 *
 * Accessibility (WCAG 2.2.2, auto-rotation must be stoppable): no autoplay
 * under prefers-reduced-motion; rotation pauses on hover and keyboard focus;
 * explicit 44px pause/play control; 44px dot targets with aria-current.
 */

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'
import { FOCUS_RING } from '../lib/ui'

const SLIDES = [
  { src: '/images/placeholder-1.svg', alt: '' },
  { src: '/images/placeholder-2.svg', alt: '' },
  { src: '/images/placeholder-3.svg', alt: '' },
  { src: '/images/placeholder-4.svg', alt: '' },
]

const ADVANCE_MS = 7000

export default function HomeReel() {
  const reducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)

  const autoplay = !reducedMotion && !hovered && !focused && !manuallyPaused

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      ADVANCE_MS,
    )
    return () => clearInterval(id)
  }, [autoplay])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Playful learning in classrooms"
      className="relative w-full aspect-video max-h-[52vh] overflow-hidden rounded-lg bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== active}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          fetchPriority={i === 0 ? 'high' : undefined}
          loading={i === 0 ? undefined : 'lazy'}
        />
      ))}

      {/* Controls — dots + pause */}
      <div className="absolute bottom-0 right-0 flex items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === active ? 'true' : undefined}
            className={`inline-flex items-center justify-center min-h-11 min-w-11 ${FOCUS_RING}`}
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full border border-navy/40 transition-colors ${
                i === active ? 'bg-cta' : 'bg-white/80 hover:bg-cta-hover'
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setManuallyPaused((p) => !p)}
          aria-label={
            manuallyPaused ? 'Resume slide rotation' : 'Pause slide rotation'
          }
          aria-pressed={manuallyPaused}
          className={`inline-flex items-center justify-center min-h-11 min-w-11 text-navy ${FOCUS_RING}`}
        >
          {manuallyPaused ? (
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 2l10 6-10 6z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" fill="currentColor" />
              <rect x="9.5" y="2" width="3.5" height="12" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
