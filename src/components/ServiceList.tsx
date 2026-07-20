/**
 * ServiceList — responsive card grid of service/feature items.
 *
 * Layout (Mertens-style restraint, per 2026-07-12 redesign):
 *   - 1 column on mobile, 2 columns from md up. Generous gutters, no hard
 *     dividers between cards — separation is whitespace + a hairline border.
 *   - Each card: pinwheel marker (brand-visual.md "pinwheel as bullet"),
 *     title (font-display), description (font-body, ink-muted).
 *
 * Color audit (both modes):
 *   - Cards sit on bg-bg or bg-surface. Hairline border uses ink-muted at low
 *     opacity, legible-but-quiet in light (#4b4b63/15) and dark (#a8aec4/15).
 *   - text-ink / text-ink-muted contrast verified on both bg values elsewhere.
 *
 * Props:
 *   - items: { title: string; description: string }[]
 *   - columns?: 2 | 3 — max columns on large screens (default 2)
 */

interface ServiceItem {
  title: string
  description: string
}

interface ServiceListProps {
  items: ServiceItem[]
  columns?: 2 | 3
}

export default function ServiceList({ items, columns = 2 }: ServiceListProps) {
  const gridCols =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2'

  return (
    <ul className={`grid grid-cols-1 ${gridCols} gap-6 sm:gap-8`} role="list">
      {items.map((item, index) => (
        <li
          key={index}
          className="rounded-lg border border-ink-muted/15 bg-bg p-6 sm:p-7"
        >
          {/* Pinwheel marker — aria-hidden, purely decorative */}
          {/* Dark mode: halo keeps the navy sail visible on the dark card bg */}
          <img
            src="/logo/plp-pinwheel.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-7 w-7 object-contain mb-4 halo-dark"
          />

          <h3 className="font-display text-lg text-ink leading-snug mb-2">
            {item.title}
          </h3>
          <p className="font-body text-base text-ink-muted leading-relaxed">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
