/**
 * HomeReel — the homepage hero image reel (Aug 2026 content build).
 *
 * Two modes. `fill` stretches to the parent cell for the full-bleed hero,
 * where the image runs to the right screen edge and takes its height from
 * .hero-shell; the aspect-ratio box below is the standalone default.
 *
 * 16:9 (aspect-video) with a viewport-height cap. The cap exists only to keep
 * the three cards above the fold on short viewports; it was raised from 38vh
 * to 52vh in Aug 2026 so that on ordinary laptop and desktop sizes the reel
 * renders at its full column width instead of being cropped short (Debra
 * asked why the picture had been shrunk — the answer was the fold, and
 * removing the hero eyebrow and card boxes freed up enough room to give it
 * back). The aspect-ratio box reserves space before load — no layout shift.
 *
 * Slides cross-fade every 7s.
 *
 * Accessibility (WCAG 2.2.2, auto-rotation must be stoppable): no autoplay
 * under prefers-reduced-motion; rotation pauses on hover and keyboard focus;
 * explicit 44px pause/play control; 44px dot targets with aria-current.
 */

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'
import { FOCUS_RING } from '../lib/ui'

/*
 * Debra's own classroom photos (Aug 2026), replacing the placeholders.
 * Chosen to fit brand-visual.md: hands and manipulatives in use, no
 * children's faces. Two widths each so the browser can pick — the hero cell
 * is roughly 720px wide at a 1440px viewport, so 900w covers 1x and 1600w
 * covers 2x.
 *
 * Alt text describes what a sighted visitor gains from the picture. It stays
 * generic about setting on purpose: no school, district, or child is
 * identifiable, and it must stay that way (CLAUDE.md confidentiality).
 */
const SLIDES = [
  {
    base: '/images/classroom-3',
    alt: 'Coloured square tiles arranged on a table to build a maths problem, with the numbers 300 and 150 spelled out in tiles.',
  },
  {
    base: '/images/classroom-1',
    alt: 'Interlocking cubes grouped into columns of ten beside a hand-lettered card reading 56, showing place value with manipulatives.',
  },
  {
    base: '/images/classroom-2',
    alt: 'A character modelled in yellow play dough on a classroom table, surrounded by wooden blocks, markers and a child\'s drawing.',
  },
]

const ADVANCE_MS = 7000

interface HomeReelProps {
  /**
   * fill: stretch to the parent cell instead of holding a 16:9 box. Used by
   * the full-bleed hero, where the image runs to the right screen edge and
   * takes its height from the hero shell.
   */
  fill?: boolean
}

export default function HomeReel({ fill = false }: HomeReelProps) {
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
      className={`relative w-full overflow-hidden bg-surface ${
        fill
          ? 'h-full min-h-[16rem] lg:min-h-full'
          : 'aspect-video max-h-[52vh] rounded-lg'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {SLIDES.map((slide, i) => (
        <img
          key={slide.base}
          src={`${slide.base}-1600.webp`}
          srcSet={`${slide.base}-900.webp 900w, ${slide.base}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
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
