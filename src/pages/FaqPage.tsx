import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * FAQ — copy from docs/site-copy.md (approved), amended by the Aug 2026
 * truthfulness pass. PLP has no completed full-year partnerships yet, so
 * claims that asserted accumulated history were removed:
 *   - "How does the first year usually go?" deleted outright (it answered
 *     with "most partnerships" and "many schools"; there is no usual yet).
 *   - "Experienced teachers frequently tell us..." deleted.
 *   - "Lighter than most people expect" deleted, and "we pair every workshop
 *     with coaching" softened to "we recommend pairing" — the original
 *     contradicted the a-la-carte service model.
 *   - "we work with schools at every level of need" restated as willingness.
 * The same edits are recorded in docs/site-copy.md. Do not reintroduce.
 *
 * Real <details>/<summary> disclosure: keyboard-operable and functional with
 * JavaScript disabled. Do not add questions that assert results or history.
 */

const FAQS: { question: string; answer: string[] }[] = [
  {
    question: 'Will this work with the curriculum we already have?',
    answer: [
      "Yes — that's the design. We don't ask schools to replace what they're teaching. Playful learning practices are built to sit inside your existing curriculum, using the structures and standards you already work from. Our lessons are developed with the Massachusetts state frameworks in view, and we return to grade-level standards as we build.",
    ],
  },
  {
    question:
      "Some of our teachers already feel like they're doing playful learning. What would they get out of this?",
    answer: [
      "Often quite a lot, and usually not what they expect. Teachers who already value play tend to be doing it well in moments and inconsistently across the week. The work here is structural — how a community meeting is run so every child talks, how a studio is set up so the materials do some of the teaching, how story acting connects to what you're assessing on Friday.",
    ],
  },
  {
    question: 'What is playful learning, and how is it different from just play?',
    answer: [
      "Playful learning is guided. There's an instructional purpose behind the setup, the materials, and the teacher's role in it. Children experience choice, wonder, and joy; the teacher is working toward specific understanding. The difference isn't in how it looks to a child — it's in what the adult is doing while it happens.",
    ],
  },
  {
    question: 'How heavy is the lift for teachers?',
    answer: [
      'Front-loaded. The practices are designed to work inside the schedule teachers already have rather than adding to it. The initial adjustment is real — new structures always are — which is why we recommend pairing workshops with in-classroom coaching instead of leaving teachers to figure it out alone.',
    ],
  },
  {
    question: 'What grade levels do you work with?',
    answer: ['PreK through Grade 5.'],
  },
  {
    question: 'Do we need to buy expensive new materials?',
    answer: [
      "Most practices require little or nothing new. Centers and studios is the one that asks for more, and even there we start by finding what's already in your building. Reusing and repurposing existing materials is part of how we work, not a compromise.",
    ],
  },
  {
    question: 'How do you align play with academic standards?',
    answer: [
      'Massachusetts state frameworks are the reference point. As we build lessons and practices with your teams, we work back to grade-level standards — so what a teacher does during a studio block connects to what they are accountable for.',
    ],
  },
  {
    question: 'Does this work in large classes?',
    answer: [
      'Yes. The practices scale with class size; what changes is how you structure grouping and rotation, which is part of what coaching addresses.',
    ],
  },
  {
    question: "How will we know it's working?",
    answer: [
      "We use Project Zero's Playful Learning Indicators — Enjoyment, Curiosity, Empowerment, and Connection — as the shared framework for classroom observation and debrief conversations. That gives teachers and administrators specific, observable things to look for and talk about, rather than a vague sense that the room feels different. Administrator sessions are where we review what's changing and what needs to change next.",
    ],
  },
  {
    question: 'Can we customize which services we receive?',
    answer: [
      "Yes. Services are selected à la carte, and the Playful Learning Indicators we emphasize can be weighted toward your school's priorities. A building focused on belonging and behavior will emphasize different indicators than one focused on early literacy engagement.",
    ],
  },
  {
    question: "We're not sure we can fund this. What are our options?",
    answer: [
      'Talk to us anyway. We help schools identify funding sources and support grant applications, and we are willing to work with schools and districts at any level of need.',
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <Section pad="intro">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight">
          Frequently Asked Questions
        </h1>
      </Section>

      <Section pad="none" className="pb-intro">
        <div className="divide-y divide-ink-muted/15 border-y border-ink-muted/15">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 min-h-11 font-display text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded [&::-webkit-details-marker]:hidden">
                {question}
                {/* Disclosure chevron — rotates when open */}
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
