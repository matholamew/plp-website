import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * Service menu now mirrors Debra's PLP one-pager (Workshops, Bi-Monthly
 * Coaching Visits, Leadership Consultation, Planning/Reflection Meetings,
 * Participant Resources) rather than the earlier speculative draft. Descriptions
 * are rewritten for a district-buyer register. Confirm final naming and the
 * CKLA reference with Debra before launch.
 *
 * Voice rules (brand-tone.md): no em/en dashes, no banned words, no
 * "it's not X, it's Y".
 */
const SERVICES = [
  {
    title: 'Workshops',
    description:
      "Professional development sessions built around your teachers' grade levels, the curriculum they already use, and the goals your instructional team has named. A workshop opens shared practice rather than closing the moment the day ends.",
  },
  {
    title: 'Bi-monthly coaching visits',
    description:
      'Regular coaching visits keep new strategies in use after the initial training. On roughly a bi-monthly cadence, I observe, model, and reflect alongside teachers so that what looked good in a session becomes routine in the classroom.',
  },
  {
    title: 'Leadership consultation',
    description:
      'Structured check-ins with administrators and instructional leaders to track how the work is landing and to plan for what comes after. The aim is a practice your teachers can sustain on their own once an engagement ends.',
  },
  {
    title: 'Planning and reflection meetings',
    description:
      'Dedicated time with teachers to plan upcoming lessons and reflect on recent ones. These meetings turn playful learning into concrete lesson design tied to the content teachers are already responsible for.',
  },
  {
    title: 'Participant resources',
    description:
      'Teachers leave each engagement with materials they can put to use right away: planning tools, classroom-tested activities, and reference guides that fit the curriculum already in place, including CKLA-aligned supplements where they help.',
  },
]

const STEPS = [
  {
    title: 'Initial conversation',
    description:
      "The process starts with a conversation. You describe your district's instructional context, your goals, and any constraints, and a proposed scope takes shape from there. No intake form comes first.",
  },
  {
    title: 'Scoping and agreement',
    description:
      'A written scope of work follows that conversation. It specifies what will be delivered, in what format, over what timeline, and at what investment, so there is no ambiguity and no scope creep by default.',
  },
  {
    title: 'Delivery and coaching',
    description:
      'I deliver the agreed engagement, whether that is workshops, coaching visits, planning and reflection meetings, or some combination, with reflection time built in so the work actually lands.',
  },
  {
    title: 'Debrief and next steps',
    description:
      'At the close of an engagement you receive a summary of what was delivered, what teachers reported, and what a logical continuation might look like. There is no pressure to extend, only a clear picture of what comes next if you choose to.',
  },
]

export default function ForDistrictsPage() {
  return (
    <>
      {/* Intro */}
      <Section pad="intro">
          <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-6">
            Guided playful learning pedagogy for district instructional teams.
          </h1>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Playful Learning Partners is a boutique provider of guided playful
            learning pedagogy. The practice works with district administrators,
            curriculum directors, and instructional coaches to build durable
            teacher capacity, not to deliver a one-time training and leave.
            Engagements are customized to your district and designed to integrate
            with the instructional frameworks you have already adopted. If your
            team is asking how to make rigorous content more accessible without
            giving up standards alignment, this is the conversation to have.
          </p>
      </Section>

      {/* Services — pinwheel-marked cards */}
      <Section surface width="5xl">
          <h2 className="font-display text-fluid-h2 text-ink mb-10">
            What an engagement can include
          </h2>
          <ServiceList items={SERVICES} columns={2} />
      </Section>

      {/* How an engagement works */}
      <Section>
          <h2 className="font-display text-fluid-h2 text-ink mb-10">
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
      </Section>

      {/* Funding note.
          Confidentiality (CLAUDE.md): generic Title I eligibility and general
          grant-support language only. Never add district names, state names, or
          "currently piloting" language here (open-items.md item 4). */}
      <Section surface>
          <h2 className="font-display text-fluid-h2 text-ink mb-6">
            A note on funding
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Engagements can be structured to fit federal and grant funding,
            including Title I. If your district is working within a grant budget
            or a targeted funding stream, I can help you identify funding
            sources, support the grant writing itself, and communicate with
            granting organizations so paperwork does not stall the work. When it
            helps, I will work alongside your grants or finance team during
            scoping so the engagement is documented in a way that fits your
            requirements.
          </p>
      </Section>

      {/* Closing CTA */}
      <Section center>
          <h2 className="font-display text-fluid-h2 text-ink mb-4">
            Start the conversation.
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-8">
            A consult call is low-stakes and structured. You will leave with a
            clear sense of whether a PLP engagement is the right fit for your
            district's goals.
          </p>
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
      </Section>
    </>
  )
}
