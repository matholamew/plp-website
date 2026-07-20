import TestimonialCard from '../components/TestimonialCard'
import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * Testimonials transcribed VERBATIM from Debra's PLP one-pager (approved by
 * Matt, 2026-07-12). Do not paraphrase, tighten, or "improve" quote text —
 * these are third-party words and the site's voice rules do not apply inside
 * quotation marks. Attribution is name + role only, as in the source document;
 * no school or district is named (CLAUDE.md confidentiality).
 */
const TESTIMONIALS = [
  {
    quote:
      'Working with Deb as my coach this year was an incredibly positive experience. She consistently encouraged our team to reflect deeply on our practice while honoring the strengths and ideas we already brought to the table. Her thoughtful questions, encouragement, and support helped us think more intentionally about student engagement and meaningful learning experiences. What I appreciated most was her ability to support growth without judgment. She celebrated successes, helped us navigate challenges, and always made space for teacher voice and creativity. I leave this year feeling more confident, reflective, and excited about the work ahead, and I am grateful for Deb’s partnership and impact on my practice.',
    attribution: 'Samantha Cameron',
    role: 'Special Education Teacher',
  },
  {
    quote:
      'Working with Deb as my Playful Learning coach has been an incredible experience. She is truly caring, supportive, and passionate about her work. Her enthusiasm for playful learning is contagious, and she consistently inspires teachers to create engaging, joyful learning experiences for students. What stands out most is the genuine care she shows for both educators and children. She takes the time to listen, provide thoughtful guidance, and celebrate successes along the way. Her encouragement and expertise have helped build confidence in trying new strategies and embracing a more playful approach to learning. Her dedication, positivity, and commitment to student-centered learning have made a lasting impact on me and my students. We are grateful for her support and the meaningful difference she has made in our classrooms. She is an exceptional coach whose passion for education shines through in everything she does.',
    attribution: 'Barbara Saraiva',
    role: 'Second Grade Teacher',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <Section pad="intro">
          <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-4">
            What educators say about working with Debra.
          </h1>
          <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            These testimonials come from teachers who worked with Playful
            Learning Partners through coaching engagements in their own
            classrooms.
          </p>
      </Section>

      <Section pad="none" className="pb-intro space-y-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.attribution}
              quote={t.quote}
              attribution={t.attribution}
              role={t.role}
            />
          ))}
      </Section>

      <Section pad="none" center className="pb-intro">
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
      </Section>
    </>
  )
}
