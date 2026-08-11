/**
 * Shared site constants — single source of truth (DRY).
 *
 * NAV_LINKS: About · Services · FAQ · Contact. Testimonials lost its nav
 * item and its page in Aug 2026 — the quotes read better inside the Home
 * page than as a destination of their own; /testimonials 301s to / .
 * "Services" supersedes the former "For Districts" nav item;
 * /for-districts is reserved for a future audience pillar and redirects
 * to /services.
 *
 * CONTACT_EMAIL: info@ per docs/site-copy.md (Aug 2026 content update).
 */

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const

export const CONTACT_EMAIL = 'info@playfullearningpartners.com'
