/**
 * SiteNav — sticky white header (2026-07-13 redesign per Debra, styled after
 * the approved reference mockup; supersedes the navy-band header — decision
 * recorded in brand-visual.md).
 *
 * Structure: white bar (5rem) with the full horizontal logo lockup left,
 * Explode-font nav links + teal CTA right; a 4-row accent stripe band (12px:
 * navy/teal/purple/pink) closes the header. Header total = 5rem + 12px; the
 * homepage carousel sizes itself against exactly that (.carousel-viewport).
 *
 * Colors (both modes): bar is bg-bg / text-navy in light; dark mode keeps
 * bg-bg (near-black navy) with text-ink and a halo on the lockup so its navy
 * letterforms stay visible. Focus rings use the teal CTA color on both.
 *
 * Mobile: hamburger opens the full-screen navy overlay menu (unchanged
 * motif: Explode links, accent lines, pinwheel watermark, teal CTA). Overlay
 * top offset = header height (5rem + 12px = 5.75rem).
 *
 * Touch targets: every interactive element >= 44px (Apple HIG).
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import CTAButton from './CTAButton'
import AccentRule from './AccentRule'
import { NAV_LINKS } from '../lib/site'
import { FOCUS_RING, FOCUS_RING_BAND } from '../lib/ui'

// Accent-line colors for the full-screen menu links, cycling in logo order
// (pink → purple → teal; brand-visual.md accent-line motif)
const MENU_ACCENTS = [
  'bg-accent-pink',
  'bg-accent-purple',
  'bg-accent-teal',
] as const

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

  // Explode nav links, navy on the white bar (ink in dark mode); hover
  // underline in CTA teal, persistent underline on the active route.
  const desktopLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm lg:text-base transition-opacity inline-flex items-center min-h-11 px-1 underline-offset-4 decoration-accent-teal decoration-2 text-navy dark:text-ink ${FOCUS_RING} ${
      isActive ? 'underline' : 'opacity-80 hover:opacity-100 hover:underline'
    }`

  return (
    <header className="sticky top-0 z-50 bg-bg text-ink">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-page">
        {/* Full lockup — content-cropped export; dark mode adds a halo so the
            navy letterforms stay visible on the near-black background */}
        <Link
          to="/"
          className={`flex-shrink-0 inline-flex items-center min-h-11 ${FOCUS_RING}`}
          aria-label="Playful Learning Partners, Home"
        >
          <img
            src="/logo/plp-lockup-horizontal.png"
            alt=""
            className="h-12 sm:h-14 w-auto object-contain halo-dark"
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

      <AccentRule withNavy />

      {/* Mobile menu — full-screen navy overlay below the header (5rem bar
          + 12px stripes = 5.75rem). Navy still carries the brand's structural
          color here even with the white header bar. */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[5.75rem] bottom-0 z-40 bg-band transition-opacity duration-200 ease-in-out ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Pinwheel watermark — decorative, echoes the card/hero treatment */}
        <img
          src="/logo/plp-pinwheel.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[-15%] bottom-[-5%] w-3/4 max-w-sm opacity-10 pointer-events-none select-none"
        />

        <nav
          className="relative flex h-full flex-col justify-center gap-1 px-page pb-safe"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `group font-display text-3xl py-4 min-h-11 flex flex-col justify-center gap-2 motion-safe:transition-all motion-safe:duration-300 ${FOCUS_RING_BAND} ${
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
                  {/* Accent line — Maria's motif; longer when active */}
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
            className={`pt-8 motion-safe:transition-all motion-safe:duration-300 ${
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
