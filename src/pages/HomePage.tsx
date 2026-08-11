import { Link } from 'react-router-dom'
import HomeReel from '../components/HomeReel'
import ServiceList from '../components/ServiceList'
import CTAButton from '../components/CTAButton'
import AccentRule from '../components/AccentRule'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import TestimonialCard from '../components/TestimonialCard'
import { FOCUS_RING } from '../lib/ui'

/*
 * Home — copy from docs/site-copy.md (approved), amended by the Aug 2026
 * truthfulness pass. NOTE the one deliberate copy deletion: the approved
 * eyebrow "PreK–Grade 5 · Professional Development & Coaching" is gone. A
 * small-caps label above the h1 is the stock-template kicker pattern, and
 * every word of it already appears in the subhead below, so nothing factual
 * was lost. Restore only as body copy, never as a kicker.
 *
 * Truthfulness amendments:
 *   - Project Zero is no longer called "the group that developed the field's
 *     foundational framework"; the research is "a foundational framework".
 *   - The access claim describes what PLP is set up to offer rather than
 *     asserting existing multi-year partnerships, which do not exist yet.
 * The same edits are recorded in docs/site-copy.md. Do not reintroduce.
 *
 * Layout (Aug 2026): full-bleed hero, copy left and the image reel running to
 * the right screen edge, sized by .hero-shell so only the top of each card —
 * accent rule, pinwheel, title — clears the fold and the body copy sits just
 * under it.
 *
 * Testimonials live here now rather than on their own page; /testimonials
 * 301s to this page.
 */

const THREE_CARDS = [
  {
    title: 'What We Do',
    description:
      'Playful Learning Partners is a boutique provider of professional development, coaching, and collaboration centered on guided playful learning. We help schools implement it through a flexible, organized approach: storytelling and story acting, community meetings, centers and studios, and inclusive classroom structures that make room for curiosity.',
  },
  {
    title: 'Our Philosophy',
    description:
      'Play is one of the most powerful ways children build academic understanding, solve problems, gain confidence, and learn to love the work of learning.',
  },
  {
    title: 'Built Around You',
    description:
      'Every school has its own culture and its own constraints, and no two start in the same place. Services are selected à la carte, funding approaches are flexible, and the framework bends to fit your building.',
  },
]

/*
 * Verbatim from docs/site-copy.md. Never paraphrase third-party words.
 * Attribution is name + role only; no school or district is named. Written
 * permission from both is still outstanding (docs/open-items.md).
 */
const TESTIMONIALS = [
  {
    paragraphs: [
      'Working with Deb as my coach this year was an incredibly positive experience. She consistently encouraged our team to reflect deeply on our practice while honoring the strengths and ideas we already brought to the table. Her thoughtful questions and support helped us think more intentionally about student engagement and meaningful learning experiences.',
      'What I appreciated most was her ability to support growth without judgment. She celebrated successes, helped us navigate challenges, and always made space for teacher voice and creativity.',
      'I leave this year feeling more confident, reflective, and excited about the work ahead.',
    ],
    attribution: 'Samantha Cameron',
    role: 'Special Education Teacher',
  },
  {
    paragraphs: [
      'Deb is truly caring, supportive, and passionate about her work. Her enthusiasm for playful learning is contagious, and she consistently inspires teachers to create engaging, joyful learning experiences for students.',
      'She takes the time to listen, provide thoughtful guidance, and celebrate successes along the way. Her encouragement and expertise built our confidence in trying new strategies and embracing a more playful approach to learning.',
      'She has made a lasting impact on me and my students.',
    ],
    attribution: 'Barbara Saraiva',
    role: 'Second Grade Teacher',
  },
]

const secondaryLink = `font-body font-semibold text-navy dark:text-ink underline underline-offset-4 decoration-accent-teal decoration-2 hover:opacity-80 inline-flex items-center min-h-11 ${FOCUS_RING}`

export default function HomePage() {
  return (
    <>
      {/* Hero — full bleed: copy left, reel running to the right screen edge.
          pt-8 matches the pt-8 on the cards section below, so the gap above
          the image equals the gap between the image and the card rules.
          .hero-shell subtracts the same 2rem so the card peek is unchanged. */}
      <section className="bg-bg w-full pt-8">
        <div className="hero-shell grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="hero-copy py-10 lg:py-0 order-2 lg:order-1">
            <h1 className="font-display text-fluid-hero-h1 text-ink leading-tight mb-3">
              Play is how the learning holds.
            </h1>
            <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-5">
              Playful Learning Partners helps PreK-5 teams put guided playful
              learning to work inside the curriculum they already teach.
              Professional development, classroom coaching, and the
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

          {/* Runs to the right screen edge — no container, no rounding */}
          <div className="order-1 lg:order-2 h-full">
            <HomeReel fill />
          </div>
        </div>
      </section>

      {/* Three cards — sized so only their tops clear the fold */}
      <Section width="7xl" pad="none" className="pt-8 pb-8 sm:pb-10">
        <h2 className="sr-only">Playful Learning Partners at a glance</h2>
        <ServiceList items={THREE_CARDS} columns={3} />
      </Section>

      <AccentRule />

      {/* Grounded in the research */}
      <Section surface>
        <SectionHeading>
          Grounded in the research
        </SectionHeading>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          <p>
            Our work is built on the Pedagogy of Play research from Harvard
            Graduate School of Education's Project Zero, a foundational
            framework in the field of playful learning.
          </p>
          <p>
            That framework gives us four Playful Learning Indicators:
            Enjoyment, Curiosity, Empowerment, and Connection. We use them to
            plan lessons, to structure classroom observations, and to talk
            concretely with teachers and administrators about what is changing
            in a classroom.
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
        <SectionHeading>
          Playful learning shouldn't depend on your funding formula.
        </SectionHeading>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-6">
          <p>
            There's no eligibility threshold to meet here. No need index to
            fall under. No federal funding category you have to qualify for
            before you can bring playful learning to your classrooms.
          </p>
          <p>
            We are set up to work with schools and districts at any level of
            need, from a single workshop series to a multi-year partnership.
            If you want this for your students, there's a way in.
          </p>
        </div>
        <Link to="/services" className={secondaryLink}>
          See what we offer
        </Link>
      </Section>

      {/* Testimonials — moved here from their own page (Aug 2026).
          Page background, not surface: TestimonialCard is itself bg-surface,
          so a surface section would make the cards vanish. */}
      <Section width="5xl">
        <SectionHeading className="mb-3">
          From the teachers we've worked alongside
        </SectionHeading>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.attribution}
              quote={t.paragraphs}
              attribution={t.attribution}
              role={t.role}
            />
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section center>
        <SectionHeading center className="mb-4">
          Let's talk about your building.
        </SectionHeading>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-8">
          Tell us what you're working on: grade levels, goals, what's already
          in place. We'll tell you honestly whether we're a fit.
        </p>
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
