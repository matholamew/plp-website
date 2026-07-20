import HomeCarousel from '../components/HomeCarousel'
import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import AccentRule from '../components/AccentRule'

/*
 * Homepage (2026-07-13 redesign per Debra, after the approved reference
 * mockup): header + stripes + full-width image carousel fill exactly one
 * viewport; everything below is under the fold, led by a three-card row.
 *
 * FACTUAL: Debra is NOT a classroom teacher (see brand-voice.md correction).
 * Copy frames her as a coach working in real classrooms.
 */
const WHY_PLP = [
  {
    title: 'Classroom-tested, not conference-assembled',
    description:
      'Every strategy and resource has been refined through hands-on coaching in real classrooms, alongside real teachers and students, rather than pulled together for a workshop.',
  },
  {
    title: 'Built around your curriculum, not instead of it',
    description:
      "PLP's approach integrates with the frameworks your teachers already use, including CKLA-aligned supplements, so the work compounds rather than competes.",
  },
  {
    title: 'Custom to your district, from the start',
    description:
      "There is no fixed program with a fixed delivery model. Each engagement is scoped to your team's needs, your grade bands, and your timeline.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Above the fold: carousel (header + stripes + this = 100svh) */}
      <HomeCarousel />

      {/* Three-card row — reference mockup's below-carousel layout */}
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="sr-only">Why districts work with Playful Learning Partners</h2>
          <ServiceList items={WHY_PLP} columns={3} />
        </div>
      </section>

      <AccentRule />

      {/* What PLP does — cool-gray surface band for section separation */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6">
            What Playful Learning Partners does
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Playful Learning Partners is a boutique provider of guided playful
            learning pedagogy, working directly with districts to build teacher
            capacity and integrate play-based instructional strategies into
            existing curriculum frameworks. This is not a recess program or an
            activity library. It is a structured, pedagogy-first approach to
            instruction that takes your curriculum standards seriously.
            Engagements are designed around your district's specific
            classrooms, grade levels, and goals, not a fixed cohort model
            delivered the same way to every district that signs on.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-xl sm:text-2xl text-ink mb-8">
            Ready to talk about what a playful learning engagement could look
            like for your district?
          </p>
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>

          {/* The single allowed forward-looking mention of pillars 2 and 3
              (CLAUDE.md / brand-voice.md) — one sentence, no pricing, no
              features, no sign-up language. Do not expand. */}
          <p className="font-body text-sm text-ink-muted mt-12">
            A teacher membership resource library and a parent and homeschool
            learning community are both in development for future launch.
          </p>
        </div>
      </section>
    </>
  )
}
