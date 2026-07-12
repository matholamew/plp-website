import Hero from '../components/Hero'
import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import AccentRule from '../components/AccentRule'

const WHY_PLP = [
  {
    title: 'Classroom-tested, not consultant-assembled',
    description:
      'Every strategy and resource comes from an active classroom practice — refined through real instruction, not pulled together for a workshop.',
  },
  {
    title: 'Built around your curriculum, not instead of it',
    description:
      "PLP's approach integrates with the frameworks your teachers already use, including CKLA-aligned supplements, so the work compounds rather than competes.",
  },
  {
    title: 'Custom to your district, from the start',
    description:
      "There is no fixed program with a fixed delivery model — each engagement is scoped to your team's needs, your grade bands, and your timeline.",
  },
]

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Playful learning pedagogy, built for real classrooms and district goals."
        subhead="Playful Learning Partners works with district administrators and curriculum directors to integrate research-grounded playful learning strategies into classroom instruction — not as enrichment, but as the instructional core. Every approach is classroom-tested by an active teacher, not sourced from a slide deck."
        ctaLabel="Schedule a Consult"
        ctaTo="/contact"
      />

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
            activity library — it is a structured, pedagogy-first approach to
            instruction that takes your curriculum standards seriously.
            Engagements are designed around your district's specific
            classrooms, grade levels, and goals, not a fixed cohort model
            delivered the same way to every district that signs on.
          </p>
        </div>
      </section>

      {/* Why PLP — pinwheel-marked list */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
            Why districts work with Playful Learning Partners
          </h2>
          <ServiceList items={WHY_PLP} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 lg:px-8 text-center">
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
