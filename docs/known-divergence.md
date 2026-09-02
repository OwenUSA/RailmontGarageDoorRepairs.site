# docs/known-divergence.md — permanent floors

Check this file before starting any fix. Nothing listed here is a fixable divergence and no
iteration is ever spent on one.

## Opened at Prompt 1

### 1. Colour divergence from the reference is INTENTIONAL and permanently excluded (A-8)

The palette is randomized at token-write time (Prompt 5, merged 5+9), so our resolved
colours will never match Premiere Roofing's. Colour-valued fields — resolved colour,
background-colour, border-colour, gradient stops, shadow colour — are stripped from the
structural comparator. Geometry and typography, and the non-colour parts of borders and
shadows (widths, offsets, blur, spread, radii), are all still measured.

**Excluded from every diff, every threshold, and every future iteration. Do not reopen.**

### 2. Advisory fields never fail a row (A-12)

`innerCount`, `innerRows`, `innerCols` and `position` are computed and printed as a trailing
`advisory:` note only. They compare our clean markup against a Bootstrap-5 column tree and
are unclosable by construction. Do not restructure markup to imitate the reference's
nesting.

### 3. NO FONT SUBSTITUTION FLOOR IS BOOKED ON THIS SITE

Stated positively, because the default assumption is wrong here.

The reference's only real faces are **Hind** (body) and **Teko** (display). Both are Google
Fonts under the **OFL**, both genuinely load (`document.fonts` reports them `loaded` at
multiple weights on all five pages), and both are available through `next/font/google`. We
use the **same families**, not substitutes. There is therefore **no text-metric delta to
excuse**, and D-11 does not apply.

`Montserrat`, `Bebas Neue`, `Nanum Pen`, `var(--font)` and the Bootstrap `--bs-*-font-family`
variables all appear in the reference CSS with **zero `@font-face` rules, zero loaded faces
and zero computed usages**. They are phantoms. **Booking a floor for any of them is
forbidden** — a sibling site booked one for what turned out to be its hosting control
panel's admin-bar font and permanently excused a heading that should have converged.

If a later prompt finds a heading that will not converge, the cause is not the font.

## Opened at Prompt 2+3+4

### 4. Placeholder-blocked sections

47 REPLACE slots ship as generated SVG placeholders (`public/placeholders/`, 66 files
including `-alt` crops for the 21 slots whose aspect changes between breakpoints). Nothing
belonging to Premiere Roofing was downloaded. Per CLAUDE.md, a section blocked by a
placeholder asset is **reported separately with the placeholder area excluded from the
measurement**, and no iteration is ever spent closing one.

Bands carrying at least one placeholder slot, and therefore floored on image content until
Prompt 10/11 hands the generated assets back:

| route | band | placeholder slots |
|---|---|---|
| all | `header`, `footer-nap` | `logo-header`, `logo-footer` |
| `/` | `hero` | `hero-pillar-1..3`, `form-head-graphic` |
| `/` | `intro` | `intro-bg` |
| `/` | `door-styles` | `door-style-1..3` |
| `/` | `why-us` | `why-us-1..5` |
| `/` and `/services` | `process` | `process-bg` |
| `/` | `testimonials` | `testimonial-quote-mark` |
| `/` | `promise` | `promise-bg`, `promise-bg-mobile`, `promise-media` |
| `/` | `new-door-cta` | `new-door-cta-bg`, `cta-lockup` |
| `/` and `/services` | `credentials` | 16 `credential-badge-*` chips |
| `/services` | `services-banner` | `services-banner-image`, `services-pillar-1..3` |
| `/services` | `quality-band` | `quality-icon-1`, `quality-icon-2`, `icon-commercial` |
| `/services` | `services-detail` | `services-detail-image` |
| `/services` | `experience-band` | `experience-bg` |

**Not blocked, and this is a correction:** `page-head` on `/about`, `/services`, `/contact`
and `/privacy`. `docs/sections.md` originally described those bands as carrying "a roofing
photograph". The Prompt 2 asset probe finds none — zero background images on `/about-us` and
`/privacy-policy`, and the background images on the other two belong to other bands. Those
four bands are solid strips and can converge with nothing excluded.

### 5. Near-white placeholders are repainted, and the honest hex is kept

18 slots (25 files) sampled a dominant colour above 0.88 luminance from the Prompt 1
captures. `assets/INVENTORY.md` keeps the **sampled hex**, because that is the measurement.
`scripts/placeholder-guard.mjs` repaints the **files** to `#6f7276`.

This is a measurement decision, not an aesthetic one. A placeholder painted `#fdfcfa` under
body text sits at roughly 1.05:1 against a white page ground, and `rendertruth.mjs` then
reports the band `UNMEASURABLE` rather than failing it — the band's real painted contrast is
never scored and the gap reads as a pass. Two sibling sites hit exactly that. `#6f7276`
clears 4.5:1 against both white and near-black, so whichever way the Prompt 5 palette lands
every one of these bands stays measurable.

Seven `credential-badge-*` slots carry the fallback `#9aa0a6` rather than a sample: they sit
below the fold inside the `.cert-slider` and no Prompt 1 section screenshot contains them.
Recorded rather than guessed.

### 6. The five reference carousels are rebuilt as static bands

`.slick-pricing.mcs-slider`, `.roofing-slider`, `.cust-slider` and `.cert-slider` on `/`,
plus `.cert-slider` on `/services`. All five ship as static bands — one strong image, or a
wrapped row of chips for the badge grids.

**The bands stay ADAPTED.** This is a build decision inside a retained band, like scrubbing
the locations column out of the footer, not a class change. The structural cost is confined
to `innerCount` / `innerRows` / `innerCols`, which A-12 makes **advisory** — they never
contribute to a deviation percentage. Box geometry, type scale and spacing rhythm are
unaffected. If a residual on one of these bands is ever dominated by a *blocking* field, that
is a real defect and gets the one `ITERATION_CAP` attempt like any other row.

### 7. Two length exemptions, both forced by D-01 and D-02

`header` (ref 2159 / 2298 / 2622 chars, ours 58) and `footer-nap` (ref 2013, ours 438), on
all five routes — 10 rows, 2 rules, declared in `harness.config.mjs` under `lengthExempt`.

The reference header's `textContent` is a nine-item mega-menu spelling out a 44-destination
site map, and the fat footer repeats it. D-01 fixes this site at five routes and forbids
blog, gallery, FAQ, careers, booking and per-service routes; D-02 scrubs the locations tree.
The block length is a function of site size, and site size is fixed elsewhere in the
contract, so the ±10% rule cannot apply.

**Every other block is held to ±10%**, including the 23-character `credentials` band (0.0%),
the Formidable-backed `callback-form` (+7.7%, not exempted although the brief allows it) and
the 3277-character privacy body (+6.3%). 22 blocks missed on the first draft and all 22 were
rewritten rather than excused. Full reasoning in `docs/content-divergence.md`.

**These two rows are permanently exempt. Do not reopen them and do not spend an iteration
on them.**

## Not yet opened

- **Palette seeds** (winning seed + all five candidate seeds) — recorded here by Prompt 5.
- **Structural residuals** — one fix attempt each (`ITERATION_CAP = 1`, A-2), then the
  residual and a hypothesis are written here.
