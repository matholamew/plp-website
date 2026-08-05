import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * About — copy VERBATIM from docs/site-copy.md (approved, final). Do not
 * rewrite or add sections. No founder photo at launch (per the copy doc).
 */
export default function AboutPage() {
  return (
    <>
      <Section pad="intro">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-8">
          About Playful Learning Partners
        </h1>

        <div className="space-y-6 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          <p className="text-ink">
            Playful Learning Partners is an educational consulting practice
            built on a single conviction: that play belongs inside rigorous
            instruction, not alongside it.
          </p>
          <p>
            We work with PreK–Grade 5 teams — teachers, paraprofessionals,
            coaches, and school leaders — to design systems that bring guided
            playful learning to life and keep it alive after the training ends.
            That work takes the form of professional learning, in-classroom
            coaching, classroom observation cycles, and consultation with
            administrators on how to sustain the practice.
          </p>
          <p>
            Our focus is practical implementation. Storytelling and story
            acting. Community meetings. Centers and studios. Writers theater.
            Read aloud and text talk. Inclusive classroom structures that honor
            children's curiosity, creativity, and need to belong. These are the
            specific, teachable practices that turn a philosophy into something
            a teacher can do at 9:15 on a Tuesday.
          </p>
          <p>
            We are especially committed to making playful learning accessible
            to every child and every educator — not only the schools with the
            budget for it. Whether we're facilitating a workshop, coaching a
            teacher in her own classroom, or sitting with a district leadership
            team, the goal doesn't change: help the adults build spaces where
            children can explore, connect, and thrive.
          </p>
          <p>
            We welcome partnerships with schools, districts, nonprofits, and
            community organizations willing to reconsider what learning can
            look like when we trust the power of play.
          </p>
        </div>
      </Section>

      <Section surface>
        <h2 className="font-display text-fluid-h2 text-ink mb-6">
          The research behind the work
        </h2>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          <p>
            Playful Learning Partners' approach draws on the Pedagogy of Play
            research developed by Harvard Graduate School of Education's
            Project Zero.
          </p>
          <p>
            Project Zero's Playful Learning Indicators — Enjoyment, Curiosity,
            Empowerment, and Connection — give us a way to describe what
            playful learning actually looks like when it's working, and to
            notice when it isn't. We use them to guide implementation and to
            give teachers and administrators something concrete to point at.
          </p>
          <p>
            We also treat them as flexible. Each school's culture is different,
            and the indicators bend to fit the building.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-fluid-h2 text-ink mb-6">
          About the Founder
        </h2>
        <p className="font-display text-lg text-ink mb-6">
          Debra Hurwitz, Founder
        </p>
        <div className="space-y-5 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
          <p>
            Debra founded Playful Learning Partners after decades in education,
            working alongside teachers, school leaders, and communities to
            build classrooms where children experience both joy and rigor.
          </p>
          <p>
            She has spent her career on the harder half of the question. Not
            does playful learning work — the research settled that. The
            question she keeps returning to is the one that actually determines
            whether children benefit: how do we make it happen every day?
          </p>
          <p>That question is the reason PLP exists.</p>
        </div>
      </Section>

      <Section center pad="none" className="pb-intro">
        <CTAButton to="/contact" size="lg">
          Schedule a Consult
        </CTAButton>
      </Section>
    </>
  )
}
