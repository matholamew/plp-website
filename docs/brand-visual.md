# Brand Visual System — Playful Learning Partners

These rules come directly from the design review with Debra and Maria
(graphic designer). They are more specific than general taste — follow them
literally; don't reinterpret toward "more playful" or "more polished" without
flagging it first (see CLAUDE.md).

## Background
- **True white (`#FFFFFF`)** — confirmed by project owner. Do not use
  off-white, cream, or warm neutrals as page background.
- Section dividers/backgrounds may use a **cool gray at ~10% tint** to
  separate content blocks. This is the only non-white background value
  allowed outside the header/footer bands.
- **No blob shapes.** Debra explicitly rejected organic blob backgrounds.
  Do not use them as a "softening" device anywhere on the site.

## Approved base layout — CURRENT
The base is the restrained-grid hero mockup (navy-and-white palette,
limited accent color use). Typography and CTA color have both been revised
since that mockup was picked — see below for the current spec.

**Confirmed spec:**
- Headings/display text: **Explode** (the logo's display font), with a
  solid fallback stack (e.g. `"Explode", Montserrat, sans-serif`). Licensing
  is unresolved/accepted-risk — see open-items.md item 1. Case treatment
  not yet specified; using natural case pending further input.
- Body/UI text: **Montserrat** — replaces Inter.
- Primary CTA button: **teal** (`#14b8a6`) — confirmed. The original mockup
  showed navy; teal overrides it per Debra's explicit correction.
- Palette otherwise as in the mockup: navy (`#16296b`/`#1e3a8a`) for
  structural elements (headers, stat numbers), pink/purple/teal as accents
  only.

## Color system
Brand colors (from the logo): navy, hot pink, purple, teal.
- **Header and footer**: navy band, this is where the brand's color identity
  lives structurally, not spread across the whole page.
- **Primary CTA buttons ("Schedule a Consult" etc.)**: **teal**, not pink and
  not navy — confirmed by project owner. Overrides the original mockup's
  navy CTA.
- **Accent color lines**: thin bands/lines of the brand colors are a liked
  motif — but make them **longer**, running further through the layout, not
  short dashes. This was Maria's specific note in the last review.
- Do not use the full saturated palette evenly across the page — that reads
  as too playful per both Matt and Maria's review. Accent colors are accents.
- Do **not** use a full navy background for the page body (a "reversed,
  luxury hotel" treatment was discussed and explicitly set aside — it reads
  as a departure from the brand into a different, more austere register that
  doesn't fit an education-consulting brand).

## Typography — CURRENT (see "Approved base layout" above)
- **Headings/display**: Explode (logo's display font), fallback to
  Montserrat/sans-serif if the file isn't present. Licensing accepted-risk
  per project owner — see open-items.md item 1. This project's generated
  code will never embed the actual font binary; only reference it by path.
- **Body/UI text**: Montserrat.
- No serif anywhere in this direction.

## Typography — historical context only, does not apply
*(Two rounds of revision ago, the plan was Explode-caps headings with a
free geometric-sans body font; one round ago it was Fraunces-serif
headings with Inter body. Neither applies now — see "CURRENT" above. Kept
here only so the reasoning isn't lost if a future round reverts again.)*

## Logo usage
- Logo is final and must not be modified, recolored, or redrawn.
- **Dynamic header behavior**: on page load, show the full horizontal
  lockup (pinwheel + wordmark) at a large size in the hero — this should be
  the dominant visual element on load. On scroll, the header logo shrinks
  down to **just the pinwheel mark** (not the full wordmark) as a persistent
  compact nav icon.
- **Negative space**: don't crowd the hero wordmark with other design
  elements (badges, secondary graphics, competing focal points). Matt and
  Maria agreed the negative space around the wordmark is doing real work —
  it draws the eye there rather than splitting attention.
- **Pinwheel as bullet marker**: use the pinwheel graphic (not a generic
  bullet/dot) as the list-item marker for headings like services lists or
  "why PLP" points. This was a specifically liked detail from Maria's draft.

## Imagery
- Prioritize photos of **hands and manipulatives in use** (materials on a
  table, active play in progress) over posed photos of children's faces.
  Debra has permissions for some existing photos from her own classroom work;
  confirm licensing/consent status per photo before use, and never use a
  photo that could make the confidential district engagement identifiable.
- Avoid stock photography that reads as generic "kids playing" — it works
  against the classroom-tested, specific-expertise positioning.

## Structural reference
Playworks.org was flagged as the closer structural reference for this build
(not Playmaker University, which reads as daycare-like per team review). Pull
layout/IA inspiration from Playworks' structure, not its visual playfulness.

## Light/Dark Mode Toggle — DRAFT, for Debra/Maria demo
Requested to show as an option, not yet a confirmed permanent feature (see
open-items.md). Build with CSS custom properties so light and dark are two
token sets, not two hand-maintained stylesheets — every component needs
both states actually rendered and checked, not just "should theoretically
work." Toggle via a class or `data-theme` attribute on `<html>`/`<body>`.

**Light mode (default, matches "Approved base layout" above):**
- Background: `#FFFFFF`
- Body text: `#1a1a2e` (ink)
- Header/footer band: navy (`#16296b`)
- CTA: teal (`#14b8a6`)
- Accents: pink/purple/teal, used sparingly per the rules above

**Dark mode (draft — this is the treatment Matt was wary of in the
transcript when discussed as a permanent full-page choice; here it's
explicitly opt-in, which sidesteps that specific objection, but the
underlying "does navy-heavy dark feel too austere for this brand" question
is still worth Debra and Maria's eyes before this goes further):**
- Background: near-black navy, e.g. `#0b1220` (distinct from the header/
  footer navy so the page doesn't look like an uninterrupted navy slab)
- Body text: off-white, e.g. `#e8e8f0`
- Header/footer band: slightly lighter navy than the page background for
  separation, e.g. `#16296b` (same as light mode's header color, now acting
  as a mid-tone against the darker page background)
- CTA: keep teal — same hex works on dark backgrounds without adjustment,
  and keeping the CTA color identical across modes reinforces it as the
  brand's action color rather than a mode-dependent choice
- Accents: pink/purple lightened or desaturated slightly if contrast
  testing shows an issue against the dark background; don't assume the
  light-mode hex values pass contrast unchanged
- Logo: the multicolor wordmark should work on dark backgrounds without
  modification (it's not a monochrome mark), but verify actual contrast
  against `#0b1220` before treating this as settled

**Verification requirement**: every component (nav, buttons, cards,
testimonial blocks, stat blocks, footer) needs both states actually
rendered and visually checked — not inferred from the token swap alone.
Contrast-check text-on-background pairs in both modes, not just light mode.
