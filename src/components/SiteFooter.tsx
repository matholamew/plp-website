/**
 * SiteFooter — navy band footer with AccentRule above it.
 *
 * Color audit (both modes):
 *   - bg-band = #16296b (navy) in both light and dark — same token
 *   - text-band-ink = #f5f6fa in both modes — high contrast on navy (~14:1)
 *   - Links: text-band-ink with opacity hover treatment — no raw hex
 *   - AccentRule sits directly above (as a visual separator between page and footer)
 *
 * Structure: one row with pinwheel + nav links + contact + copyright.
 * On small screens: stacks vertically for readability.
 *
 * Contact email: info@playfullearningpartners.com (docs/site-copy.md).
 */

import { Link } from 'react-router-dom'
import AccentRule from './AccentRule'
import { NAV_LINKS, CONTACT_EMAIL } from '../lib/site'
import { FOCUS_RING_BAND, BAND_LINK } from '../lib/ui'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      {/* AccentRule separates page content from the footer band.
          (Pre-footer lockup block removed 2026-07-13 per Debra/Matt — read as
          tacked-on; the brand now leads the page instead: wordmark in the
          hero, name beside the nav pinwheel.) */}
      <AccentRule />

      <div className="bg-band text-band-ink">
        <div className="mx-auto max-w-7xl px-page py-8 pb-safe">
          {/* Main footer row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Pinwheel mark */}
            {/* Company name written out — title text (Explode renders
                all-caps by design), doubles as the home link */}
            <Link
              to="/"
              className={`flex-shrink-0 inline-flex items-center gap-3 min-h-11 ${FOCUS_RING_BAND}`}
            >
              {/* Same halo as the nav mark: navy sail vs navy band */}
              <img
                src="/logo/plp-pinwheel.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain halo-band"
              />
              <span className="font-display text-2xl sm:text-3xl text-band-ink leading-none">
                Playful Learning Partners
              </span>
            </Link>

            {/* Nav links — 44px touch targets (Apple HIG) */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-4 gap-y-1"
            >
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={BAND_LINK}
                >
                  {label}
                </Link>
              ))}
            </nav>

          </div>

          {/* Footer identity + fine print — per docs/site-copy.md Global */}
          <div className="mt-6 border-t border-white/10 pt-6 space-y-2">
            <p className="font-body text-sm text-band-ink opacity-80">
              Playful Learning Partners, LLC · Massachusetts ·{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`inline-block py-1 underline underline-offset-4 decoration-accent-teal hover:opacity-80 ${FOCUS_RING_BAND}`}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="font-body text-sm text-band-ink opacity-70">
              Playful Learning Partners is an independent practice. It is not
              affiliated with or endorsed by Harvard University or Project
              Zero.
            </p>
            <p className="font-body text-sm text-band-ink opacity-70">
              &copy; {currentYear} Playful Learning Partners, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
