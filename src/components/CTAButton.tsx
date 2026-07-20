/**
 * CTAButton — the site's single CTA treatment (teal, navy label).
 *
 * Color audit (both modes):
 *   - bg-cta  = #14b8a6 (teal), hover bg-cta-hover = #2dd4bf — identical in
 *     both modes by spec.
 *   - text: text-navy (#16296b, same hex in both modes). Ratios: 5.40:1 on
 *     base teal, 7.21:1 on hover — AA pass in both modes and both states.
 *     White text was rejected: 2.49:1 on base teal fails WCAG AA.
 *
 * Renders (exactly one of):
 *   - to    → react-router <Link> (internal route)
 *   - href  → <a> (external URL)
 *   - type  → native <button> (forms; DRY: ContactPage previously duplicated
 *             these classes on a hand-rolled submit button)
 *
 * min-h-11 = 44px touch target (Apple HIG) on every variant.
 */

import { Link } from 'react-router-dom'

interface CTAButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  type?: 'submit' | 'button'
  size?: 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<CTAButtonProps['size']>, string> = {
  md: 'px-5 py-2 text-sm min-h-11 inline-flex items-center',
  lg: 'px-7 py-3 text-base min-h-11 inline-flex items-center',
}

const baseClasses =
  'rounded-md bg-cta hover:bg-cta-hover text-navy font-body font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2'

export default function CTAButton({
  children,
  to,
  href,
  type,
  size = 'md',
}: CTAButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (type) {
    return (
      <button type={type} className={classes}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
