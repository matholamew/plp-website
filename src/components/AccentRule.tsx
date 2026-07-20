/**
 * AccentRule — stacked full-width thin bars in brand accent colors.
 * Per brand-visual.md: "longer lines, running further through the layout, not
 * short dashes." Each bar is 3px tall, spans 100% of the containing block.
 *
 * Variants:
 *   - default: pink → purple → teal (logo color order)
 *   - withNavy: navy leading bar + the three accents — the header stripe band
 *     from the 2026-07-13 reference mockup (12px total; the homepage
 *     .carousel-viewport calc depends on that height).
 *
 * No text, no interactive elements — purely decorative.
 */

interface AccentRuleProps {
  className?: string
  withNavy?: boolean
}

export default function AccentRule({
  className = '',
  withNavy = false,
}: AccentRuleProps) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true" role="presentation">
      {withNavy && <div className="h-[3px] w-full bg-navy" />}
      <div className="h-[3px] w-full bg-accent-pink" />
      <div className="h-[3px] w-full bg-accent-purple" />
      <div className="h-[3px] w-full bg-accent-teal" />
    </div>
  )
}
