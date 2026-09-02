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


## Opened at Prompt 5+9 (tokens, randomized palette, shared shell)

### 8. The palette — winning seed and all five candidate seeds

Reproduce any of them exactly:

```bash
node ../_shared/harness/src/palette.mjs --seed <n>      # one candidate
node ../_shared/harness/src/palette.mjs                 # the whole selection
node ../_shared/harness/src/palette.mjs --emit          # the winner's theme block
```

**master seed `123`.** Five rolls, **0 rejected**, five survivors — the ramp is constructed
so that every candidate clears the hard constraints, so the auto-selector is choosing among
five valid palettes rather than salvaging one.

| seed | scheme | primary hue | accent hue | neutral C | CTA contrast | CTA chroma | |
|---|---|---|---|---|---|---|---|
| 787251 | split-complementary | 266 | 116 | 0.048 | 5.18 | 0.1192 | |
| **178543** | **split-complementary (+150°)** | **129** | **279** | **0.054** | **5.58** | **0.1655** | **WINNER** |
| 495315 | triadic | 314 | 74 | 0.048 | 5.41 | 0.1103 | |
| 231361 | triadic | 285 | 165 | 0.035 | 5.01 | 0.1105 | |
| 375791 | analogous | 258 | 228 | 0.047 | 5.17 | 0.1014 | |

**The selection rule was never touched.** Within a master seed the winner is the survivor
with the highest CTA contrast against its background, ties to the lowest seed — 178543 wins
that on its own numbers. What was steered is the master seed, which is the sanctioned lever.

**Master seeds tried: 123.** Five of them put the winner inside this site's assigned
105-130 hue window, and four were rejected before 123 was taken:

| master seed | winner | primary | accent | why not |
|---|---|---|---|---|
| 52 | 433416 | 127 | **7** | accent hue 7 is red — the same arc the gate pins the semantic **error** colour to (5-55). A red call CTA sitting beside a red form-error state is a defect, not a palette. |
| 95 | 969479 | 124 | **4** | same |
| 96 | 62109 | 105 | 285 | primary hue 105 sits exactly on the window boundary, and a 5.8% neutral tint at hue 105 puts the whole neutral ramp on a khaki cast (`#e7e4b8`) that reads as aged paper rather than a tinted grey |
| 103 | 286405 | 121 | **1** | accent hue 1 is red — see 52 |
| **123** | **178543** | **129** | **279** | **taken** — mid-window, and a violet-indigo accent that collides with nothing |

The magenta bias the brief warns about is real and visible above: at a fixed OKLCH L the
lowest luminance sits near hue 300-360, so the auto-selector keeps pulling toward that arc.
Three of the five in-window master seeds landed on a red accent for the same reason.

### 9. CHROMA ORDERING, measured — and the ONE RULE it produces

sRGB / OKLCH chroma of the two rotated families, which is what `cta-primacy` ranks:

| token | hex | OKLCH C | painted saturation (max-min)/255 |
|---|---|---|---|
| `--color-accent` (call CTA) | `#5a5bc8` | **0.1655** | **0.431** |
| `--color-accent-deep` (hover) | `#404092` | 0.1318 | 0.322 |
| `--color-primary` (structure) | `#232c19` | 0.0341 | 0.075 |
| `--color-neutral-900` (dark band) | `#0e1a00` | 0.0528 | 0.102 |

**Accent is 4.9x more chromatic than primary.** That ordering is not an accident of the
roll — it is enforced by the role mapping in `harness.config.mjs`, because the reference's
own palette has it the wrong way round: its brand blue (`#1788fb`, C 0.1949) is MORE
chromatic than its yellow CTA fill (`#ffce51`, C 0.1489). Held literally, Premiere Roofing's
palette fails our own `cta-primacy` rule on every route for any primary-filled button.

**THE RULE, stated in the shell and binding on every section build:**

> **Exactly one filled chromatic action exists on this site: the call CTA (`.action-call`,
> `--color-accent`). Every other action is `.action-quiet` — underlined text in
> `--color-primary` at chroma 0.075.** No section may introduce a second filled accent
> button. If `cta-primacy` ever fires, the fix is the competing action, never the headings
> or the body copy.

The `.action-call` class is deliberately NOT named `btn` or `button`: `ctaSelector` in
`harness.config.mjs` matches `[class*=btn]` and `[class*=button]`, so any decorative element
carrying either substring would be scored as an action by the render-truth CTA checks.

### 10. The accent's LIGHTNESS is an accessibility correction, not a rotation artefact

`referenceRamp.accent` holds the reference blue's hue and chroma but lowers its lightness
from OKLCH L 0.6312 to **0.5291**, which gamut-clips chroma from 0.1949 to 0.1659.

The reference ships **white on `#1788fb` at 3.53:1** and **blue on `#ffce51` at 2.39:1**.
Both are below WCAG AA and D-19 sets AA. There is no lightness at which a LIGHT accent can
carry dark AA text *and* still separate from a white page at 3:1 — the two requirements
point in opposite directions — so the accent has to go darker. L 0.5291 is the highest
lightness at which a white label clears 4.5:1 (it lands at 5.58:1).

This is the same class of decision as `docs/behavior/01` adding the `aria-expanded` the
reference omits: correcting an accessibility defect rather than cloning it. **Every other
entry in the ramp holds its L and C exactly.** Recorded here so no later prompt "restores"
the reference's lightness and reintroduces a sub-AA CTA.

### 11. Two permanent structural floors in the shell, both from D-01 / D-02

One `ITERATION_CAP` attempt was spent on the shell and it closed the header and the legal
strip. What remains is the site-size difference already declared as a length exemption in
`harness.config.mjs`, now showing up in geometry as well as in character count.

| band | ref | 390 | 768 | 1440 | status | residual |
|---|---|---|---|---|---|---|
| `header` | `s00-header` | **0.00%** | 3.62% | 3.87% | **PASS** | `buttons` ref 9 / ours 1 at 768+ — the nine-item mega-menu. At 390 the reference collapses to a single hamburger, so the band scores an exact 0. |
| `footer-legal` | `s14-footer` | 0.28% | 0.28% | 0.52% | **PASS** | `box.h` 67 vs 59 at 1440 |
| `footer-nap` | `s13` | **5.83%** | **7.07%** | **7.03%** | **FLOORED** | `buttons` ref 7 / ours 1 (85.7%), `box.h` ref 1107 / ours 426 (61.6%), `padTop` ref 117 / ours 100 (14.5%) |

**Hypothesis for the `footer-nap` residual, and why it is not fixable:** the reference's fat
footer is 1107px tall at 1440 because it repeats the nine-item mega-menu as four link columns
plus a locations column — a 44-destination site map, 2013 characters. D-01 fixes this site at
five routes and forbids blog, gallery, FAQ, careers, booking and per-service routes; D-02
scrubs the locations tree. Closing `box.h` or `buttons` means inventing roughly forty
destinations the decision register has already refused. It is the identical cause as the
`*::footer-nap` length exemption, which is why that exemption exists.

`padTop` 117 -> 100 is the one genuinely elective part: 117px is not one of the 14 named
spacing steps, and the nearest existing step is used with the 14.5% delta recorded rather
than a bespoke `--spacing-*` minted for a single band.

**Do not spend a second iteration on `footer-nap`.**

### 12. One SHARED-INSTRUMENT fix: font-family is now compared case-insensitively

`../_shared/harness/src/diff.mjs`, `BLOCKING_CATEGORICAL.fontFamily`, now lowercases and
strips quotes before comparing.

CSS font-family names are case-insensitive per spec, so `hind` and `Hind` are one face. The
reference's theme declares `hind, sans-serif`; `next/font/google` emits the canonical Google
name, `Hind, "Hind Fallback", system-ui, sans-serif`. Compared case-sensitively that scored
**100% divergence on this field in every single band** — 4.35pp of a 5% budget, permanently,
for a difference that does not exist. It was the largest blocking residual on the header and
on both footers, and would have been on all 46 ADAPTED rows.

`node test/selftest.mjs` in the harness package: **14 passed, 0 failed** after the change.

This is an instrument correctness fix, not a site-specific accommodation, and it is the only
line of shared code this site has touched. The governing rule still holds: **share the
instrument, never the output.**

### 13. `call-bar` is never scored by `diff.mjs`, and is verified by hand instead

A-9 collapses NOVEL rows to a single pass, and `diff.mjs` emits ours-only rows at the
**canonical breakpoint (1440) only**. The mobile call bar is deliberately absent from the DOM
above 768 (spec 03), so it can never appear in a 1440 capture and the harness reports no row
for it at all — silently, with no warning.

That is an instrument gap, not a build defect, and it is recorded rather than worked around.
Token conformance for the band was run directly against the 390 captures on all five routes:

```
loadTokens + tokenViolations over .harness/cap/ours/*-390/meta.json
  header 0 · footer-nap 0 · call-bar 0 · footer-legal 0   — on all five routes
```

**0 violations on every shell band at 390, `call-bar` included.** The bar's painted result is
covered by the two render-truth gates, which DO run at 390: `contrast.mjs` 410 scored /
0 FAIL / 0 UNMEASURABLE and `rendertruth.mjs` 0 findings. `cta-primacy` at 390 can only be
satisfied by the call bar, because it is the only `tel:` button on the page at that width.

### 14. `<BusinessMap>` is BUILT but not yet MOUNTED

Prompt 5's route stubs render the shell and nothing else, so the component has no instance on
any page. Spec 07's acceptance criterion 1 — `[data-section$="-map"].firstElementChild` is the
bypass anchor — is therefore satisfied **by construction in the JSX** and is not yet asserted
against a built DOM. It becomes a runnable assertion at Prompt 6, when the lead mounts
`service-map` on `/` and `contact-map` on `/contact`. Three sibling sites shipped this band as
a keyboard trap; the assertion is not optional at Prompt 6.

## Still not opened

- **Section structural residuals** for the 43 bands the build wave has not reached. One fix
  attempt each (`ITERATION_CAP` = 1, A-2), then the residual and a hypothesis land here.
