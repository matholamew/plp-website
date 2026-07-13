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
 * Pinwheel mark: always visible on every route (2026-07-12 direction — no
 * empty slot, no handoff; the hero pinwheel stays anchored in the hero).
 *
 * Touch targets follow Apple HIG: every interactive element in the header is
 * at least 44×44px (min-h-11/min-w-11 = 2.75rem = 44px).
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import CTAButton from './CTAButton'
import { NAV_LINKS } from '../lib/site'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-band-ink rounded'

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

  // Hover underline in CTA teal (decoration-accent-teal = same hex as bg-cta)
  const desktopLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-medium transition-opacity inline-flex items-center min-h-11 px-1 underline-offset-4 decoration-accent-teal decoration-2 ${focusRing} ${
      isActive
        ? 'text-band-ink opacity-100 underline'
        : 'text-band-ink opacity-80 hover:opacity-100 hover:underline'
    }`

  return (
    <header className="sticky top-0 z-50 bg-band text-band-ink">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Pinwheel mark — always visible. The Link is the 44px touch target;
            the img inside is the 40px mark. */}
        <Link
          to="/"
          className={`flex-shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 ${focusRing}`}
          aria-label="Playful Learning Partners, Home"
        >
          {/* Soft light halo: the mark's navy sail is nearly the band's navy
              and vanishes without it */}
          <img
            src="/logo/plp-pinwheel.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain [filter:drop-shadow(0_0_2px_rgba(245,246,250,0.8))_drop-shadow(0_1px_6px_rgba(245,246,250,0.35))]"
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

      {/* Mobile menu — full-screen navy overlay under the header band.
          Design: navy carries the brand's structural color (brand-visual.md);
          large display-font links each carry one of Maria's accent-color
          lines (longer when active); a faded pinwheel watermark echoes the
          mobile hero. Links stagger in; motion-safe only. */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-band transition-opacity duration-200 ease-in-out ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Pinwheel watermark — decorative, echoes the mobile hero treatment */}
        <img
          src="/logo/plp-pinwheel.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[-15%] bottom-[-5%] w-3/4 max-w-sm opacity-10 pointer-events-none select-none"
        />

        <nav
          className="relative flex h-full flex-col justify-center gap-1 px-8 pb-16"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `group font-display text-3xl py-4 min-h-11 flex flex-col justify-center gap-2 motion-safe:transition-all motion-safe:duration-300 ${focusRing} ${
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
