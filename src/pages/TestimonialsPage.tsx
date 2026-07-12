import TestimonialCard from '../components/TestimonialCard'
import CTAButton from '../components/CTAButton'

/*
 * ============================================================================
 * PLACEHOLDER CONTENT ONLY — REAL TESTIMONIALS GO HERE.
 *
 * Two written testimonials exist but are NOT published yet, pending
 * docs/open-items.md item 3:
 *   1. Confirm full name + title + institution for each quote.
 *   2. Confirm neither is traceable to the confidential Title I engagement
 *      (CLAUDE.md confidentiality section) — if either is, it must be
 *      significantly generalized or dropped, with Matt/Debra's approval.
 *
 * Once resolved: replace the two placeholder cards below with
 *   <TestimonialCard quote="..." attribution="Full Name" role="Title, Institution" />
 * and delete the placeholder props. Do NOT invent or paraphrase quote text.
 * ============================================================================
 */
export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-4">
            What district leaders and educators say.
          </h1>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            The following testimonials are from educators and administrators
            who have worked directly with Playful Learning Partners.
          </p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8 space-y-8">
          <TestimonialCard
            placeholder
            quote="Testimonial one, quote text pending attribution confirmation (open-items.md item 3)."
          />
          <TestimonialCard
            placeholder
            quote="Testimonial two, quote text pending attribution confirmation (open-items.md item 3)."
          />
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8 text-center">
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
        </div>
      </section>
    </>
  )
}
