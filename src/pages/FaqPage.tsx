import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * FAQ.
 *
 * 2026-08-05: every previously published Q&A was removed. Debra's working doc
 * left the answer field blank on four questions, and seven more questions did
 * not appear in her materials at all — question and answer had both been
 * drafted on her behalf. None of it was hers, so none of it could be
 * published as her answer.
 *
 * What remains is the single FAQ she actually wrote, reproduced from her doc.
 * One word changed: "seamlessly" is on the banned-word list in
 * docs/brand-tone.md, and dropping it changes no meaning.
 *
 * ONLY add questions here that Debra has answered herself. Do not draft an
 * answer on her behalf, however obvious the answer seems.
 *
 * Real <details>/<summary>: keyboard-operable and functional without JS.
 */

const FAQS: { question: string; answer: string[] }[] = [
  {
    question:
      'How does this work if we are already starting to pilot and/or implement a new curriculum?',
    answer: [
      "Implementing both programs simultaneously can be an easier lift for school leadership and teaching staff than it would be to incorporate playful learning practices separately. The Department of Education encourages districts to implement a curriculum with integrity, and continue to supplement with materials that support all students' learning. Playful Learning Partners will collaborate with school leadership to review your current pilot initiatives and integrate our practices into the approach so that your staff can deliver the new curriculum with playful learning practices in mind.",
    ],
  },
]

export default function FaqPage() {
  const single = FAQS.length === 1

  return (
    <>
      <Section pad="intro">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          Have a question that isn't here? Ask it directly and Debra will
          answer it.
        </p>
      </Section>

      <Section pad="none" className="pb-intro">
        <div className="divide-y divide-ink-muted/15 border-y border-ink-muted/15">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="group" open={single}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 min-h-11 font-display text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded [&::-webkit-details-marker]:hidden">
                {question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="flex-shrink-0 text-navy dark:text-ink motion-safe:transition-transform group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="pb-6 space-y-4 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
                {answer.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section center pad="none" className="pb-intro">
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
