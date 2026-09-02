
## TAKE — the entire list

Short, and short for a real reason: the reference draws **every glyph as an inline SVG** in
its own theme (`.svg-icon` / `.svg-omnimedia`). There is no icon font to lift and
`iconGlyphs` returns 0 on all five pages at all three widths. So nothing is taken except two
fonts and a component library we already had.

| what | source | licence, verified in one step | how it is used here |
|---|---|---|---|
| **Hind** 400/500/600/700 | Google Fonts | **OFL 1.1** (Google Fonts catalogue entry) | body face, via `next/font/google`. Reference body computed `hind, sans-serif` at 18px |
| **Teko** 400/500/600/700 | Google Fonts | **OFL 1.1** (Google Fonts catalogue entry) | display face, via `next/font/google`. Reference headings and stat type compute `var(--FF-Teko)` |
| UI icons (chevron, phone, quote mark, hamburger, close, map pin, check) | `lucide-react` | **ISC** | already on the CLAUDE.md dependency allowlist; no SVG is copied from the reference |

**No font file is lifted and no substitution floor is booked.** Both families are the
reference's own real faces, both are OFL, and both are available through `next/font/google`,
so we use the *same* families rather than lookalikes — see `docs/known-divergence.md` §3.
The `Montserrat` / `Bebas Neue` / `Nanum Pen` / `--bs-*-font-family` names in the reference
CSS have zero `@font-face` rules and zero computed usages; they are phantoms and must not be
booked as anything.

(`assets.mjs` reports `faces: 0` on every page. That is a CORS artefact, not a finding: the
font `@font-face` rules live in cross-origin stylesheets whose `cssRules` throw. The font
facts above come from `document.fonts` in the Prompt 1 profile, which is not blocked.)

## The logo

| | |
|---|---|
| slot IDs | `logo-header` (all routes), `logo-footer` (all routes) |
| rendered header | 130x99 @390 · 153x117 @768 · 260x198 @1440 |
| rendered footer | 330x111 @390 · 471x158 @768 · 427x143 @1440 |
| aspect | header ~1.31:1, footer ~2.97:1 — **the aspect changes between the two placements**, so this is two crops, not one file scaled |
| provenance | REPLACE. Premiere Roofing's mark stays on Premiere Roofing's site |
| what ships now | **wordmark set in Teko**, our display face, at the header box; no image file |
| what is still missing | `TODO(fact): logo asset` — a wordmark + icon lockup. The prompt for it is written in `docs/asset-prompts.md` at Prompt 10/11 with the applied palette hues named |

## Carousels — inventoried, deliberately not rebuilt

The reference runs **five jQuery carousels**, all driven by the theme's own `scripts.js`.
There is no Swiper, Slick, Owl or Flickity script enqueued anywhere (`slick` appears only as
the class name `.slick-pricing`), and `docs/profile.md` §7 records zero scroll-linked motion
on the whole site.

| reference slider | route | our section | frames inventoried | our build |
|---|---|---|---|---|
| `.slick-pricing.mcs-slider` | `/` | `door-styles` | 3 (`door-style-1..3`) | **static band, one image** |
| `.roofing-slider` | `/` | `why-us` | 5 (`why-us-1..5`) | **static band, one image** |
| `.cust-slider` | `/` | `testimonials` | quote glyph only; the frames are text | **static band**, three `[TESTIMONIAL PLACEHOLDER]` blocks (D-13) |
| `.cert-slider` | `/` | `credentials` | 15 badge slots | **static wrapped row** of TODO(fact) chips at the reference chip dimensions (D-14) |
| `.cert-slider` | `/services` | `credentials` | 6 badge slots | same component |

**Classification is unchanged: all five bands stay ADAPTED.** Dropping the carousel
mechanism is a build decision inside a retained band, exactly like scrubbing the locations
column out of the footer — it is not a class change, and reclassifying to dodge the
structural comparison is the named failure mode in `docs/sections.md`.

Why static: the profile found no choreography to reproduce, `framer-motion` is explicitly
not justified, and for a repair category a single strong image that is on screen when the
band is reached beats a rotator that hides four fifths of its content behind a timer. The
structural cost is confined to `innerCount` / `innerRows` / `innerCols`, which A-12 makes
**advisory** — they never contribute to the deviation percentage. Band box geometry, type
scale and spacing rhythm, which are what actually get measured, are unaffected.

If a later prompt's structural residual on one of these five bands is dominated by a
*blocking* field rather than an advisory one, that is a real defect and gets the one
`ITERATION_CAP` attempt like any other row.

## Near-white placeholders — repainted files, honest table

18 slots (25 generated files, counting `-alt` crops) sampled a dominant colour above 0.88
luminance. The table above keeps the **sampled hex**, because that is the measurement. The
**files** are repainted `#6f7276` by `scripts/placeholder-guard.mjs`.

The reason is a measurement hole, not aesthetics. A placeholder painted `#fdfcfa` under body
text sits at roughly 1.05:1 against a white page ground, and `rendertruth.mjs` then reports
the whole band `UNMEASURABLE` rather than failing it — the band's real painted contrast is
never scored at all, and the gap looks like a pass. `#6f7276` clears 4.5:1 against both white
and near-black, so whichever way the Prompt 5 palette lands, every one of these bands stays
measurable.

| slot | sampled hex | luminance |
|---|---|---|
| `door-style-2` | `#fdfcfa` | 0.989 |
| `door-style-3` | `#fdfcfa` | 0.989 |
| `icon-commercial` | `#fbfcfc` | 0.987 |
| `why-us-1` | `#f9fafa` | 0.979 |
| `why-us-3` | `#f9fafa` | 0.979 |
| `why-us-2` | `#fbf9f4` | 0.977 |
| `testimonial-quote-mark` | `#f6f7f8` | 0.968 |
| `credential-badge-everest-systems-certified-installers` | `#f2f2f3` | 0.949 |
| `credential-badge-gaf-coating-pro` | `#f2f2f3` | 0.949 |
| `credential-badge-gaf-gold-elite-commercial-contractor` | `#f2f2f3` | 0.949 |
| `credential-badge-mule-hide-certified` | `#f2f2f3` | 0.949 |
| `credential-badge-verico-authorized-contractor` | `#f2f2f3` | 0.949 |
| `credential-badge-duro-last-certified-installers` | `#f2f2f3` | 0.949 |
| `quality-icon-1` | `#ebe9e8` | 0.916 |
| `quality-icon-2` | `#ebe9e8` | 0.916 |
| `credential-badge-img-cert5` | `#e8e9ea` | 0.913 |
| `why-us-4` | `#e1e2e1` | 0.885 |
| `why-us-5` | `#e1e2e1` | 0.885 |

Seven `credential-badge-*` slots carry the fallback `#9aa0a6` instead of a sample: they sit
below the fold inside the `.cert-slider`, so no Prompt 1 section screenshot contains them.
That is recorded rather than guessed, and it is harmless — the fallback is already a mid
neutral.

## Video

One video slot on the reference, the Vimeo `Premiere-Hype-Video` poster in the home `promise`
band (330x186 @390 · 720x405 @768 · 650x366 @1440). **We ship no video and no third-party
embed** (D-15). The slot becomes a still image at the same box, inventoried as
`promise-media`, so the band's height is honest.

## What is NOT here, and why that is a finding

`/about`, `/contact` and `/privacy` inventory **7 images each, and all seven are chrome** —
the header logo, the footer logo and five hidden mega-menu thumbnails. There is no page-head
photograph on any interior route: the `page-head` band is a solid colour strip, not a hero
image. Recorded explicitly because `docs/sections.md` §1 asserted the opposite when it was
written, and the capture is the authority. `docs/sections.md` has been corrected.

Consequence: `page-head` on `/about`, `/services`, `/contact` and `/privacy` is
**not placeholder-blocked**. Those four bands can converge structurally on their first
measurement with nothing excluded.
