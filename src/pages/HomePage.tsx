import Hero from '../components/Hero'
import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'

// Voice: no em/en dashes, no banned words, no "it's not X, it's Y" (brand-tone.md).
const WHY_PLP = [
  {
    title: 'Classroom-tested, not conference-assembled',
    description:
      'Every strategy and resource has been refined through hands-on coaching in real classrooms, alongside real teachers and students, rather than pulled together for a workshop.',
  },
  {
    title: 'Built around your curriculum',
    description:
      'The work integrates with the frameworks your teachers already use, including CKLA-aligned supplements, so it strengthens the core program instead of competing with it.',
  },
  {
    title: 'Custom to your district',
    description:
      "There is no fixed program with a fixed delivery model. Each engagement is scoped to your team's needs, your grade bands, and your timeline.",
  },
]

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Playful learning pedagogy, built for real classrooms and district goals."
        subhead="Playful Learning Partners works with district administrators and curriculum directors to bring research-grounded playful learning into daily instruction. Every strategy is classroom-tested, refined through coaching work in real classrooms, not assembled the night before a training."
        ctaLabel="Schedule a Consult"
        ctaTo="/contact"
      />

      {/* What PLP does — cool-gray surface band for quiet section separation */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6">
            What Playful Learning Partners does
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            Playful Learning Partners is a boutique provider of guided playful
            learning pedagogy, working directly with districts to build teacher
            capacity and integrate play-based instructional strategies into
            existing curriculum frameworks. This is a structured, pedagogy-first
            approach to instruction that takes your standards seriously, not a
            recess program or an activity library. Engagements are designed
            around your district's specific classrooms, grade levels, and goals,
            rather than a fixed cohort model delivered the same way everywhere.
          </p>
        </div>
      </section>

      {/* Why PLP — pinwheel-marked cards, three across on desktop */}
      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
            Why districts work with Playful Learning Partners
          </h2>
          <ServiceList items={WHY_PLP} columns={3} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6 lg:px-8 text-center">
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
