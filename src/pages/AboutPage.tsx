import CTAButton from '../components/CTAButton'

/*
 * Content drawn from Debra's PLP one-pager (History & Mission, guiding
 * principle) and rewritten, not copied, per instruction. Voice rules
 * (brand-tone.md): no em/en dashes, no banned words, no "it's not X, it's Y".
 *
 * PLACEHOLDERS — must be filled by Debra before launch (no credentials, year
 * counts, or locations were invented; see docs/open-items.md):
 *   [X years], [grade band or subject area], [credential or degree],
 *   [context/setting], [location]
 *
 * Note: the one-pager frames PLP as an "industry leader." That claim is
 * deliberately dropped here per brand-voice.md (superlatives invite scrutiny a
 * new practice cannot yet back up); the boutique framing carries the section
 * instead.
 */
export default function AboutPage() {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-8">
            About Debra H.
          </h1>

          <div className="space-y-6 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            <p className="text-ink">
              I am an active classroom teacher, and that is the foundation of
              everything Playful Learning Partners offers. The strategies I bring
              to districts come from real instruction with real students, not
              from a slide deck put together the week before a workshop.
            </p>
            <p>
              Playful Learning Partners is a boutique practice built around
              guided playful learning pedagogy. I work with a small number of
              districts at a time so each engagement can be shaped to the school
              in front of me, using proven methods and looking honestly at
              whether they are working. Across [X years] of classroom practice in
              [grade band or subject area], I have learned where these approaches
              hold up and where they break down, and that judgment is what a
              district is paying for.
            </p>
            <p>
              My approach draws on Harvard's Project Zero and its Playful
              Learning Indicators. When a district wants to know whether an
              engagement is working, I look for four signals in the classroom:
              whether students show enjoyment, whether they follow their own
              curiosity, whether they feel empowered in their learning, and
              whether the work builds genuine connection. Those signals give your
              team something concrete to point to, well beyond a sense that a
              session went well.
            </p>
            <p>
              Every school has its own culture, and I build around it rather than
              dropping in a fixed program. What a first-grade team in one
              district needs is rarely what an instructional coach in another is
              asking for, so the methods flex to fit the setting.
            </p>
            <p>
              I started Playful Learning Partners after watching the same pattern
              repeat: professional development on playful learning that felt
              compelling in the session and went unused by the following Monday.
              The teachers were not the problem. The training simply was not
              connected to their curriculum, their constraints, or the students
              actually in their rooms. This practice exists to close that gap,
              with a different model of delivery rather than a different
              philosophy.
            </p>
            <p>
              I hold [credential or degree] and have worked in [context/setting].
              I am based in [location].
            </p>
          </div>
        </div>
      </section>

      {/* What I believe — cool-gray surface band for quiet separation */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">
            What I believe about play and learning
          </h2>

          <p className="font-display text-xl sm:text-2xl text-ink leading-snug mb-8">
            Play is one of the most reliable ways rigor actually sticks.
          </p>

          <div className="space-y-6 font-body text-base sm:text-lg text-ink-muted leading-relaxed">
            <p>
              When play is structured, intentional, and tied to specific learning
              objectives, it becomes one of the most dependable ways to build
              understanding that lasts. Play is how many children develop
              academic understanding, problem-solving ability, confidence, and a
              real appetite for learning. The research behind this is well
              established. The harder work is translating it into practice that
              fits the curriculum your district already adopted, the standards
              your teachers answer to, and the time they actually have in a day.
              That translation is the work this practice does.
            </p>
            <p>
              I am not asking districts to make school more fun. I am asking them
              to look again at strategies often written off as soft, because many
              of them place heavier cognitive demands on students than the
              worksheet that replaced them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 text-center">
          <CTAButton to="/contact" size="lg">
            Schedule a Consult
          </CTAButton>
        </div>
      </section>
    </>
  )
}
