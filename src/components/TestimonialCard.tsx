/**
 * TestimonialCard — restrained card with accent-teal left rule.
 *
 * Color audit (both modes):
 *   - bg-surface: light = #eceef2, dark = #131c31 — card background
 *   - text-ink (italic quote): light = #1a1a2e, dark = #e8e8f0 — high contrast on surface
 *   - text-ink-muted (attribution): light = #4b4b63, dark = #a8aec4 — OK on surface
 *   - accent-teal left border: light = #14b8a6, dark = #2dd4bf — purely decorative line
 *   - Placeholder state: dashed border on the card itself (border-ink-muted), label
 *     in text-ink-muted — legible in both modes
 *
 * Per spec: "thin accent-teal top border or left rule" — using a left rule
 * (border-l-4) as it reads more like a conventional pull-quote treatment.
 * "No decorative quote-mark graphics that read cutesy."
 *
 * Props:
 *   - quote: string
 *   - attribution?: string
 *   - role?: string
 *   - placeholder?: boolean — renders with dashed border + placeholder label
 */

interface TestimonialCardProps {
  quote: string
  attribution?: string
  role?: string
  placeholder?: boolean
}

export default function TestimonialCard({
  quote,
  attribution,
  role,
  placeholder = false,
}: TestimonialCardProps) {
  if (placeholder) {
    return (
      <div className="rounded-md border-2 border-dashed border-ink-muted bg-surface p-6">
        <p className="font-body text-sm text-ink-muted mb-3 uppercase tracking-wide">
          Testimonial pending confirmation
        </p>
        <p className="font-body italic text-ink-muted leading-relaxed">
          {quote}
        </p>
        {(attribution || role) && (
          <p className="font-body text-sm text-ink-muted mt-4 opacity-60">
            {attribution && <span>{attribution}</span>}
            {attribution && role && <span>, </span>}
            {role && <span>{role}</span>}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-md bg-surface border-l-4 border-accent-teal p-6">
      <blockquote>
        <p className="font-body italic text-ink leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {(attribution || role) && (
          <footer className="mt-4">
            <cite className="not-italic font-body text-sm text-ink-muted">
              {attribution && <span>{attribution}</span>}
              {attribution && role && <span>, </span>}
              {role && <span>{role}</span>}
            </cite>
          </footer>
        )}
      </blockquote>
    </div>
  )
}
