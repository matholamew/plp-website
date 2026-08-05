/**
 * TestimonialCard — restrained pull-quote card with accent-teal left rule.
 *
 * Color audit (both modes):
 *   - bg-surface: light = #eceef2, dark = #131c31 — card background
 *   - text-ink (italic quote): high contrast on surface in both modes
 *   - text-ink-muted (attribution): passes AA on surface in both modes
 *   - accent-teal left border: purely decorative
 *
 * Per spec: left rule reads as a conventional pull-quote treatment; no
 * decorative quote-mark graphics. (The old `placeholder` variant was removed
 * when the real, approved testimonials landed — 2026-07-13.)
 *
 * Props: quote (verbatim; never paraphrase third-party words), attribution,
 * role.
 */

interface TestimonialCardProps {
  quote: string | string[]
  attribution?: string
  role?: string
}

export default function TestimonialCard({
  quote,
  attribution,
  role,
}: TestimonialCardProps) {
  const byline = [attribution, role].filter(Boolean).join(', ')
  const paragraphs = Array.isArray(quote) ? quote : [quote]

  return (
    <div className="rounded-md bg-surface border-l-4 border-accent-teal p-6">
      <blockquote className="space-y-4">
        {paragraphs.map((para, i) => (
          <p key={para.slice(0, 40)} className="font-body italic text-ink leading-relaxed">
            {i === 0 && <>&ldquo;</>}
            {para}
            {i === paragraphs.length - 1 && <>&rdquo;</>}
          </p>
        ))}
        {byline && (
          <footer className="mt-4">
            <cite className="not-italic font-body text-sm text-ink-muted">
              {byline}
            </cite>
          </footer>
        )}
      </blockquote>
    </div>
  )
}
