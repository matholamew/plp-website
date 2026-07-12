# Playful Learning Partners — Website Build

## What this project is
A 3–5 page consultancy website for Playful Learning Partners (PLP), Debra H.'s
independent consulting practice. Primary audience for this build: school district
administrators and curriculum directors evaluating PLP for paid consulting
engagements (current pipeline includes a Title I–funded contract — **confidential,
do not reference by district name in any public-facing copy**).

Teacher-membership and parent/homeschooler ("Keepers of Play") audiences are
**post-launch**. Structure the site so those can be added as sibling sections
later without a rebuild — see "Scalable URL structure" below.

## The core tension this project is solving
The brand mark (pinwheel, multicolor hand-drawn wordmark) is intentionally playful.
The buyer for the only revenue-generating pillar right now is a district
administrator deciding whether to commit public/grant funding to a consultant.
Every design and copy decision on this site is a negotiation between those two
facts. When in doubt, credibility with the district buyer wins — the brand's
playfulness should show up as *accent*, not as the dominant visual or verbal
register. See `docs/brand-visual.md` and `docs/brand-tone.md` for the specific,
non-negotiable rules this produces.

Do not resolve this tension by unilaterally reinterpreting instructions to make
something "more playful" or "more polished" than what's specified below. If a
task seems to require a judgment call between playful and professional that
isn't covered by the docs, stop and flag it rather than guessing.

## Source-of-truth documents (read before working on anything)
- `docs/brand-voice.md` — positioning, differentiation, what PLP is and isn't
- `docs/brand-tone.md` — verbal tone rules, sentence-level dos/don'ts
- `docs/brand-visual.md` — typography, color usage, logo rules, imagery rules
- `docs/open-items.md` — unresolved decisions that block full production use
  (font licensing, body font pick) — check this before finalizing any asset

## Scalable URL structure
Even though only the district-facing pillar launches now, build routes as:
- `/` — homepage, framed explicitly as "for districts," not generic
- `/for-districts` — the actual services/consulting page (this is what "Services"
  in the nav should point to and be titled)
- `/about`
- `/testimonials`
- `/contact`
- Reserve (do not build yet, but do not collide with): `/for-teachers`,
  `/for-families`

Nav nomenclature should say "For Districts," not "Services" — this keeps the
door open for "For Teachers" / "For Families" nav items later without
restructuring the information architecture.

## Reference site for information architecture
https://www.mertenseducationalconsulting.com/ — single-audience B2B structure,
one CTA throughout ("Schedule a Consult"), minimal color, clear nav. This is the
credibility bar for structure and restraint, not for playfulness — do not adopt
its de-facto no-color palette wholesale, see brand-visual.md for PLP's own
palette rules.

## Confidentiality
Never write copy that names, implies, or is inferable as referring to the
Fall River / Title I contract. If a testimonial, case study, or stat could
identify that specific engagement, generalize it or flag it for Matt/Debra
to approve before it goes further.

## Orchestration & model policy
- **Orchestrator: Claude Fable 5** (`claude-fable-5`) — confirmed by project
  owner based on prior experience with it in a PM/orchestrator role. Not
  currently being re-tested against Sonnet 5. If project scope grows
  significantly (more pages, more concurrent subagents), it's worth a spot
  check on whether the orchestration-quality gain still justifies Mythos-
  tier per-token cost versus Sonnet 5 — not an action item now, just
  something to watch.
- **Coding subagents**: default to Claude Sonnet 5 (`claude-sonnet-5`) as
  Anthropic's current mainline coding-focused model. Use `model: haiku`
  (claude-haiku-4-5-20251001) in `.claude/agents/` only for narrow,
  low-complexity tasks (simple copy edits, straightforward component
  scaffolding) — escalate to Sonnet per-agent if Haiku output on that task
  type is consistently unacceptable. Don't blanket-upgrade all agents
  preemptively just because Sonnet is available.
- Every subagent's system prompt must explicitly require it to read
  `docs/brand-tone.md` and `docs/brand-visual.md` before producing copy or
  styling. Multiple models working on one brand is a real consistency risk;
  the docs are the shared contract that keeps that risk contained.
- Subagents should return their work to the orchestrator for a brand-consistency
  pass, not commit/finalize independently.

## Known open items — see docs/open-items.md
Do not treat this project as fully spec'd until these are resolved.

## Build & run (added at scaffold, 2026-07-11)
- Stack: Vite 5 + React 18 + TypeScript (strict) + Tailwind 3.4 + react-router-dom 6. Static SPA, no backend.
- `npm install` → `npm run dev` (local) / `npm run build` (output in `dist/`). Deployed as a Cloudflare **Workers** static-assets site via `wrangler.jsonc` (`assets.directory: ./dist`, `not_found_handling: "single-page-application"` handles SPA deep-route fallback). No `_redirects` file — that was the Pages approach and its `/* /index.html 200` rule triggers an infinite-loop error under Workers assets.
- Theme system: semantic Tailwind tokens backed by CSS variables in `src/index.css` (`:root` = light, `.dark` = draft dark mode). To drop dark mode after the demo: delete the `.dark` block, `ThemeToggle` component, and its uses in `SiteNav` — nothing else references dark values.
- `?theme=light|dark` URL param overrides theme before first paint (demo deep-links; not persisted).
- Explode font: `@font-face` in `src/index.css` points at `public/fonts/Explode-Regular.otf` (human-placed file; never embed the binary — open-items.md item 1). Note: the font renders all-caps by design.
- Not yet done (deliberate deferrals): GitHub remote + Cloudflare Pages deploy, contact form backend (mailto only), real testimonial quotes (open-items item 3), About-page bio placeholders, contact email confirmation (hello@playfullearningpartners.com is a placeholder in SiteFooter + ContactPage).
