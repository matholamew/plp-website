/**
 * SiteNav — sticky top nav on navy band, fixed 4rem tall (h-16) so the hero
 * can size itself to exactly 100dvh minus the header (.hero-viewport).
 *
 * Color audit (both modes):
 *   - bg-band = #16296b (navy) in both light and dark
 *   - text-band-ink = #f5f6fa in both modes — high contrast on navy (~14:1)
 *   - active link: underline + full opacity treatment on band-ink
 *   - CTAButton uses bg-cta (teal) — works on navy background
 *
 * Pinwheel handoff (brand-visual.md "Dynamic header" + Remix-style flight):
 *   - #nav-pinwheel is the measured TARGET slot for the hero pinwheel's
 *     scroll flight (Hero.tsx reads its rect every frame). Keep the id and the
 *     element's layout stable; the hero math depends on it.
 *   - On '/': hidden until the hero flight is ~90% complete, then fades in as
 *     the hero copy fades out (crossfade). On other routes: always visible.
 *   - Reduced motion: no flight, so the mark shows immediately.
 *
 * Touch targets follow Apple HIG: every interactive element in the header is
 * at least 44×44px (min-h-11/min-w-11 = 2.75rem = 44px).
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import CTAButton from './CTAButton'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'
import { NAV_LINKS } from '../lib/site'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-band-ink rounded'

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
  const isHomepage = location.pathname === '/'
  const reducedMotion = usePrefersReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Reveal at ~90% of the hero pinwheel's flight (Hero travels over the first
  // 0.5 viewport; 0.45 = progress 0.9) so the crossfade overlaps the landing.
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.45)
  }, [])

  useEffect(() => {
    // Set initial state in case page loads mid-scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const pinwheelVisible = !isHomepage || scrolled || reducedMotion

  const desktopLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-medium transition-opacity inline-flex items-center min-h-11 px-1 ${focusRing} ${
      isActive
        ? 'text-band-ink opacity-100 underline underline-offset-4 decoration-accent-teal'
        : 'text-band-ink opacity-80 hover:opacity-100'
    }`

  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-medium px-2 transition-opacity flex items-center min-h-11 ${focusRing} ${
      isActive
        ? 'text-band-ink opacity-100 underline underline-offset-4 decoration-accent-teal'
        : 'text-band-ink opacity-80 hover:opacity-100'
    }`

  return (
    <header className="sticky top-0 z-50 bg-band text-band-ink">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Pinwheel mark — target slot for the hero flight (see header comment).
            The Link is the 44px touch target; the img inside is the 40px mark. */}
        <Link
          to="/"
          className={`flex-shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 ${focusRing}`}
          aria-label="Playful Learning Partners, Home"
        >
          <img
            id="nav-pinwheel"
            src="/logo/plp-pinwheel.png"
            alt=""
            width={40}
            height={40}
            className={`h-10 w-10 object-contain transition-opacity duration-300 ease-in-out ${
              pinwheelVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-5"
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
            className={`text-band-ink hover:opacity-80 inline-flex items-center justify-center min-h-11 min-w-11 transition-opacity ${focusRing}`}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel — plain navy band continuation */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-band border-t border-white/10 overflow-hidden transition-all duration-200 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-3 pb-4"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={mobileLinkClasses}>
              {label}
            </NavLink>
          ))}
          <div className="pt-2">
            <CTAButton to="/contact" size="md">
              Schedule a Consult
            </CTAButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
