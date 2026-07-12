/**
 * SiteNav — sticky top nav on navy band.
 *
 * Color audit (both modes):
 *   - bg-band = #16296b (navy) in both light and dark
 *   - text-band-ink = #f5f6fa in both modes — high contrast on navy (~14:1)
 *   - active link: slightly brighter opacity treatment on band-ink (no raw hex)
 *   - ThemeToggle uses text-band-ink (legible on navy in both modes)
 *   - CTAButton uses bg-cta (teal) — works on navy background
 *
 * Logo behavior (brand-visual.md "Dynamic header"):
 *   - On '/' (homepage): pinwheel hidden (opacity-0 scale-90) until
 *     scrollY > 120, then transitions in
 *   - On other routes: pinwheel always visible
 *
 * Mobile menu: plain slide-down panel on the navy band, hamburger trigger.
 * No animation libraries, no blob shapes.
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import CTAButton from './CTAButton'
import { usePrefersReducedMotion } from '../hooks/useScrollProgress'

const NAV_LINKS = [
  { label: 'For Districts', to: '/for-districts' },
  { label: 'About', to: '/about' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
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
  const isHomepage = location.pathname === '/'
  const reducedMotion = usePrefersReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Reveal the nav pinwheel as the hero pinwheel finishes its handoff. The hero
  // animates over the first 0.5 viewport (useHeroScrollProgress(0.5)); ~0.42
  // lands the nav mark just before the hero mark fully clears.
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.42)
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

  // Pinwheel visibility: always on non-homepage; on the homepage it is
  // scroll-gated to complete the hero handoff. With reduced motion there is no
  // hero animation, so show it immediately rather than gate on scroll.
  const pinwheelVisible = !isHomepage || scrolled || reducedMotion

  return (
    <header className="sticky top-0 z-50 bg-band text-band-ink">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Pinwheel mark — scroll-gated on homepage, always visible elsewhere */}
        <Link
          to="/"
          className="flex-shrink-0"
          aria-label="Playful Learning Partners, Home"
        >
          <img
            src="/logo/plp-pinwheel.png"
            alt="Playful Learning Partners pinwheel"
            width={40}
            height={40}
            className={`h-10 w-10 object-contain transition-all duration-300 ease-in-out ${
              pinwheelVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-opacity ${
                  isActive
                    ? 'text-band-ink opacity-100 underline underline-offset-4 decoration-accent-teal'
                    : 'text-band-ink opacity-80 hover:opacity-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right-side actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <CTAButton to="/contact" size="md">
            Schedule a Consult
          </CTAButton>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="text-band-ink hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-band-ink rounded p-1 transition-opacity"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel — plain navy band continuation, no animation lib */}
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
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block font-body text-sm font-medium py-2 px-1 rounded transition-opacity ${
                  isActive
                    ? 'text-band-ink opacity-100 underline underline-offset-4 decoration-accent-teal'
                    : 'text-band-ink opacity-80 hover:opacity-100'
                }`
              }
            >
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
