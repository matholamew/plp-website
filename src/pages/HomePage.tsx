import { Link } from 'react-router-dom'
import HomeReel from '../components/HomeReel'
import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import AccentRule from '../components/AccentRule'
import Section from '../components/Section'
import { FOCUS_RING } from '../lib/ui'

/*
 * Home — copy VERBATIM from docs/site-copy.md (approved, final). Do not
 * rewrite, "improve," or add sections. The hero reel is deliberately short
 * (16:9, capped height) so the three cards sit above the fold on desktop.
 */

const THREE_CARDS = [
  {
    title: 'What We Do',
    description:
      'Playful Learning Partners is a boutique provider of professional development, coaching, and collaboration centered on guided playful learning. We help schools implement it through a flexible, organized approach — storytelling and story acting, community meetings, centers and studios, and inclusive classroom structures that make room for curiosity.',
  },
  {
    title: 'Our Philosophy',
    description:
      'Play is not a break from learning. It is one of the most powerful ways children build academic understanding, solve problems, gain confidence, and learn to love the work of learning.',
  },
  {
    title: 'Built Around You',
    description:
      'Every school has its own culture, its own constraints, and its own starting point. Services are selected à la carte, funding approaches are flexible, and the framework flexes to fit your building — not the other way around.',
  },
]

// Samantha Cameron quote, trimmed to the first paragraph per site-copy.md
const TESTIMONIAL_PULL =
  'Working with Deb as my coach this year was an incredibly positive experience. She consistently encouraged our team to reflect deeply on our practice while honoring the strengths and ideas we already brought to the table. Her thoughtful questions and support helped us think more intentionally about student engagement and meaningful learning experiences.'

const secondaryLink = `font-body font-semibold text-navy dark:text-ink underline underline-offset-4 decoration-accent-teal decoration-2 hover:opacity-80 inline-flex items-center min-h-11 ${FOCUS_RING}`

export default function HomePage() {
  return (
    <>
      {/* Hero — text + short 16:9 reel; cards follow above the fold */}
      <Section width="7xl" pad="none" className="pt-5 sm:pt-7 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          <div>
            <p className="font-body text-sm font-semibold tracking-wide uppercase text-accent-purple mb-3">
              PreK–Grade 5 · Professional Development &amp; Coaching
            </p>
            <h1 className="font-display text-fluid-hero-h1 text-ink leading-tight mb-3">
              Play isn't a break from learning. It's how the learning holds.
            </h1>
            <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-5">
              Playful Learning Partners helps PreK–5 teams put guided playful
              learning to work inside the curriculum they already teach.
              Professional development, in-classroom coaching, and the
              structures that make it last after the workshop ends.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <CTAButton to="/contact" size="lg">
                Schedule a Consult
              </CTAButton>
              <Link to="/services" className={secondaryLink}>
                See what we offer
              </Link>
            </div>
          </div>

          <HomeReel />
        </div>
      </Section>

      {/* Three cards */}
      <Section width="7xl" pad="none" className="pb-8 sm:pb-10">
        <h2 className="sr-only">Playful Learning Partners at a glance</h2>
        <ServiceList items={THREE_CARDS} columns={3} />
      </Section>

      <AccentRule />

      {/* Grounded in the research */}
      <Section surface>
        <h2 className="font-display text-fluid-h2 text-ink mb-6">
          Grounded in the research
        </h2>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          <p>
            Our work is built on the Pedagogy of Play research from Harvard
            Graduate School of Education's Project Zero — the group that
            developed the field's foundational framework for playful learning.
          </p>
          <p>
            That framework gives us four Playful Learning Indicators —
            Enjoyment, Curiosity, Empowerment, and Connection — that we use to
            plan lessons, structure classroom observations, and talk concretely
            with teachers and administrators about what's changing in a
            classroom.
          </p>
          <p>
            The indicators are a shared language, not a rubric to impose. How
            they show up in a kindergarten studio is not how they show up in a
            fourth-grade writers theater, and we adjust accordingly.
          </p>
        </div>
      </Section>

      {/* Access */}
      <Section>
        <h2 className="font-display text-fluid-h2 text-ink mb-6">
          Playful learning shouldn't depend on your funding formula.
        </h2>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-6">
          <p>
            There's no eligibility threshold to meet here. No need index to
            fall under. No federal funding category you have to qualify for
            before you can bring playful learning to your classrooms.
          </p>
          <p>
            We work with schools and districts at every level of need — full
            multi-year partnerships or a single workshop series. If you want
            this for your students, there's a way in.
          </p>
        </div>
        <Link to="/services" className={secondaryLink}>
          See what we offer
        </Link>
      </Section>

      {/* Testimonial pull */}
      <Section surface>
        <figure className="border-l-4 border-accent-teal pl-5 sm:pl-6">
          <blockquote>
            <p className="font-body italic text-ink leading-relaxed">
              &ldquo;{TESTIMONIAL_PULL}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-4 font-body text-sm text-ink-muted">
            Samantha Cameron, Special Education Teacher
          </figcaption>
        </figure>
        <p className="mt-6">
          <Link to="/testimonials" className={secondaryLink}>
            Read more from the teachers we've worked alongside
          </Link>
        </p>
      </Section>

      {/* Closing CTA */}
      <Section center>
        <h2 className="font-display text-fluid-h2 text-ink mb-4">
          Let's talk about your building.
        </h2>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-8">
          Tell us what you're working on — grade levels, goals, what's already
          in place — and we'll tell you honestly whether we're a fit.
        </p>
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
