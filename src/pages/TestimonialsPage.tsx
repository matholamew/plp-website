import TestimonialCard from '../components/TestimonialCard'
import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * Testimonials — quotes VERBATIM from docs/site-copy.md (approved, final;
 * these are the client-trimmed versions and supersede the longer one-pager
 * transcriptions). Never paraphrase third-party words. Attribution is name +
 * role only; no school or district is named.
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

export default function TestimonialsPage() {
  return (
    <>
      <Section pad="intro">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-4">
          Testimonials
        </h1>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          From the teachers we've worked alongside.
        </p>
      </Section>

      <Section pad="none" className="pb-intro space-y-8">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard
            key={t.attribution}
            quote={t.paragraphs}
            attribution={t.attribution}
            role={t.role}
          />
        ))}
      </Section>

      <Section center pad="none" className="pb-intro">
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
