/**
 * HomeCarousel — full-width homepage hero carousel (2026-07-13 redesign,
 * styled after the reference mockup Debra approved).
 *
 * Layout: .carousel-viewport (index.css) sizes this to exactly
 * 100svh minus the header bar (5rem) minus the accent stripes (12px), so
 * header + stripes + carousel = one viewport on every screen; everything
 * else on the page sits below the fold.
 *
 * Slides: 4 placeholder SVGs in /public/images (placeholder-1..4.svg) —
 * swap the files or the SLIDES list when Debra's real photos arrive. Real
 * photos must follow brand-visual.md imagery rules (hands + manipulatives,
 * consent confirmed per photo).
 *
 * Overlay: translucent white band with the company name + tagline in
 * Explode — this is the page's h1. Navy line 1, purple line 2, matching the
 * reference. White band keeps text contrast AA regardless of the photo.
 *
 * Accessibility / WCAG 2.2.2 (auto-rotation must be stoppable):
 *   - No autoplay under prefers-reduced-motion.
 *   - Autoplay pauses on hover and on keyboard focus within the carousel.
 *   - Explicit pause/play button (44px target) next to the dots.
 *   - Dots are 44px buttons with aria-labels; active dot exposed via
 *     aria-current. Region has role + aria-roledescription="carousel".
 */

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'

const SLIDES = [
  { src: '/images/placeholder-1.svg', alt: '' },
  { src: '/images/placeholder-2.svg', alt: '' },
  { src: '/images/placeholder-3.svg', alt: '' },
  { src: '/images/placeholder-4.svg', alt: '' },
]

const ADVANCE_MS = 6000

export default function HomeCarousel() {
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
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Playful Learning Partners highlights"
      className="carousel-viewport relative w-full overflow-hidden bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {/* Slides — crossfade stack */}
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

      {/* Title band — translucent white, company name + tagline (page h1) */}
      <div className="absolute inset-x-0 top-[26%] bg-white/85 py-5 sm:py-7 px-4">
        <h1 className="font-display text-center leading-tight text-2xl sm:text-4xl lg:text-5xl">
          <span className="block text-navy">Playful Learning Partners:</span>
          <span className="block text-accent-purple">
            Bringing Play Into Practice
          </span>
        </h1>
      </div>

      {/* Controls — dots + pause, bottom right */}
      <div className="absolute bottom-2 right-2 flex items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === active ? 'true' : undefined}
            className="inline-flex items-center justify-center min-h-11 min-w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded"
          >
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-full border border-navy/40 transition-colors ${
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
          className="inline-flex items-center justify-center min-h-11 min-w-11 text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded"
        >
          {manuallyPaused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 2l10 6-10 6z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" fill="currentColor" />
              <rect x="9.5" y="2" width="3.5" height="12" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}
