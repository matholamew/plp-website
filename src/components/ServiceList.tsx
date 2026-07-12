/**
 * ServiceList — list of service/feature items with pinwheel graphic as bullet.
 *
 * Color audit (both modes):
 *   - Intended to sit on bg-bg or bg-surface
 *   - text-ink: light = #1a1a2e, dark = #e8e8f0 — legible on both bg values
 *   - text-ink-muted: light = #4b4b63, dark = #a8aec4 — OK on both
 *   - bg-surface: light = #eceef2 (cool gray), dark = #131c31 — used only if
 *     a separation background is wanted; the list itself has no background
 *
 * Per brand-visual.md: "use the pinwheel graphic (not a generic bullet/dot)
 * as the list-item marker" — specifically liked detail from Maria's draft.
 *
 * Each item: pinwheel icon (20–24px, aria-hidden) + title (font-display,
 * text-ink) + description (font-body, text-ink-muted). Vertical list,
 * generous spacing between items.
 *
 * Props:
 *   - items: { title: string; description: string }[]
 */

interface ServiceItem {
  title: string
  description: string
}

interface ServiceListProps {
  items: ServiceItem[]
}

export default function ServiceList({ items }: ServiceListProps) {
  return (
    <ul className="space-y-8" role="list">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4 items-start">
          {/* Pinwheel bullet — aria-hidden, purely decorative */}
          <img
            src="/logo/plp-pinwheel.png"
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
            className="mt-1 h-[22px] w-[22px] flex-shrink-0 object-contain"
          />

          <div>
            <h3 className="font-display text-lg text-ink leading-snug mb-1">
              {item.title}
            </h3>
            <p className="font-body text-base text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
