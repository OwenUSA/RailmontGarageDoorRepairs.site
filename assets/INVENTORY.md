# assets/INVENTORY.md — asset slots, provenance, status (Prompt 2)

**Regenerate, never hand-edit the tables.** The two tables below are produced by
`node ../_shared/harness/src/write-inventory.mjs` from `.harness/inventory.json`. This
preamble is `assets/INVENTORY.head.md` and the narrative after the tally is
`assets/INVENTORY.tail.md`; those two are hand-written and are the only editable parts.

Pipeline, in order:

```bash
node ../_shared/harness/src/serve-reference.mjs      # verify "Premiere Roofing" in the banner
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/assets.mjs        # -> .harness/assets/*.json
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/inventory.mjs     # -> .harness/inventory.json + public/placeholders/
node scripts/placeholder-guard.mjs                               # repaint near-white placeholder FILES
node ../_shared/harness/src/write-inventory.mjs                  # -> this file
```

## Provenance policy — D-09 and D-11, applied

Two buckets only, and the split is decided by ownership, not by usefulness.

- **TAKE** — generic UI icons and open-licensed fonts whose licence verifies in one step.
  On this reference that is a very short list, enumerated in the TAKE section below,
  because the reference ships **no icon font at all**: every glyph is an inline SVG drawn
  in the theme. Our icons come from `lucide-react` (ISC), which we already have on the
  dependency allowlist.
- **REPLACE** — everything else. Their photographs, logo, wordmark, staff headshots,
  certification badges, award graphics, band backgrounds and video poster frames belong to
  Premiere Roofing and stay on their site. **Not one REPLACE asset is downloaded into this
  repo, not even temporarily.** What we record is geometry, aspect, `object-fit` and a
  dominant colour sampled from the Prompt 1 screenshots that are already on disk — enough
  for a generator to fill the slot, and nothing that is theirs.

`DELETED` in the second table is not a third provenance. It is a REPLACE-class slot whose
band `docs/sections.md` deletes, or a slot a `lucide-react` glyph satisfies with no file.

## Slot counting

WordPress srcset variants collapse: `foo-480x281.png`, `foo-980x574.png` and `foo.png` are
**one slot**, keyed on the base name. Dimensions recorded per breakpoint are **rendered**
boxes, not file sizes, and the `natural` figure carried in `.harness/inventory.json` is the
highest resolution the reference actually served across the three widths.


## REPLACE — every slot, with the geometry a generator needs

| slot ID | route | section | kind | 390 | 768 | 1440 | aspect | object-fit | dominant | aspect Δ | placeholder |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `credential-badge-best-of-irmo-2023` | / | credentials | img | 158x88 | — | 158x88 | 1.80:1 | fill | `#9aa0a6` | no | `credential-badge-best-of-irmo-2023.svg` |
| `credential-badge-best-of-irmo-2024` | / | credentials | img | 158x88 | — | 158x88 | 1.80:1 | fill | `#9aa0a6` | no | `credential-badge-best-of-irmo-2024.svg` |
| `credential-badge-eos` | / | credentials | img | 139x86 | — | 139x86 | 1.62:1 | fill | `#9aa0a6` | no | `credential-badge-eos.svg` |
| `credential-badge-everest-systems-certified-installers` | / | credentials | img | 225x63 | 155x43 | 225x63 | 25:7 | fill | `#f2f2f3` | **yes** | `credential-badge-everest-systems-certified-installers.svg + credential-badge-everest-systems-certified-installers-alt.svg` |
| `credential-badge-gaf-coating-pro` | / | credentials | img | 219x94 | 155x67 | 219x94 | 2.33:1 | fill | `#f2f2f3` | **yes** | `credential-badge-gaf-coating-pro.svg + credential-badge-gaf-coating-pro-alt.svg` |
| `credential-badge-gaf-gold-elite-commercial-contractor` | / | credentials | img | 183x120 | 155x102 | 183x120 | 1.52:1 | fill | `#f2f2f3` | no | `credential-badge-gaf-gold-elite-commercial-contractor.svg` |
| `credential-badge-img-cert1` | / | credentials | img | 134x146 | — | 134x146 | 0.92:1 | fill | `#9aa0a6` | no | `credential-badge-img-cert1.svg` |
| `credential-badge-img-cert3` | / | credentials | img | 134x146 | — | 134x146 | 0.92:1 | fill | `#9aa0a6` | no | `credential-badge-img-cert3.svg` |
| `credential-badge-img-cert5` | / | credentials | img | 225x86 | 155x59 | 225x86 | 2.62:1 | fill | `#e8e9ea` | **yes** | `credential-badge-img-cert5.svg + credential-badge-img-cert5-alt.svg` |
| `credential-badge-irmo-chapin2024-1` | / | credentials | img | — | — | 170x170 | 1:1 | fill | `#9aa0a6` | no | `credential-badge-irmo-chapin2024-1.svg` |
| `credential-badge-mule-hide-certified` | / | credentials | img | 184x63 | 155x53 | 184x63 | 2.92:1 | fill | `#f2f2f3` | no | `credential-badge-mule-hide-certified.svg` |
| `credential-badge-roofing-contractors-columbia-2025-drk` | / | credentials | img | 170x170 | — | 170x170 | 1:1 | fill | `#b6bdc4` | no | `credential-badge-roofing-contractors-columbia-2025-drk.svg` |
| `credential-badge-select-shinglemaster-1` | / | credentials | img | — | — | 170x170 | 1:1 | fill | `#9aa0a6` | no | `credential-badge-select-shinglemaster-1.svg` |
| `credential-badge-the-states-best-of-2018` | / | credentials | img | 195x170 | — | — | - | fill | `#b6bdc4` | no | `credential-badge-the-states-best-of-2018.svg` |
| `credential-badge-verico-authorized-contractor` | / | credentials | img | 219x120 | 155x85 | 219x120 | 1.82:1 | fill | `#f2f2f3` | **yes** | `credential-badge-verico-authorized-contractor.svg + credential-badge-verico-authorized-contractor-alt.svg` |
| `cta-lockup` | / | new-door-cta | img | 308x61 | 308x61 | 308x61 | 5.05:1 | fill | `#2f2e2a` | no | `cta-lockup.svg` |
| `door-style-1` | / | door-styles | img | — | 300x300 | 1260x300 | 21:5 | cover | `#6da1d3` | **yes** | `door-style-1.svg + door-style-1-alt.svg` |
| `door-style-2` | / | door-styles | img | 270x200 | 300x300 | 1260x300 | 21:5 | cover | `#fdfcfa` | **yes** | `door-style-2.svg + door-style-2-alt.svg` |
| `door-style-3` | / | door-styles | img | 270x200 | 300x300 | 1260x300 | 21:5 | cover | `#fdfcfa` | **yes** | `door-style-3.svg + door-style-3-alt.svg` |
| `form-head-graphic` | / | hero | img | 330x52 | 288x45 | 427x67 | 6.37:1 | fill | `#56595b` | **yes** | `form-head-graphic.svg + form-head-graphic-alt.svg` |
| `hero-pillar-1` | / | hero | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#c6cbcd` | no | `hero-pillar-1.svg` |
| `hero-pillar-2` | / | hero | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#c6cbcd` | no | `hero-pillar-2.svg` |
| `hero-pillar-3` | / | hero | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#c6cbcd` | no | `hero-pillar-3.svg` |
| `icon-commercial` | / | quality-band | img | 114x91 | 114x91 | 114x91 | 1.25:1 | fill | `#fbfcfc` | no | `icon-commercial.svg` |
| `intro-bg` | / | intro | bg | 390x1036 | 768x659 | 1440x689 | 2.09:1 | 55% | `#c6cbcd` | **yes** | `intro-bg.svg + intro-bg-alt.svg` |
| `new-door-cta-bg` | / | new-door-cta | bg | 390x622 | 768x501 | 1440x508 | 2.83:1 | cover | `#2f2e2a` | **yes** | `new-door-cta-bg.svg + new-door-cta-bg-alt.svg` |
| `process-bg` | / | process | bg | 390x1570 | 768x1093 | 1440x789 | 1.83:1 | cover | `#242421` | **yes** | `process-bg.svg + process-bg-alt.svg` |
| `promise-bg` | / | promise | bg | — | 768x1567 | 1440x1190 | 1.21:1 | 100% | `#222222` | **yes** | `promise-bg.svg + promise-bg-alt.svg` |
| `promise-bg-mobile` | / | promise | bg | 390x1426 | — | — | - | cover | `#4694e4` | no | `promise-bg-mobile.svg` |
| `promise-media` | / | promise | img | 330x186 | 720x405 | 650x366 | 1.78:1 | fill | `#222222` | **yes** | `promise-media.svg + promise-media-alt.svg` |
| `credential-badge-duro-last-certified-installers` | /services | credentials | img | 225x120 | 155x83 | 200x107 | 1.87:1 | fill | `#f2f2f3` | **yes** | `credential-badge-duro-last-certified-installers.svg + credential-badge-duro-last-certified-installers-alt.svg` |
| `experience-bg` | /services | experience-band | bg | 390x502 | 768x437 | 1440x469 | 3.07:1 | cover | `#373736` | **yes** | `experience-bg.svg + experience-bg-alt.svg` |
| `quality-icon-1` | /services | quality-band | img | 115x115 | 115x115 | 115x115 | 1:1 | fill | `#ebe9e8` | no | `quality-icon-1.svg` |
| `quality-icon-2` | /services | quality-band | img | 115x115 | 115x115 | 115x115 | 1:1 | fill | `#ebe9e8` | no | `quality-icon-2.svg` |
| `services-banner-image` | /services | services-banner | img | 390x886 | 768x784 | 1440x732 | 1.97:1 | fill | `#7d868f` | **yes** | `services-banner-image.svg + services-banner-image-alt.svg` |
| `services-detail-image` | /services | services-detail | img | 330x248 | 720x540 | 650x488 | 1.33:1 | fill | `#d1d2d3` | **yes** | `services-detail-image.svg + services-detail-image-alt.svg` |
| `services-pillar-1` | /services | services-banner | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#7d868f` | no | `services-pillar-1.svg` |
| `services-pillar-2` | /services | services-banner | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#7d868f` | no | `services-pillar-2.svg` |
| `services-pillar-3` | /services | services-banner | img | 106x106 | 132x132 | 208x208 | 1:1 | cover | `#7d868f` | no | `services-pillar-3.svg` |
| `testimonial-quote-mark` | / | testimonials | img | 82x63 | 82x63 | 82x63 | 1.30:1 | fill | `#f6f7f8` | no | `testimonial-quote-mark.svg` |
| `why-us-1` | / | why-us | img | 328x353 | 322x346 | 398x428 | 0.93:1 | fill | `#f9fafa` | no | `why-us-1.svg` |
| `why-us-2` | / | why-us | img | 328x353 | 322x346 | — | - | fill | `#fbf9f4` | no | `why-us-2.svg` |
| `why-us-3` | / | why-us | img | 328x353 | — | 398x428 | 0.93:1 | fill | `#f9fafa` | no | `why-us-3.svg` |
| `why-us-4` | / | why-us | img | 328x353 | — | 398x428 | 0.93:1 | fill | `#e1e2e1` | no | `why-us-4.svg` |
| `why-us-5` | / | why-us | img | 328x353 | 322x346 | 398x428 | 0.93:1 | fill | `#e1e2e1` | no | `why-us-5.svg` |
| `logo-footer` | all | footer-nap | img | 330x111 | 471x158 | 427x143 | 2.99:1 | fill | `#222222` | **yes** | `logo-footer.svg + logo-footer-alt.svg` |
| `logo-header` | all | header | img | 130x99 | 153x117 | 260x198 | 1.31:1 | fill | `#9fc9f0` | **yes** | `logo-header.svg + logo-header-alt.svg` |

## DELETED — inventoried, deliberately not filled

| slot ID | route | section | 1440 | why |
|---|---|---|---|---|
| `deleted-locations-icon-residential` | / | deleted-locations | 116x109 | Locations-grid residential icon; the band is deleted by D-02. |
| `deleted-locations-map` | / | deleted-locations | 650x381 | Service-area map graphic; D-02 scrubs the locations grid entirely. Our D-08 map is a live keyless iframe, not an image. |
| `deleted-team-bg` | / | deleted-team | 1440x724 | Staff band background; the band is deleted (D-09 photos, D-17 names). |
| `deleted-team-headshot-1` | / | deleted-team | 204x251 | Named staff headshot; we may not reuse it and may not invent a replacement person. |
| `deleted-team-headshot-2` | / | deleted-team | 204x251 | Named staff headshot; see above. |
| `deleted-team-headshot-3` | / | deleted-team | 204x251 | Named staff headshot; see above. |
| `deleted-gallery-01` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-02` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-03` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-04` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-05` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-06` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-07` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-08` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-09` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-gallery-10` | /services | deleted-gallery | 301x169 | Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01). |
| `deleted-megamenu-thumb` | all | header | — | Hidden mega-menu testimonial thumbnails. 0x0 at every breakpoint (they never enter the viewport) and our nav has no mega-menu. |
| `form-select-chevron` | all | callback-form | 360x46 | Generic UI chevron, not a brand asset. Satisfied by lucide-react ChevronDown (TAKE) — no image file ships. |

## Tally

| | count |
|---|---|
| slots inventoried | 65 |
| REPLACE | 47 |
| DELETED | 18 |
| placeholders generated | 66 |
| REPLACE assets downloaded | **0** |


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
