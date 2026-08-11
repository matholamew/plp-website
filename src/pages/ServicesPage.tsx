import CTAButton from '../components/CTAButton'
import Section from '../components/Section'
import SpinPinwheel from '../components/SpinPinwheel'

/*
 * Services — copy VERBATIM from docs/site-copy.md (approved, final). Do not
 * rewrite or add sections.
 *
 * Aug 2026 truthfulness pass: removed "This is the piece most professional
 * development skips, and it's the reason implementations fade after year
 * one." It asserted an unsubstantiated claim about the PD field and implied
 * PLP had observed those year-one fades. Recorded in docs/site-copy.md.
 *
 * Pinwheel motif (client request): decorative pinwheels spin on hover and on
 * scroll-into-view beside each service heading. They never gate content —
 * every description and list is always fully visible (administrators come
 * here to read; no click/hover reveals).
 */

interface ServiceSection {
  title: string
  paragraphs: string[]
  listIntro?: string
  list?: string[]
  closing?: string
  topics?: string
}

const SERVICES: ServiceSection[] = [
  {
    title: 'Workshops',
    paragraphs: [
      "Interactive, hands-on workshops built for the teams who'll be doing the work together. Schools and districts select from our workshop topics based on their goals, staffing, and implementation priorities.",
    ],
    listIntro: 'Every workshop includes:',
    list: [
      'Interactive activities and collaborative planning time',
      'Case studies and classroom scenarios',
      'Implementation tools and templates',
      'Discussion protocols and reflection activities',
      'Practical, immediate classroom application',
      'Participant resources to support the work between sessions',
    ],
    closing:
      'All participants leave with planning tools, templates, and materials aligned to the focus areas — designed to support ongoing implementation and collaboration across co-teaching teams and inclusive classrooms.',
    topics:
      'Workshop topics: Pedagogy of Play · Community Meeting · Storytelling & Story Acting · Writers Workshop · Read Aloud / Text Talk · Centers & Studios · Paraprofessional Professional Development',
  },
  {
    title: 'Classroom Coaching',
    paragraphs: [
      'Workshops start something. Coaching is what makes it stick.',
      'We recommend ongoing classroom observation and feedback cycles across the school year. They are spaced so teams have real time to try a strategy, adjust it, and reflect before the next cycle.',
    ],
    listIntro: 'Each cycle includes:',
    list: [
      'Classroom observation',
      'Co-teaching and modeling',
      'Pre-planning conversations and structured reflection',
      'Actionable recommendations',
      'Debrief conversations',
      'Support with the materials each practice requires',
    ],
  },
  {
    title: 'Administrator Collaboration & Sustainability',
    paragraphs: [
      "Regular working sessions with school and district leaders. We look at what's changing in classrooms, what teachers and students need next, and how to build a model that carries the work forward without us.",
    ],
  },
  {
    title: 'Monthly PLC Meetings',
    paragraphs: [
      "Standing sessions for all teachers involved in the work — what's working, where they want help, and dedicated time to brainstorm and collaborate vertically across grade levels.",
    ],
  },
  {
    title: 'Family Engagement Nights',
    paragraphs: [
      "An evening where students and teachers show families what playful learning looks like from the inside. PLP helps coordinate the event and prepares teachers and students to engage families in a way that's genuinely playful — not a presentation about play, an experience of it.",
    ],
  },
  {
    title: 'Funding & Grant Support',
    paragraphs: [
      "Budget shouldn't be the reason this doesn't happen.",
      'We help schools and districts identify funding sources, develop grant applications, and communicate with granting organizations to support playful learning work.',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Section pad="intro">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-6">
          Services
        </h1>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          Services are selected à la carte. Professional development and
          classroom coaching are built to work together, but there's no
          required package — we build around your goals, your staffing, and
          your funding.
        </p>
      </Section>

      {SERVICES.map((service, i) => (
        <Section key={service.title} surface={i % 2 === 0}>
          <h2 className="font-display text-fluid-h2 text-ink mb-6 flex items-center gap-3">
            <SpinPinwheel size={36} className="flex-shrink-0" />
            {service.title}
          </h2>

          <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            {service.paragraphs.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}

            {service.list && (
              <>
                <p className="text-ink font-medium">{service.listIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {service.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {service.closing && <p>{service.closing}</p>}

            {service.topics && (
              <p className="text-ink font-medium">{service.topics}</p>
            )}
          </div>
        </Section>
      ))}

      <Section center>
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
