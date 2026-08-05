/**
 * Shared site constants — single source of truth (DRY).
 *
 * NAV_LINKS: order and naming per docs/site-copy.md Global section
 * (About · Services · Testimonials · FAQ · Contact). "Services" supersedes
 * the former "For Districts" nav item; /for-districts is reserved for a
 * future audience pillar and currently redirects to /services.
 *
 * CONTACT_EMAIL: info@ per docs/site-copy.md (Aug 2026 content update).
 */

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const

export const CONTACT_EMAIL = 'info@playfullearningpartners.com'
