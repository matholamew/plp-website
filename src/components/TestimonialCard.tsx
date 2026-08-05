/**
 * TestimonialCard — pull-quote block.
 *
 * The thick colored left border this used to carry is the single most
 * recognizable tell of an AI-generated interface, so the quote now stands on
 * typography and space instead: larger quote text, a short brand accent rule
 * separating quote from attribution, and the attribution set small with
 * tracking. No decorative quote-mark graphics.
 *
 * Color audit (both modes): bg-surface (#eceef2 / #131c31) with text-ink for
 * the quote and text-ink-muted for the attribution; both verified above
 * 4.5:1 on that surface in light and dark.
 *
 * Props: quote (verbatim third-party words, string or paragraphs),
 * attribution, role.
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
    <figure className="rounded-lg bg-surface p-6 sm:p-8">
      <blockquote className="space-y-4">
        {paragraphs.map((para, i) => (
          <p
            key={para.slice(0, 40)}
            className="font-body text-base sm:text-lg text-ink leading-relaxed"
          >
            {i === 0 && <>&ldquo;</>}
            {para}
            {i === paragraphs.length - 1 && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>
      {byline && (
        <figcaption className="mt-6">
          <span
            aria-hidden="true"
            className="block h-[3px] w-10 bg-accent-teal mb-3"
          />
          <cite className="not-italic font-body text-sm font-semibold tracking-wide text-ink-muted">
            {byline}
          </cite>
        </figcaption>
      )}
    </figure>
  )
}
