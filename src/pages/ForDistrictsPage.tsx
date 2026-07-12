import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import AccentRule from '../components/AccentRule'

/*
 * NEEDS DEBRA'S CONFIRMATION before launch: this service menu was drafted
 * from the positioning docs (brand-voice.md), not from a confirmed offering
 * list. Confirm/rename/remove each item — especially "Small-Group and
 * Individual Teacher Support," the CKLA-aligned supplements claim, and how
 * demonstration lessons are actually structured.
 */
const SERVICES = [
  {
    title: 'Professional Development and Instructional Coaching',
    description:
      "A PLP professional development engagement goes beyond a single workshop day. Sessions are designed around your teachers' current instructional context — the grade levels they teach, the curriculum they are already using, and the specific gaps or goals your curriculum team has identified. Follow-up coaching cycles are available to ensure strategies are implemented, not just introduced.",
  },
  {
    title: 'Curriculum Integration Support',
    description:
      'Playful learning strategies are most effective when they are woven into the content your teachers are already responsible for delivering. PLP provides direct curriculum integration support, including development of CKLA-aligned supplemental materials that bring playful learning approaches into structured literacy instruction without replacing or undermining the core program. This work is done in close partnership with your curriculum or instructional leadership team.',
  },
  {
    title: 'Classroom Modeling and Demonstration Lessons',
    description:
      'One of the most effective ways to shift instructional practice is to show it in action. PLP offers live classroom modeling and demonstration lessons in which Debra teaches directly with students while your teachers observe, followed by structured debrief and reflection time. This approach builds concrete, observable understanding of what playful learning looks like in a real classroom at your grade levels.',
  },
  {
    title: 'Tailored Engagement Design',
    description:
      "Not every district comes in with the same entry point. PLP can work with your leadership team to design a full engagement scope from scratch — starting with a needs assessment, moving through design and delivery, and building toward a plan your teachers can sustain independently. The engagement is built around your timeline, your teachers' schedules, and the specific instructional priorities your district has set.",
  },
  {
    title: 'Small-Group and Individual Teacher Support',
    description:
      'Beyond whole-staff professional development, PLP offers targeted support for individual teachers or small cohorts working through specific instructional challenges. This format is well-suited for teachers who are new to playful learning approaches, grade-level teams rolling out a new curriculum integration, or teachers identified by instructional coaches as needing differentiated support.',
  },
]

const STEPS = [
  {
    title: 'Initial conversation',
    description:
      "The process starts with a conversation — no assessment tool, no intake form before that. You describe your district's instructional context, your goals, and any constraints. From that, a proposed scope takes shape.",
  },
  {
    title: 'Scoping and agreement',
    description:
      'A written scope of work is developed based on that initial conversation. It specifies what will be delivered, in what format, over what timeline, and at what investment — no ambiguity, no scope creep by default.',
  },
  {
    title: 'Delivery and coaching',
    description:
      'PLP delivers the agreed engagement — professional development sessions, classroom modeling, curriculum integration work, or some combination — with built-in reflection time to ensure the work lands.',
  },
  {
    title: 'Debrief and next steps',
    description:
      'At the close of an engagement, you receive a summary of what was delivered, what teachers reported, and what a logical continuation might look like. There is no pressure to extend; there is a clear picture of what comes next if you choose to.',
  },
]

export default function ForDistrictsPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-6">
            Guided playful learning pedagogy for district instructional teams.
          </h1>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Playful Learning Partners is a boutique provider of guided playful
            learning pedagogy. The practice works with district administrators,
            curriculum directors, and instructional coaches to build durable
            teacher capacity — not to deliver a one-time training and leave.
            Engagements are customized, not templated, and are designed to
            integrate with the instructional frameworks your district has
            already adopted. If your team is asking how to make rigorous
            content more accessible without sacrificing standards alignment,
            this is the conversation to have.
          </p>
        </div>
      </section>

      <AccentRule />

      {/* Services — pinwheel-marked list */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
            What an engagement can include
          </h2>
          <ServiceList items={SERVICES} />
        </div>
      </section>

      {/* How an engagement works — surface band for separation */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
            How an engagement works
          </h2>
          <ol className="space-y-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 items-start">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-ink leading-none mt-0.5 w-8 flex-shrink-0 text-right"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Funding note.
          Confidentiality (CLAUDE.md): generic Title I eligibility language
          only. Never add district names, state names, or "currently piloting"
          language here — open-items.md item 4 requires explicit approval for
          any version of that sentence. */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6">
            A note on funding
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Playful Learning Partners engagements can be structured to be
            Title I funding-eligible. If your district is working within a
            federal grant budget or a targeted funding stream, PLP is happy to
            work with your grants or finance team during the scoping process to
            ensure the engagement is documented and structured in a way that
            fits your funding requirements.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
            Start the conversation.
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-8">
            A consult call is low-stakes and structured — you will leave with a
            clear sense of whether a PLP engagement is the right fit for your
            district's goals.
          </p>
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
        </div>
      </section>
    </>
  )
}
