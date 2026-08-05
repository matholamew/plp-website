/**
 * SiteNav — sticky white header that compacts on scroll (Aug 2026 content
 * build, per approved design constraints).
 *
 * Structure: white bar with the full horizontal logo lockup left, Explode
 * nav links + teal CTA right; below the bar, the brand stripe band — blue,
 * teal, pink, purple rows separated by white gaps, matching the pinwheel.
 *
 * Compaction: past a small scroll threshold the bar height and logo shrink
 * together (h-20 -> h-14, logo h-12/14 -> h-9) and the stripe band shrinks
 * with them but never disappears. Transitions are motion-safe.
 *
 * Mobile: hamburger opens a full-screen navy overlay (Explode links, accent
 * lines, pinwheel watermark, teal CTA). The overlay covers the viewport
 * under the sticky header (z-40 < z-50), so it works at any header height.
 *
 * Touch targets >= 44px; focus rings teal on white, band-ink on navy.
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import CTAButton from './CTAButton'
import { NAV_LINKS } from '../lib/site'
import { FOCUS_RING, FOCUS_RING_BAND } from '../lib/ui'

// Accent-line colors for the full-screen menu links, cycling in logo order
const MENU_ACCENTS = [
  'bg-accent-pink',
  'bg-accent-purple',
  'bg-accent-teal',
] as const

// Brand stripe band: blue, teal, pink, purple separated by white gaps
// (order and gaps per the approved design constraints; colors match the
// pinwheel). Shrinks with the compact header but does not disappear.
const STRIPES = [
  'bg-navy',
  'bg-accent-teal',
  'bg-accent-pink',
  'bg-accent-purple',
] as const

function BrandStripes({ compact }: { compact: boolean }) {
  return (
    <div className="w-full bg-bg" aria-hidden="true">
      {STRIPES.map((color, i) => (
        <div
          key={color}
          className={`w-full ${color} motion-safe:transition-all motion-safe:duration-200 ${
            compact ? 'h-[2px]' : 'h-[3px]'
          } ${i < STRIPES.length - 1 ? (compact ? 'mb-[1px]' : 'mb-[2px]') : ''}`}
        />
      ))}
    </div>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

export default function SiteNav() {
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  // Compact the header once the page has scrolled a little. rAF-throttled.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setCompact(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Full-screen menu: lock page scroll while open, close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const prevHtml = document.documentElement.style.overflowY
    const prevBody = document.body.style.overflowY
    document.documentElement.style.overflowY = 'hidden'
    document.body.style.overflowY = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflowY = prevHtml
      document.body.style.overflowY = prevBody
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const desktopLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm lg:text-base transition-opacity inline-flex items-center min-h-11 px-1 underline-offset-4 decoration-accent-teal decoration-2 text-navy dark:text-ink ${FOCUS_RING} ${
      isActive ? 'underline' : 'opacity-80 hover:opacity-100 hover:underline'
    }`

  return (
    <header className="sticky top-0 z-50 bg-bg text-ink">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-page motion-safe:transition-all motion-safe:duration-200 ${
          compact ? 'h-14' : 'h-16'
        }`}
      >
        {/* Full lockup — shrinks with the bar; dark mode halo keeps the navy
            letterforms visible on the near-black background */}
        <Link
          to="/"
          className={`flex-shrink-0 inline-flex items-center min-h-11 ${FOCUS_RING}`}
          aria-label="Playful Learning Partners, Home"
        >
          <img
            src="/logo/plp-lockup-horizontal.png"
            alt=""
            className={`w-auto object-contain halo-dark motion-safe:transition-all motion-safe:duration-200 ${
              compact ? 'h-9' : 'h-10 sm:h-12'
            }`}
            fetchPriority="high"
          />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-6"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={desktopLinkClasses}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right-side actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <CTAButton to="/contact" size="md">
            Schedule a Consult
          </CTAButton>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`text-navy dark:text-ink hover:opacity-80 inline-flex items-center justify-center min-h-11 min-w-11 transition-opacity ${FOCUS_RING}`}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      <BrandStripes compact={compact} />

      {/* Mobile menu — full-screen navy overlay. Covers the viewport under
          the sticky header (z-40 < header z-50); content clears the header
          with top padding so it works at either header height. */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-band transition-opacity duration-200 ease-in-out ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Pinwheel watermark — decorative */}
        <img
          src="/logo/plp-pinwheel.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[-15%] bottom-[-5%] w-3/4 max-w-sm opacity-10 pointer-events-none select-none"
        />

        <nav
          className="relative flex h-full flex-col justify-center gap-1 px-page pt-24 pb-safe"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `group font-display text-2xl sm:text-3xl py-3 min-h-11 flex flex-col justify-center gap-2 motion-safe:transition-all motion-safe:duration-300 ${FOCUS_RING_BAND} ${
                  isActive
                    ? 'text-band-ink'
                    : 'text-band-ink opacity-85 hover:opacity-100'
                } ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'motion-safe:translate-y-3 motion-safe:opacity-0'
                }`
              }
              style={{
                transitionDelay: mobileOpen ? `${80 + i * 50}ms` : '0ms',
              }}
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    aria-hidden="true"
                    className={`block h-[3px] motion-safe:transition-all motion-safe:duration-300 ${
                      MENU_ACCENTS[i % MENU_ACCENTS.length]
                    } ${isActive ? 'w-20' : 'w-10 group-hover:w-16'}`}
                  />
                </>
              )}
            </NavLink>
          ))}

          <div
            className={`pt-6 motion-safe:transition-all motion-safe:duration-300 ${
              mobileOpen
                ? 'translate-y-0 opacity-100'
                : 'motion-safe:translate-y-3 motion-safe:opacity-0'
            }`}
            style={{
              transitionDelay: mobileOpen
                ? `${80 + NAV_LINKS.length * 50}ms`
                : '0ms',
            }}
          >
            <CTAButton to="/contact" size="lg">
              Schedule a Consult
            </CTAButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
