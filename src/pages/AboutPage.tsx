import AccentRule from '../components/AccentRule'
import CTAButton from '../components/CTAButton'

/*
 * PLACEHOLDERS — must be filled by Debra before launch (no credentials,
 * year counts, or locations were invented; see docs/open-items.md):
 *   [X years], [grade band or subject area], [credential or degree],
 *   [context/setting], [location]
 */
export default function AboutPage() {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-8">
            About Debra H.
          </h1>

          <div className="space-y-6 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            <p className="text-ink">
              I am an active classroom teacher, and that is not a detail I
              include for warmth — it is the foundation of everything Playful
              Learning Partners offers.
            </p>
            <p>
              The strategies I bring to districts are not sourced from research
              papers alone, and they are not assembled the night before a
              professional development session. They come from [X years] of
              classroom practice, refined through actual instruction with
              actual students, across [grade band or subject area]. I know what
              these approaches look like when they work, and I know where they
              break down. That distinction is what you are paying for when you
              bring me into your district.
            </p>
            <p>
              I started Playful Learning Partners because I kept seeing the
              same gap: professional development on playful learning that was
              genuinely compelling in a conference session and genuinely unused
              by the following Monday. The problem was not that teachers were
              resistant. The problem was that the training was not connected to
              their actual curriculum, their actual classroom constraints, or
              the specific students in front of them. PLP is built to close
              that gap — not with a different philosophy, but with a different
              model of delivery.
            </p>
            <p>
              I hold [credential or degree] and have worked in
              [context/setting]. I am based in [location].
            </p>
          </div>
        </div>
      </section>

      <AccentRule />

      {/* What I believe */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">
            What I believe about play and learning
          </h2>

          <p className="font-display text-xl sm:text-2xl text-ink leading-snug mb-8">
            Play is not the break from rigor. It is how rigor sticks.
          </p>

          <div className="space-y-6 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            <p>
              When play is structured, intentional, and tied to specific
              learning objectives, it is not a departure from academic
              seriousness — it is one of the most reliable ways to build
              durable understanding. The research on this is not new. What is
              harder is translating it into classroom practice that aligns with
              the curriculum your district has already adopted, the standards
              your teachers are accountable to, and the time constraints they
              actually have. That is the work Playful Learning Partners does.
            </p>
            <p>
              I am not asking districts to make school more fun. I am asking
              them to consider that the instructional strategies they may have
              written off as "soft" are, in many cases, more rigorous in their
              cognitive demands than the worksheet that replaced them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
        </div>
      </section>
    </>
  )
}
