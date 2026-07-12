/**
 * Shared site constants — single source of truth (DRY).
 *
 * NAV_LINKS: consumed by SiteNav (desktop + mobile) and SiteFooter. Nomenclature
 * per CLAUDE.md: "For Districts", not "Services", so "For Teachers" /
 * "For Families" can be added later without restructuring.
 *
 * CONTACT_EMAIL: placeholder until Debra confirms the real address (used by
 * ContactPage and SiteFooter — update once, both change).
 */

export const NAV_LINKS = [
  { label: 'For Districts', to: '/for-districts' },
  { label: 'About', to: '/about' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
] as const

// TODO: confirm real address before launch (open item; PDF shows debra@...)
export const CONTACT_EMAIL = 'hello@playfullearningpartners.com'
