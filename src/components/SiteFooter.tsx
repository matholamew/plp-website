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
 * TODO: confirm real email address — using hello@playfullearningpartners.com
 * as placeholder per build instructions.
 */

import { Link } from 'react-router-dom'
import AccentRule from './AccentRule'
import { NAV_LINKS, CONTACT_EMAIL } from '../lib/site'

const footerFocusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-band-ink rounded'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      {/* AccentRule separates page content from the footer band */}
      <AccentRule />

      <div className="bg-band text-band-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Main footer row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Pinwheel mark */}
            <Link
              to="/"
              aria-label="Playful Learning Partners, Home"
              className={`flex-shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 ${footerFocusRing}`}
            >
              <img
                src="/logo/plp-pinwheel.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
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
                  className={`font-body text-sm text-band-ink opacity-80 hover:opacity-100 transition-opacity inline-flex items-center min-h-11 px-1 ${footerFocusRing}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Contact link — CONTACT_EMAIL placeholder, confirm before launch */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`font-body text-sm text-band-ink opacity-80 hover:opacity-100 transition-opacity inline-flex items-center min-h-11 px-1 ${footerFocusRing}`}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Copyright line */}
          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="font-body text-xs text-band-ink opacity-60">
              &copy; {currentYear} Playful Learning Partners. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
