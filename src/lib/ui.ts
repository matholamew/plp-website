/**
 * Shared UI class strings (DRY: these were previously copy-pasted across
 * SiteNav, SiteFooter, HomeCarousel, ContactPage, and App).
 *
 * FOCUS_RING      — teal ring for light surfaces (page background, white bar)
 * FOCUS_RING_BAND — band-ink ring for navy surfaces (footer, mobile menu)
 * BAND_LINK       — small nav/utility link on the navy band, with the teal
 *                   hover underline treatment and a 44px touch target
 */

export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded'

export const FOCUS_RING_BAND =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-band-ink rounded'

export const BAND_LINK = `font-body text-sm text-band-ink opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-accent-teal decoration-2 transition-opacity inline-flex items-center min-h-11 px-1 ${FOCUS_RING_BAND}`
