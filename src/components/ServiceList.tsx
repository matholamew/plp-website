/**
 * ServiceList — the homepage's three-column content row.
 *
 * The brief calls for three cards, so the three-column structure stays. The
 * boxed-card chrome does not: a grid of identical rounded, bordered boxes
 * with an icon stacked above a heading is the generic AI-page default. Each
 * column now leads with a full-width brand accent rule (the documented
 * accent-line motif, cycling pink/purple/teal in logo order) and carries the
 * pinwheel inline with its heading, which keeps Maria's pinwheel-as-marker
 * detail without the container.
 *
 * Color audit (both modes): text-ink / text-ink-muted verified on bg-bg and
 * bg-surface; the accent rules are decorative only.
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

const ACCENTS = ['bg-accent-pink', 'bg-accent-purple', 'bg-accent-teal'] as const

export default function ServiceList({ items, columns = 2 }: ServiceListProps) {
  const gridCols = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <ul
      className={`grid grid-cols-1 ${gridCols} gap-x-8 gap-y-10 lg:gap-x-12`}
      role="list"
    >
      {items.map((item, index) => (
        <li key={item.title}>
          <div
            aria-hidden="true"
            className={`h-[3px] w-full ${ACCENTS[index % ACCENTS.length]}`}
          />
          <h3 className="font-display text-lg text-ink leading-snug mt-5 mb-2 flex items-center gap-2.5">
            <img
              src="/logo/plp-pinwheel.png"
              alt=""
              aria-hidden="true"
              width={22}
              height={22}
              className="h-[22px] w-[22px] flex-shrink-0 object-contain halo-dark"
            />
            {item.title}
          </h3>
          <p className="font-body text-base text-ink-muted leading-normal">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
