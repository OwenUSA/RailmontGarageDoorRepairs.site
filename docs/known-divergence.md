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

## Opened at Prompt 6+7 (lead builds hero + both maps, then one 4-wide wave)

### 15. `<BusinessMap>` IS NOW MOUNTED, and the bypass assertion has been RUN

Item 14 is closed. `service-map` is mounted on `/` at zoom 13 and `contact-map` on `/contact`
at zoom 15, and spec 07's first acceptance criterion has been executed against the BUILT DOM
rather than read off the JSX:

```
document.querySelector('[data-section$="-map"]').firstElementChild === the bypass anchor
/         firstElementChild A.map-bypass  href "#after-service-map"   target exists: true
/contact  firstElementChild A.map-bypass  href "#after-contact-map"   target exists: true
```

Both frames are `loading="lazy"`, both carry an explicit `title`, both are addressed by
`MAP_COORDS` alone — `https://www.google.com/maps?q=35.0074,-80.9451&z=13|15&output=embed` —
and the fictional address never reaches a geocoder (D-07). Three sibling sites shipped this
band as a keyboard trap because the spec existed and was never executed. It has now been
executed.

### 16. One render-truth defect, found by `contrast.mjs` on the wave's first sweep

Not iteration-capped (A-13), fixed rather than floored. The first contrast run over the built
sections read **1268 scored, 21 FAIL**, and every failure was one rule:

| route | bp | ratio | fg | bg | text |
|---|---|---|---|---|---|
| `/` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Talk to us about your door" |
| `/` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Free estimate" |
| `/about` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Call (803) 555-0164" |
| `/about` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Request a callback" |
| `/services` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Get it looked at" |
| `/services` | 1440 | **1.24** | `#232c19` | `#0e1a00` | "Get it looked at" / "Call ..." |

`.action-quiet` paints `--color-primary` `#232c19`, which is 1.24:1 against the `.band-dark`
ground `#0e1a00`. Six of the site's secondary actions — including two `tel:` links — were
effectively invisible on three routes. This is the Atlas failure mode exactly: a value that is
correct in the token file and wrong where it is painted.

Fixed with ONE rule in the shell rather than six per-band overrides:

```css
.band-dark .action-quiet { color: var(--color-surface); }
```

The surface colour has chroma 0, so the accent call CTA (chroma 0.1655) keeps chroma dominance
and `cta-primacy` is unaffected. Re-run: **1268 scored, 0 FAIL, 0 UNMEASURABLE.**
`rendertruth.mjs`: **0 findings.**

A green shell did not mean green sections. The shell passed both gates at Prompt 5 because
header and footer were the only components carrying words, and neither of them puts a quiet
action on a dark band.

### 17. `buttons` measures the reference's WRAPPER PAIR, not its number of actions

**This is the single largest structural residual on the site and it is an instrument artefact
of exactly the kind A-12 already ruled advisory for `innerCount`.** It is recorded here rather
than fixed, because fixing it means renaming `.action-quiet`, which is a standing design
decision this build must not reverse on its own.

Across the 41 failing ADAPTED rows the residual decomposes as:

| field | summed deviation over failing rows | share |
|---|---|---|
| `buttons` | 3886 | 65% |
| `box.h` | 1977 | 33% |
| `padTop` | 73 | 1.2% |
| `padBottom` | 4 | 0.1% |

`buttons` is `cfg.ctaSelector` = `a[href^="tel:"], button, [class*=btn], [class*=button]`,
counted over visible elements. Inspected directly in the reference at 1440:

```
.main.section.sect-page_intro   ->  DIV.section-btn , A.main-btn c-yellow          = 2
.plan.section                   ->  DIV.section-btn sb-center d-flex , A.main-btn   = 2
.pricing-section                ->  DIV.buttons , A.main-btn   x3                   = 6
.roofing.section                ->  5x A.main-btn , DIV.section-btn , A.main-btn    = 7
```

The theme wraps every action in a `div` whose class contains `btn`, so ONE visible action
scores TWO. Our clean markup renders one action as one element, and `.action-quiet` matches
none of the four selector arms. Ref 2 vs ours 0 is therefore not a missing action — it is a
missing wrapper div plus a class-name mismatch — and it costs a **flat 100/23 = 4.35pp** on
every band that carries a single secondary action. That is 87% of a 5% budget spent before
geometry is looked at, which is precisely the argument A-12 made about `innerCount`.

**Two options, and the recommendation.** Ours could be made to count by giving the secondary
action a class containing `btn` or `button`. That was deliberately NOT done at Prompt 5: the
class is named `.action-quiet` because `ctaSelector` matches those substrings and would then
score decorative elements as actions. Even counted, ours would be 1 against the reference's 2
(dev 50%, 2.17pp), which is enough to clear most rows. **The recommendation is to make
`buttons` ADVISORY alongside `innerCount`/`innerRows`/`innerCols`/`position`, not to rename
the class** — it measures the same page-builder nesting for the same reason. That is a
shared-instrument amendment and is not taken unilaterally here.

**SUPERSEDED at Prompt 10+11.** The recommendation was taken: `buttons` is now ADVISORY in
the shared harness, `vis()` dedupes nested matches by containment, and `.action-quiet` was
NOT renamed. All 41 of these rows now PASS. See item 23 for the re-measured table and for
why the naming decision is load-bearing. The analysis above is kept verbatim as the record
of how the artefact was diagnosed.

### 18. Correction to item 6 — the rebuilt carousels cost `box.h`, not only advisory fields

Item 6 stated that rebuilding the five jQuery carousels as static bands confined the
structural cost to `innerCount`/`innerRows`/`innerCols`, which A-12 makes advisory. **That was
wrong, and the measurement says so.** A slider shows one row of assets; a static wrapped row
of the SAME assets at the SAME recorded slot dimensions is several rows tall:

| band | bp | ref `box.h` | ours | dev |
|---|---|---|---|---|
| `credentials` (`/services` s10) | 390 | 273 | 1949 | 86.0% |
| `credentials` (`/` s12) | 768 | 228 | 941 | 75.8% |
| `credentials` (`/services` s10) | 1440 | 204 | 550 | 62.9% |
| `why-us` (`/` s05) | 768 | 644 | 1750 | 63.2% |

The height is a direct consequence of two contract rules that both hold: D-14 requires the 16
badge slots to ship as `TODO(fact)` chips **at the reference's own dimensions**, and item 6
forbids rebuilding the slider. Shrinking the chips to make the band shorter would break D-14;
rebuilding the slider would break item 6. **The band height is therefore a floor, not a
defect**, and the one `ITERATION_CAP` attempt is deliberately not spent on it.

### 19. The PAGE height rows are dominated by two decisions already in the contract

| route | ref page | ours | delta |
|---|---|---|---|
| `/services` | 7754 | 8061 | **4.0% PASS** |
| `/` | 10286 | 7952 | 22.7% |
| `/privacy` | 3343 | 2684 | 19.7% |
| `/about` | 6885 | 4758 | 30.9% |
| `/contact` | 3310 | 2099 | 36.6% |

Decomposed on `/contact` at 1440, where the delta is worst (1211px total):

- `footer-nap` ref 1107 vs ours 426 = **681px, 56% of the whole gap.** This is the item 7
  length exemption: the reference footer repeats a 44-destination site map and D-01 fixes this
  site at five routes. Already permanently exempt; not reopened.
- `callback-form` ref 1597 vs ours 781 = **816px.** Formidable Forms + Formidable Pro +
  reCAPTCHA, 17 to 44 inputs, replaced by five fields with no backend (D-03, D-05).

Both are contract-mandated content differences, not build defects. `/` and `/services` carry
the same footer floor plus the three DELETED bands (locations D-02, staff D-09/D-17, gallery
D-01). **No fix attempt is spent on the PAGE rows.**

### 20. What the band system does, and the padding deltas it books

Every reference band computes the same categorical row — `display block`, `radius 0px`,
`shadow none`, `gridCols none`, `gap normal`, `flexDir row`, `textTransform none`,
`borderStyle none`, `overflow visible`, Hind 18/400, letter-spacing 1.8, line-height 21.6 —
and 11 of the 23 blocking fields are categorical, so one miss costs 4.35pp. The `.band` class
therefore paints exactly that row and every band root in the build is a plain block carrying
nothing but padding; all flex, grid and gap live on inner wrappers. Verified: all 20 band
components declare `<section className="band …" data-section={section.id}>` and not one
carries an inline style.

Band padding is the reference's own value **per band, per breakpoint**, read from
`.harness/cap/ref/*/meta.json` and tabulated in `docs/ref-targets.md` — a uniform value would
have fixed three bands and broken the eight that are correctly 0/0. No spacing token was
minted. Where a reference value is not one of Prompt 5's 14 steps it is composed by `calc()`
from steps that are, and the residual is booked here:

| pattern | reference | painted | delta |
|---|---|---|---|
| `.pad-head` (4 page-head strips) | 47 | 50 | +6.4% |
| `.pad-promise` top at 390 | 92 | 90 (`60+30`) | −2.2% |
| `.pad-intro` top at 390 | 150 | 150 (`100+50`) | exact |
| `.pad-intro` top at 768 | 80 | 80 (`40+40`) | exact |
| `.pad-process` bottom at 768/1440 | 200 | 200 (`100*2`) | exact |
| `.pad-promise` top at 768/1440 | 350 | 350 (`100*3+50`) | exact |

Summed `padTop` deviation across all 41 failing rows is 73 and `padBottom` is 4 — 1.3% of the
total residual. Padding is not what is failing these rows.

### 21. `.form-card` was renamed `.form-panel` before it could be measured

The callback form's container was first written as `.form-card`. The probe counts
`[class*=card],article` as the `cards` field and **every reference band on this site is
`cards:0`**, so the class would have scored a phantom card on `hero`, `services-banner` and
`callback-form` at a flat 4.35pp each. Caught by a grep over the wave's output before the
first capture. Every other band was checked the same way: zero `card` classes, zero
`<article>`, zero `btn`/`button` class names, zero `.action-call` outside the shell.

### 22. Three placeholder slots used off their recorded route, and one slot deliberately unused

- `/services` `risk-band` renders `promise-media.svg`, which INVENTORY records against `/`
  `promise`. Both slots are placeholders at similar aspect and the file is replaced at Prompt
  10/11 either way; recorded so the asset-prompt pass does not double-count the slot.
- `intro-bg`, `process-bg` and `experience-bg` are **deliberately not mounted.** All three are
  band backgrounds, and text over a `url()`-backed rectangle reports `UNMEASURABLE` from
  `contrast.mjs` rather than failing — which reads as a pass. The bands render on solid token
  grounds instead and are fully measurable. This is why the contrast sweep shows
  **0 UNMEASURABLE** across 1268 scored pairs.
- The 16 `credential-badge-*.svg` files are not rendered as images at all. A drawn badge
  implies a credential we do not hold (D-14); the band ships text-only `TODO(fact)` chips at
  the recorded dimensions.


## Still not opened

- ~~Section structural residuals for the 43 bands the build wave has not reached.~~ **Closed
  at Prompt 6+7.** All 46 ADAPTED and 9 NOVEL bands are built, wired and measured; the
  residuals and their hypotheses are items 17 to 22 above. No band remains unbuilt.

## Opened at Prompt 10+11 (asset prompts, then the trimmed acceptance sweep)

### 23. The `buttons` artefact was fixed IN THE INSTRUMENT, and 41 floored rows cleared

Item 17 diagnosed `buttons` as measuring the reference theme's **wrapper pair**
(`<div class="section-btn"><a class="main-btn">` = 2 for one visible action), recommended
making it ADVISORY, and explicitly declined to close it site-side. Both halves of that call
have now been validated by measurement.

The shared harness was amended by the programme lead, not by this site:

- `buttons` joins `innerCount` / `innerRows` / `innerCols` / `position` as **ADVISORY** — it
  is computed and printed as a trailing note, never contributing to a deviation percentage.
- `vis()` now **dedupes nested matches by containment**, so the wrapper/anchor pair counts 1
  rather than 2. That also corrected `cards`, which had the identical exposure.

**Re-measured, full sweep, same build:**

| | Prompt 6+7 | Prompt 10+11 |
|---|---|---|
| rows | 160 | 160 |
| FAIL | 55 (41 section + 14 PAGE) | **14, all PAGE** |
| PASS | 102 | **143** |
| worst ADAPTED row | 8.7% | **3.91%** (`/services` `credentials` @390) |
| BLOCKED | 0 | 0 |

**Every ADAPTED and NOVEL section row on all five routes now passes.** `footer-nap`, floored
at 5.83 / 7.07 / 7.03% in item 11, now measures 3.5% and passes on its own numbers; only its
*length* exemption (item 7) remains, which is a content rule and not a geometry one. The 14
remaining FAILs are the whole-PAGE height rows of item 19, whose causes — the exempt fat
footer and the Formidable-Pro form we replaced with five fields — are contract-mandated.

### 24. `.action-quiet` is NOT renamed, and the reason is a gate, not taste

Recorded explicitly because it looks like free deviation-percentage and is not.

`cfg.ctaSelector` is `a[href^="tel:"], button, [class*=btn], [class*=button]`. Any class name
containing the substring `btn` or `button` is scored as an **action** by the render-truth CTA
checks. `.action-quiet` was named at Prompt 5 to sit outside that match on purpose.

Renaming it to `.btn-quiet` would have added roughly 2.17pp of `buttons` credit per band — and
would simultaneously have enrolled every secondary action in `cta-primacy`, whose entire job is
to keep the call CTA the most saturated element on the page. That is trading a real gate for a
cosmetic metric. `docs/known-divergence.md` 9 states the rule the class exists to enforce:

> Exactly one filled chromatic action exists on this site: the call CTA (`.action-call`,
> `--color-accent`). Every other action is `.action-quiet`.

**Do not rename `.action-quiet`.** The metric it was "failing" no longer exists.

### 25. What the carousel rebuild actually costs — item 6's correction STANDS

Item 18 corrected item 6, and the correction survives the instrument change intact, which is
the point: it was never an advisory-field artefact.

Rebuilding the five jQuery carousels as static bands lands on **`box.h`, a BLOCKING field** —
`credentials` on `/services` measured ref 273 vs ours 1949 at 390. A slider shows one row of
assets; the same assets at the same recorded slot dimensions, wrapped, are several rows tall.
**D-14 requires the 16 badge slots at the reference's own dimensions and item 6 forbids
rebuilding the slider**, so the height is the arithmetic consequence of two contract rules that
both hold. It is a floor, not a defect, and no iteration is spent on it.

That this band still lands at 3.91% — the worst ADAPTED row on the site, and passing — is
because the rest of its blocking fields are exact.

### 26. NO FONT-SUBSTITUTION FLOOR — restated at the end of the chain

Item 3 stated it at Prompt 1 and nothing since has changed it. **Hind** and **Teko** are the
reference's own real faces, both Google/OFL, both loaded through `next/font/google`. We use the
*same families*, not lookalikes. D-11 does not apply, there is no text-metric delta to excuse,
and **no floor is booked for any font on this site.** `Montserrat`, `Bebas Neue`, `Nanum Pen`
and the `--bs-*-font-family` variables in the reference CSS have zero `@font-face` rules and
zero computed usages; booking a floor for one of them is forbidden.

### 27. COLOUR — permanently excluded, restated at the end of the chain (A-8)

Item 1 stands unchanged and terminal. The palette is randomized at token-write time, so our
resolved colours will never match the reference's. Resolved colour, background-colour,
border-colour, gradient stops and shadow colour are **stripped from the structural
comparator**; geometry, typography and the non-colour parts of borders and shadows are all
still measured. Winning seed **178543**; candidate seeds **787251 / 178543 / 495315 / 231361 /
375791** under master seed **123** (item 8 carries the full table and the four rejected master
seeds).

**Excluded from every diff, every threshold and every future iteration. Do not reopen.**

### 28. Three defects the acceptance sweep found and FIXED (not floored)

None is a divergence from the reference, so `ITERATION_CAP` does not apply to any of them.

1. **No `<link rel="canonical">` on any of the five routes.** Caught only because gate 13 was
   verified over HTTP instead of by reading `app/layout.tsx` — the config *looked* complete.
   Fixed with a self-referencing `alternates.canonical` per route, resolved against
   `metadataBase`. Verified over HTTP on all five. Titles were checked at the same time for the
   sibling's `title.template` double-brand defect: absent here, the template is `%s` and each
   route names the brand exactly once.
2. **Two hours strings on `/contact`.** The band and footer rendered
   `7 days, 7:00 AM – 7:00 PM` (en dash) while the route's meta description rendered
   `7:00 AM to 7:00 PM`. Exactly the drifted-duplicate class a sibling shipped. The description
   now uses the canonical form, and the NAP literals that had been repeated inside
   `content/copy.ts` — phone ×2, address ×3, hours ×3, service area ×3, plus five
   `Call (803) 555-0164` CTA labels — were replaced with references to the `business` object,
   so each fact exists **once** in the codebase.
3. **`pnpm start` could not start the production server at all.** `scripts/start-standalone.mjs`
   imported `.next/standalone/server.js`, which `next.config.ts` deliberately does not emit on
   Windows (the standalone tracer symlinks into the pnpm store and dies with EPERM). The script
   now falls back to `next start` against the same `.next` build when the standalone entry is
   absent. `output: 'standalone'` is untouched and still applies on Linux, so the Hostinger
   deploy path is unchanged.

### 29. One environment hazard, recorded so it is not misread as a build defect

`pnpm build` failed twice consecutively on this machine with
`PageNotFoundError: Cannot find module for page: /<route>` for **every** route, from a clean
`.next`, on a commit that had previously built clean. The third identical invocation succeeded
and every subsequent one has. The repository lives on **OneDrive**, and the signature is
file-lock contention during `Collecting page data`, not a code fault — `tsc --noEmit` was clean
throughout and the eventual build emitted all 8 entries as static.

**If this recurs, re-run before investigating.** Do not edit a source file in response to it.

### 30. Gates DROPPED by A-4, recorded rather than substituted

- **Lighthouse on all five routes** — not run, nothing substituted. `docs/PRE-LAUNCH.md`
  carries it as *"performance never measured"*.
- **The manual keyboard-only pass** — not performed by hand. What *was* done is programmatic
  and is a strictly smaller claim: the drawer toggle's `aria-expanded` flips on Enter and
  returns focus to the toggle on Escape; the first Tab stop is the skip link; the six
  `<details>` / `<summary>` FAQ items are focusable and operate on Enter; all 29 interactive
  elements on `/contact` are in the tab order with no `tabindex="-1"`; both map bypass anchors
  are the first child of their band with a live target; and no `tel:` link falls under 44px at
  390. `docs/PRE-LAUNCH.md` carries the gap as *"keyboard access is spec-verified only, never
  hand-tested"*.
