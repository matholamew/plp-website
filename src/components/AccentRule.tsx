/**
 * AccentRule — three stacked full-width thin bars in brand accent colors.
 * Per brand-visual.md: "longer lines, running further through the layout, not
 * short dashes." Each bar is 3px tall, spans 100% of the containing block.
 * Order: pink → purple → teal (matches logo color order top-to-bottom).
 *
 * No text, no interactive elements, no background surface — purely decorative.
 * Props: optional className for external positioning/margin control.
 */

interface AccentRuleProps {
  className?: string
}

export default function AccentRule({ className = '' }: AccentRuleProps) {
  return (
    <div
      className={`w-full ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="h-[3px] w-full bg-accent-pink" />
      <div className="h-[3px] w-full bg-accent-purple" />
      <div className="h-[3px] w-full bg-accent-teal" />
    </div>
  )
}
