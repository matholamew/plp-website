/**
 * CTAButton — primary CTA button.
 *
 * Color audit (both modes):
 *   - bg-cta  = #14b8a6 (teal), hover bg-cta-hover = #2dd4bf — identical in
 *     both modes by spec.
 *   - text: text-navy (#16296b, same hex in both modes). Ratios: 5.40:1 on
 *     base teal, 7.21:1 on hover — AA pass in both modes and both states.
 *     White text was rejected: 2.49:1 on base teal fails WCAG AA.
 *
 * Props:
 *   - to: internal route (renders react-router <Link>)
 *   - href: external URL (renders <a>)
 *   - children: button label
 *   - size: 'md' (default) | 'lg'
 */

import { Link } from 'react-router-dom'

interface CTAButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  size?: 'md' | 'lg'
}

// min-h-11 = 44px: Apple HIG minimum touch target on both sizes
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

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
