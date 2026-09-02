# docs/asset-prompts.md — image-generation prompts, TEXT ONLY

**OVERRIDE 2 governs this file.** Nothing here was generated, sourced or downloaded. Every
entry is a prompt to be run by the operator through **Nano Banana Pro**; the returned files
are dropped into `public/assets/` and every affected section is re-diffed under OVERRIDE 3.

Written at Prompt 10, merged into Prompt 11 by A-10.

---

## 0. How to read an entry

Every entry carries **slot ID · route · section · output pixels per breakpoint · aspect ·
`object-fit` · the applied palette hues by hex**. Geometry comes from `assets/INVENTORY.md`,
which records **rendered** boxes measured from the reference at 390 / 768 / 1440 — not file
sizes. Dominant colours quoted as *"sampled"* are the Prompt 1 measurement of the slot in the
reference capture and are art direction only; **they are not a colour to reproduce.**

**Dimensions are stated as plain text in every prompt. Do not use an aspect-ratio flag.**
Nano Banana Pro honours an explicit "output exactly W by H pixels" line; an aspect flag
rounds, and a rounded hero background reflows a band we have already measured to 3.91%.

### One prompt per slot, plus a second crop only where the aspect actually changes

`assets/INVENTORY.md` marks the aspect-change column **yes** for **19 slots**, not 21. The
count is checkable: the placeholder generator emitted **66 files for 47 REPLACE slots**, and
66 − 47 = **19 `-alt` crops**. Five of those 19 are credential badges, which are refused
outright below (§6), and one is `form-head-graphic`, which ships as live text and needs no
file — so **13 slots actually get a second crop** here.

Where a slot gets **no** second crop, the entry states the measured aspect spread across the
breakpoints at which it renders, so the call is checkable rather than asserted. A slot that
renders at only one breakpoint has no spread to measure and says so. §5 tabulates all of them.

---

## 1. THE PALETTE — seed 178543, read from `app/globals.css`

Master seed `123`; winning candidate seed **`178543`**; scheme split-complementary (+150°);
primary hue **129**, accent hue **279**.

| token | hex | role | OKLCH |
|---|---|---|---|
| `--color-primary` | **`#232c19`** | structural furniture, deep olive-green | `oklch(27.85% 0.0355 129.08)` |
| `--color-primary-deep` | **`#101806`** | deepest green | `oklch(19.53% 0.0359 128.58)` |
| `--color-accent` | **`#5a5bc8`** | **the call CTA — the only filled chromatic action on the site** | `oklch(52.93% 0.1655 278.73)` |
| `--color-accent-deep` | **`#404092`** | CTA hover / pressed | `oklch(41.86% 0.1318 279.07)` |
| `--color-surface` | **`#ffffff`** | page ground | `oklch(100% 0 89.88)` |
| `--color-neutral-200` | **`#d6e9c3`** | palest tinted neutral | `oklch(91.00% 0.0544 129.15)` |
| `--color-neutral-400` | **`#cadcb7`** | borders, hairlines | `oklch(87.12% 0.0534 128.65)` |
| `--color-neutral-600` | **`#687856`** | mid tinted neutral, strong borders | `oklch(55.00% 0.0542 128.54)` |
| `--color-neutral-900` | **`#0e1a00`** | the dark band ground | `oklch(19.88% 0.0528 129.09)` |

Semantic colours (`#b42318` error, `#067647` success, `#b54708` warning) are **exempt from
rotation** and must never appear in an image — a red or amber region in a photograph sitting
near a form error state is a defect, not art direction.

## 2. THE CHROMA CEILING — repeated in the body of every prompt, deliberately

`rendertruth.mjs`'s `cta-primacy` check scores **chroma dominance**: nothing on a page may
out-saturate the call CTA. Measured painted saturation `(max−min)/255`:

| element | hex | painted saturation |
|---|---|---|
| call CTA fill | `#5a5bc8` | **0.431** |
| CTA hover fill | `#404092` | 0.322 |
| structural primary | `#232c19` | 0.075 |
| dark band ground | `#0e1a00` | 0.102 |

The accent is **4.9× more chromatic than the primary**, which is what keeps the gate
satisfied today. A saturated photograph dropped into a band would put a large, highly
chromatic region on the same page as the CTA and can fail the gate *after* drop-in, when the
build is otherwise finished. So the ceiling is written **into the body of every prompt
below**, not into a preamble a generator will never see:

> **CHROMA CEILING — include verbatim in every prompt.** Desaturated documentary photograph.
> No region larger than 2% of the frame may exceed 0.25 painted saturation, measured as
> (max channel − min channel) / 255. **No colour grade of any kind**: no teal-and-orange, no
> LUT, no split tone, no warm or cool cast, no vignette tint. Neutral white balance, colour
> as the camera recorded it. The only saturated colour permitted anywhere in the frame is a
> **small incidental accent in `#5a5bc8` (a violet-indigo, hue 279) occupying no more than 3%
> of the frame** — a tool handle, a coil of cable, a jacket cuff — never a wall, a door face,
> a sky or a floor.

### Type-over-image backgrounds

Several slots carry text over them. Those prompts additionally brief an underexposure target
so `contrast.mjs`, which scores the **worst sample along the background ramp**, passes:

> **UNDEREXPOSED BACKGROUND — include verbatim where marked.** Underexpose the whole frame.
> Every part of the image must sit between **8% and 22% relative luminance**, with no bright
> highlight, no blown window, no sun flare and no light sky anywhere in the frame, so that
> white text placed anywhere over it clears 4.5:1. Even, low, directional light. Deep shadow
> is fine; a single bright patch is a failure.

**A standing warning, from `docs/known-divergence.md` 22:** `intro-bg`, `process-bg` and
`experience-bg` are currently **not mounted** precisely because a `url()`-backed rectangle
reports `UNMEASURABLE` from `contrast.mjs` rather than failing — which reads as a pass. Their
prompts are written below for completeness. **Do not mount any of the three without re-running
`contrast.mjs` and confirming the band still scores rather than going UNMEASURABLE.**

## 3. SUBJECT MATTER — ours, not theirs (D-09)

The reference is a roofing company. Not one of its subjects survives. Every prompt below is
**generic residential and commercial garage doors, springs, openers, panels, tracks, cables,
rollers, and a technician at work**, shot in a Carolina-suburban register.

Binding on every prompt, and repeated inside each one:

> **No readable text of any kind in the image** — no signage, no wordmarks, no logos, no
> decals, no van lettering, no licence plates, no numbers on tools or boxes, no
> badge-shaped or seal-shaped marks. **No identifiable faces** — the technician is seen from
> behind, from the side beyond recognition, cropped at the shoulder, or by their hands only.
> Nothing that could read as a certification, award, rating or credential.

---

## 4. SLOT PROMPTS

### 4.1 Shell

---

#### `logo-header` + `logo-footer` — THE LOGO

| | |
|---|---|
| slot IDs | `logo-header`, `logo-footer` |
| route | all five |
| section | `header` / `footer-nap` |
| output px @390 | header **130 × 99** · footer **330 × 111** |
| output px @768 | header **153 × 117** · footer **471 × 158** |
| output px @1440 | header **260 × 198** · footer **427 × 143** |
| aspect | header **1.31:1** · footer **2.99:1** — **the aspect changes between placements, so this is two lockups, not one file scaled** |
| object-fit | `fill` (both) |
| display font | **Teko**, SemiBold 600 — the site's display face, loaded via `next/font/google`, OFL |
| body font | **Hind** (not used in the mark; named so the operator can match the family if a tagline is ever added) |
| status | `TODO(fact): logo asset` — F-14 in `docs/facts-needed.md` |

**Prompt — header lockup (stacked, 260 × 198):**

> Design a flat vector wordmark-plus-icon lockup for a garage door repair company called
> **Railmont Garage Door Repairs**. Output exactly **260 by 260 pixels** on a transparent
> background, with the artwork composed to sit inside a **260 by 198 pixel** live area —
> stacked arrangement, icon above the wordmark, both centred on a shared vertical axis.
> Set the words "RAILMONT" on the first line and "GARAGE DOOR REPAIRS" on a second, smaller
> line in the typeface **Teko, SemiBold weight 600**, all caps, tight tracking, condensed
> geometric grotesque proportions. The icon is a **single-stroke geometric mark of a
> sectional garage door**: four horizontal panel bands inside a squared arch, with one short
> vertical torsion-shaft line above the top band. Uniform stroke weight, square line caps,
> no gradient, no bevel, no drop shadow, no 3D, no outer ring, no ribbon, no laurel, no seal
> or badge shape of any kind. Wordmark in **`#232c19`** (deep olive-green); the icon's single
> torsion-shaft line in **`#5a5bc8`** (violet-indigo) and the rest of the icon in
> **`#232c19`**. **The `#5a5bc8` element must occupy no more than 3% of the artwork** — the
> call button elsewhere on the page is the most saturated thing on it and must stay that way.
> Provide a second colour version with all `#232c19` replaced by **`#ffffff`** for use on the
> dark band `#0e1a00`. No tagline, no established date, no phone number, no address, no
> certification mark, no star rating, no reflection, no background plate.

**Prompt — footer lockup (horizontal, 471 × 158):**

> Same mark, same fonts, same colours, same prohibitions, re-laid out **horizontally**:
> output exactly **471 by 158 pixels** on a transparent background, icon at the left, the two
> lines of the wordmark stacked to its right and optically centred against the icon's height.
> This is a **relayout, not a rescale** — the header lockup is 1.31:1 and this one is 2.99:1,
> so recompose rather than stretch. Deliver the white-on-dark variant of this crop as well;
> the footer band is `#0e1a00`.

**Why two crops:** header 1.31:1 vs footer 2.99:1 — a spread of 1.68, the largest of any slot
on the site.

---

### 4.2 `/` — home

---

#### `hero-pillar-1`, `hero-pillar-2`, `hero-pillar-3`

| | |
|---|---|
| route · section | `/` · `hero` |
| output px | **106 × 106** @390 · **132 × 132** @768 · **208 × 208** @1440 |
| aspect | **1:1** at all three widths — **spread 0.000, no second crop needed** |
| object-fit | `cover` |
| sampled dominant | `#c6cbcd` (cool light grey) — art direction only |

Three square thumbnails sitting under the hero headline, one per proposition pillar. They are
seen at 106px on a phone, so each must read as **one shape at thumbnail size**.

> **Pillar 1 — springs.** Square photograph, output exactly **208 by 208 pixels**, filling the
> frame edge to edge for a `cover` crop. Extreme close macro of a **torsion spring on a
> steel shaft above a residential garage door**, shot square-on, the coil filling most of the
> frame, shallow depth of field, plain out-of-focus garage ceiling behind. One composition,
> one subject, legible as a single shape at 106 pixels wide.
> *CHROMA CEILING (verbatim from §2).* *No readable text of any kind in the image — no
> signage, wordmarks, logos, decals, lettering, plates or numbers; no identifiable faces;
> nothing that could read as a certification, award, rating or credential.*
> Palette context for grading decisions, not colours to paint in: page ground `#ffffff`,
> structural green `#232c19`, dark band `#0e1a00`, and the single permitted incidental
> accent `#5a5bc8` at no more than 3% of frame.

> **Pillar 2 — openers.** Same square, same **208 by 208 pixels**, same rules verbatim.
> Subject: a **belt-drive garage door opener head unit mounted to a ceiling joist**, viewed
> from below and slightly to one side, the rail running out of frame. Domestic garage
> interior, unbranded housing, no display panel, no readable model plate.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **Pillar 3 — the technician's hands.** Same square, same **208 by 208 pixels**, same rules
> verbatim. Subject: **a technician's gloved hands setting a roller into a garage door
> track**, cropped tight at the wrists — hands and hardware only, no face, no torso, no
> uniform visible. Working light, plain background.
> *CHROMA CEILING — the glove may carry the single incidental `#5a5bc8` accent, at no more
> than 3% of frame.* *No readable text / no faces / no credential marks.*

---

#### `form-head-graphic` — **NO FILE IS GENERATED**

| | |
|---|---|
| route · section | `/` · `hero` |
| reference px | 330 × 52 @390 · 288 × 45 @768 · 427 × 67 @1440 · aspect 6.37:1 · `fill` |
| aspect Δ | **yes** on the reference — but moot, see below |

The reference **rasterises a heading** into an image strip above its form. Ours is live text
set in Teko. **No image is requested for this slot and no crop is written**, because
rasterised type is a regression: it is unselectable, unsearchable, does not scale with the
user's font size, and `contrast.mjs` cannot score it — it would report the band
`UNMEASURABLE`, which reads as a pass, the exact hole `docs/known-divergence.md` 5 exists to
close. The slot keeps its row here so the asset pass does not silently drop it. Listed again
as refusal **R-11**.

---

#### `intro-bg` — band background, **currently not mounted**

| | |
|---|---|
| route · section | `/` · `intro` |
| output px | **390 × 1036** @390 · **768 × 659** @768 · **1440 × 689** @1440 |
| aspect | 0.38:1 @390 vs **2.09:1** @1440 — **aspect Δ yes, second crop required** |
| object-fit | `55%` (background-size) |
| sampled dominant | `#c6cbcd` |

> **Wide crop (768 and 1440).** Output exactly **1440 by 689 pixels**. A **quiet suburban
> driveway elevation**: a two-car sectional garage door on a plain Carolina brick-and-siding
> house, shot square-on from across the drive in flat overcast light, the door occupying the
> middle third with generous plain concrete and lawn either side so the band's text has room.
> No people, no vehicles, no house numbers, no mailbox lettering.
> *UNDEREXPOSED BACKGROUND (verbatim from §2).* *CHROMA CEILING (verbatim from §2).*
> *No readable text of any kind — no signage, wordmarks, logos, decals, lettering, plates or
> numbers; no identifiable faces; nothing that could read as a certification or award.*
> Palette context: page ground `#ffffff`, structural green `#232c19`, dark band `#0e1a00`,
> single permitted incidental accent `#5a5bc8` at ≤3% of frame.

> **Tall crop (390).** Output exactly **390 by 1036 pixels**. Same scene, **recomposed
> vertically, not cropped from the wide file** — the door sits in the upper third with the
> driveway running down and out of the bottom of the frame. All the same rules verbatim.

**Mounting warning:** this slot is deliberately unmounted today (item 22). Mount only after
re-running `contrast.mjs` and confirming the `intro` band still scores rather than reporting
`UNMEASURABLE`.

---

#### `door-style-1`, `door-style-2`, `door-style-3`

| | |
|---|---|
| route · section | `/` · `door-styles` |
| output px | `-1`: — @390 · **300 × 300** @768 · **1260 × 300** @1440 · `-2` / `-3`: **270 × 200** @390 · **300 × 300** @768 · **1260 × 300** @1440 |
| aspect | 1.35:1 / 1:1 / **4.20:1** — **aspect Δ yes on all three, second crop required** |
| object-fit | `cover` |
| sampled dominant | `-1` `#6da1d3` · `-2` `#fdfcfa` · `-3` `#fdfcfa` (the last two repainted `#687856` in the placeholder per item 5) |

The reference band is a **price table**; ours is a style browser with every figure stripped
(D-12, F-12). These are door *styles*, never priced options.

> **`door-style-1` — raised-panel steel, wide crop.** Output exactly **1260 by 300 pixels**, a
> letterbox band. A **raised-panel steel sectional garage door, closed, photographed
> square-on and filling the width**, cropped top and bottom so only the door face and a
> sliver of jamb are visible. Flat even daylight, no sky in frame.
> *CHROMA CEILING (verbatim from §2).* *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.
> **Square crop:** the same door recomposed to exactly **300 by 300 pixels**, showing one
> panel intersection and the stile detail rather than the whole door. Note the sampled
> dominant `#6da1d3` is the reference's own brand blue bleeding into the slot — **it is not
> reproduced**, and a blue door face would breach the chroma ceiling.

> **`door-style-2` — flush contemporary.** Same rules verbatim. **1260 by 300 pixels**
> letterbox of a **flush, unribbed contemporary sectional door with a single row of narrow
> horizontal glazing near the top**, square-on. Plus **300 by 300 pixels** square recompose,
> plus **270 by 200 pixels** for the 390 breakpoint.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **`door-style-3` — carriage-house.** Same rules verbatim. **1260 by 300 pixels** letterbox
> of a **carriage-house style sectional door with applied overlay strapwork and decorative
> hinges**, square-on. Plus **300 by 300 pixels** square recompose, plus **270 by 200 pixels**
> for 390. Hardware is plain black iron — **no maker's mark, no stamped lettering**.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

---

#### `why-us-1` … `why-us-5`

| | |
|---|---|
| route · section | `/` · `why-us` |
| output px | **328 × 353** @390 · **322 × 346** @768 (`-1`, `-2`, `-5` only) · **398 × 428** @1440 (`-1`, `-3`, `-4`, `-5` only) |
| aspect | 0.929 / 0.931 / 0.930 — **measured spread 0.002 (0.2%). No second crop.** |
| object-fit | `fill` |
| sampled dominant | `-1`, `-3` `#f9fafa` · `-2` `#fbf9f4` · `-4`, `-5` `#e1e2e1` (all repainted `#687856`, item 5) |

Five near-square portraits. The reference's five items include **financing** and
**insurance-claims assistance**; both are scrubbed (F-11, F-13) and replaced with workmanship
subjects. One prompt each, identical framing, output exactly **398 by 428 pixels**.

> **`why-us-1` — balance check.** Output exactly **398 by 428 pixels**. A **technician
> releasing a garage door halfway and holding it to test its balance**, seen from behind and
> to the side, no face visible, in a plain domestic garage. Working light from the open door.
> *CHROMA CEILING (verbatim from §2).* *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **`why-us-2` — torque to the rating.** **398 by 428 pixels**. **Gloved hands winding a
> torsion spring with two winding bars**, close in, hands and hardware only.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **`why-us-3` — parts sized to the door.** **398 by 428 pixels**. **An open parts tray on a
> garage floor: nylon rollers, hinges, bearing plates and cable, laid out in rows.** Overhead
> three-quarter view. Every part unbranded — **no printed boxes, no labels, no part numbers**.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **`why-us-4` — track and alignment.** **398 by 428 pixels**. **A vertical garage door track
> and its roller, photographed close and slightly from below**, a spirit level held against
> it by a gloved hand at the edge of frame.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **`why-us-5` — two full cycles before we leave.** **398 by 428 pixels**. **A sectional door
> mid-travel, seen from inside the garage looking out at a plain driveway**, the panels
> curving into the horizontal track overhead. No person, no vehicle.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

---

#### `process-bg` — band background, **currently not mounted**

| | |
|---|---|
| route · section | `/` and `/services` · `process` |
| output px | **390 × 1570** @390 · **768 × 1093** @768 · **1440 × 789** @1440 |
| aspect | 0.25:1 @390 vs **1.83:1** @1440 — **aspect Δ yes, second crop required** |
| object-fit | `cover` |
| sampled dominant | `#242421` (near-black) |

> **Wide crop (768 and 1440).** Output exactly **1440 by 789 pixels**. **The interior of a
> garage looking up at the horizontal tracks, torsion shaft and opener rail**, wide and low,
> the hardware reading as a repeating structural rhythm across the frame. No person.
> *UNDEREXPOSED BACKGROUND (verbatim from §2) — this band carries a full three-step process
> list in white type over it, so the 8–22% luminance window is a hard requirement, not a
> preference.* *CHROMA CEILING (verbatim from §2).*
> *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **Tall crop (390).** Output exactly **390 by 1570 pixels**, **recomposed vertically** —
> looking along a single track from the door head up to the rear hanger, the run of hardware
> filling the height. Same rules verbatim.

**Mounting warning:** unmounted today (item 22); re-run `contrast.mjs` before mounting.

---

#### `testimonial-quote-mark` — **NO PHOTOGRAPH; no file unless the glyph fails**

| | |
|---|---|
| route · section | `/` · `testimonials` |
| output px | **82 × 63** at all three widths · aspect 1.30:1 — **spread 0.000, no second crop** |
| object-fit | `fill` |

Satisfied by `lucide-react`'s `Quote` glyph (ISC), which is already on the dependency
allowlist and needs no file. If it ever reads wrong at 82 × 63, the replacement is a
**vector, not a photograph**:

> Flat vector opening double-quotation mark, output exactly **82 by 63 pixels** on a
> transparent background, single solid fill in **`#687856`**, geometric, square-cut, no
> gradient, no outline, no shadow, no ornament. Nothing else in the frame.

---

#### `promise-bg` + `promise-bg-mobile` — band background

| | |
|---|---|
| route · section | `/` · `promise` |
| output px | `promise-bg`: **768 × 1567** @768 · **1440 × 1190** @1440. `promise-bg-mobile`: **390 × 1426** @390 |
| aspect | `promise-bg` 0.49:1 @768 vs **1.21:1** @1440 — **aspect Δ yes**. `promise-bg-mobile` renders at 390 only — **single breakpoint, no spread exists, no second crop** |
| object-fit | `100%` / `cover` |
| sampled dominant | `promise-bg` `#222222` · `promise-bg-mobile` `#4694e4` (their brand blue — **discarded**, D-09) |

The reference serves a separate mobile file, so we do too — three outputs, one scene.

> **1440 crop.** Output exactly **1440 by 1190 pixels**. **A finished residential garage door
> at dusk, closed, lit only by a single soffit light**, the house in silhouette, the drive
> empty. Calm, still, nothing happening. This is the "it holds" band.
> *UNDEREXPOSED BACKGROUND (verbatim from §2).* *CHROMA CEILING (verbatim from §2) — and
> note specifically: **no blue-hour cast, no colour grade**. The sampled dominant of the
> reference's own mobile file is a saturated blue and it is deliberately not reproduced.*
> *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **768 crop.** Same scene recomposed to exactly **768 by 1567 pixels**, portrait — the door
> centred with the house rising above it. Same rules verbatim.

> **`promise-bg-mobile`, 390 crop.** Same scene recomposed to exactly **390 by 1426 pixels**,
> tall portrait — the door face fills the lower half, the wall and soffit light above. Same
> rules verbatim.

---

#### `promise-media`

| | |
|---|---|
| route · section | `/` · `promise` (also rendered by `/services` `risk-band`, per item 22) |
| output px | **330 × 186** @390 · **720 × 405** @768 · **650 × 366** @1440 |
| aspect | 1.774 / 1.778 / 1.776 — the inventory marks **aspect Δ yes**, but the **measured spread is 0.004 (0.2%)**; that flag fires on the pixel dimensions changing, not on the shape. **One 16:9 file at 720 × 405 serves all three**, and no second crop is requested. |
| object-fit | `fill` |
| sampled dominant | `#222222` |

The reference slot is a **Vimeo poster frame**. We ship no video and no third-party embed
(D-15); this is a still at the same box, so the band's height stays honest.

> Output exactly **720 by 405 pixels**, 16:9. **A wide interior view of a technician working
> at the base of a sectional garage door**, seen from across the garage, figure small in
> frame and turned away — the door, the track and the space read first, the person second.
> Plain domestic garage, one light source.
> *CHROMA CEILING (verbatim from §2).* *No readable text of any kind — no signage, wordmarks,
> logos, decals, van lettering, plates or numbers; no identifiable faces; nothing that could
> read as a certification, award, rating or credential.*
> No play button, no video-player chrome, no timecode, no letterbox bars.
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

---

#### `new-door-cta-bg`

| | |
|---|---|
| route · section | `/` · `new-door-cta` |
| output px | **390 × 622** @390 · **768 × 501** @768 · **1440 × 508** @1440 |
| aspect | 0.63:1 @390 vs **2.83:1** @1440 — **aspect Δ yes, second crop required** |
| object-fit | `cover` |
| sampled dominant | `#2f2e2a` |

> **Wide crop (768 and 1440).** Output exactly **1440 by 508 pixels**. **A newly installed
> sectional garage door on a plain new-build elevation**, shot square-on from low across the
> drive, wide and shallow, generous plain wall either side.
> *UNDEREXPOSED BACKGROUND (verbatim from §2) — a CTA heading and the call button sit over
> this band.* *CHROMA CEILING (verbatim from §2).*
> *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **Tall crop (390).** Exactly **390 by 622 pixels**, the same door recomposed portrait with
> the elevation above it. Same rules verbatim.

---

#### `cta-lockup`

| | |
|---|---|
| route · section | `/` · `new-door-cta` (reused by `/services` `experience-band`) |
| output px | **308 × 61** at all three widths |
| aspect | **5.05:1** at all three — **spread 0.000, no second crop** |
| object-fit | `fill` |
| sampled dominant | `#2f2e2a` |

The reference puts a small **brand lockup** inside its CTA band. Ours is the same lockup as
§4.1, at a third aspect:

> The `logo-footer` horizontal lockup from §4.1, **recomposed to exactly 308 by 61 pixels**
> on a transparent background — icon left, two-line Teko wordmark right, optically centred.
> White version (`#ffffff` where the header lockup uses `#232c19`), since this band is dark.
> The icon's single torsion-shaft line stays **`#5a5bc8`** at no more than 3% of the
> artwork. Same prohibitions as §4.1: no tagline, no date, no phone, no address, no
> certification mark, no star rating, no seal or badge shape.

---

### 4.3 `/services`

---

#### `services-banner-image`

| | |
|---|---|
| route · section | `/services` · `services-banner` |
| output px | **390 × 886** @390 · **768 × 784** @768 · **1440 × 732** @1440 |
| aspect | 0.44:1 @390 vs **1.97:1** @1440 — **aspect Δ yes, second crop required** |
| object-fit | `fill` |
| sampled dominant | `#7d868f` (cool slate) |

> **Wide crop (768 and 1440).** Output exactly **1440 by 732 pixels**. **A row of commercial
> roll-up doors on a plain light-industrial unit**, shot square-on in flat overcast light,
> the repeating door bays reading across the frame. Empty loading apron, no vehicles, no
> pallets, no signage.
> *UNDEREXPOSED BACKGROUND (verbatim from §2) — the page's banner heading sits over this.*
> *CHROMA CEILING (verbatim from §2).*
> *No readable text of any kind — no unit numbers, bay numbers, signage, wordmarks, logos,
> decals, lettering or plates; no identifiable faces; nothing that could read as a
> certification, award, rating or credential.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **Tall crop (390).** Exactly **390 by 886 pixels**, **recomposed portrait** — two bays
> instead of a row, the door face filling the height. Same rules verbatim.

---

#### `services-pillar-1`, `services-pillar-2`, `services-pillar-3`

| | |
|---|---|
| route · section | `/services` · `services-banner` |
| output px | **106 × 106** @390 · **132 × 132** @768 · **208 × 208** @1440 |
| aspect | **1:1** at all three — **spread 0.000, no second crop** |
| object-fit | `cover` |
| sampled dominant | `#7d868f` |

Three square thumbnails mirroring the hero pillars, on the commercial side.

> **Pillar 1 — roll-up curtain.** Output exactly **208 by 208 pixels**, square, `cover`. Close
> square-on detail of a **galvanised roll-up door curtain and its guide channel**, the slats
> filling the frame.
> *CHROMA CEILING (verbatim from §2).* *No readable text / no faces / no credential marks.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **Pillar 2 — panel replacement.** **208 by 208 pixels**. **A single sectional door panel
> stood on edge against a wall**, three-quarter view, showing its rib profile and end stile.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

> **Pillar 3 — cables and drums.** **208 by 208 pixels**. Close detail of a **cable drum and
> lift cable at the end of a torsion shaft**, square-on.
> *CHROMA CEILING.* *No readable text / no faces / no credential marks.*

---

#### `quality-icon-1`, `quality-icon-2`, `icon-commercial`

| | |
|---|---|
| route · section | `/services` · `quality-band` |
| output px | `quality-icon-*`: **115 × 115** at all three widths · `icon-commercial`: **114 × 91** at all three |
| aspect | **1:1** and **1.25:1** — **spread 0.000 on both, no second crop** |
| object-fit | `fill` |
| sampled dominant | `#ebe9e8` and `#fbfcfc` (both repainted `#687856`, item 5) |

These are **icons, not photographs.** A photographic thumbnail at 115px is mud, and a drawn
icon also keeps the slot's saturated area at zero, which is the cheapest possible way to stay
under the chroma ceiling.

> **`quality-icon-1`.** Flat single-weight line icon, output exactly **115 by 115 pixels** on
> a transparent background. Subject: a **sectional garage door in elevation with a small
> circular arrow beside it** to signify cycle testing. Uniform stroke weight, square caps,
> geometric construction matching a Teko-set page. Single colour **`#232c19`**. No fill, no
> gradient, no shadow, no badge or seal shape, no ring, no ribbon, **no text or numerals**.

> **`quality-icon-2`.** Same construction, same **115 by 115 pixels**, same colour and
> prohibitions. Subject: a **torque wrench crossed over a torsion spring coil**.

> **`icon-commercial`.** Same construction and prohibitions, output exactly **114 by 91
> pixels**. Subject: a **bank of three commercial roll-up bays in elevation**, drawn as
> simple rectangles with a rolled curtain line above each.

---

#### `services-detail-image`

| | |
|---|---|
| route · section | `/services` · `services-detail` |
| output px | **330 × 248** @390 · **720 × 540** @768 · **650 × 488** @1440 |
| aspect | 1.331 / 1.333 / 1.332 — the inventory marks **aspect Δ yes**, but the **measured spread is 0.002 (0.2%)**; the flag fires on pixel dimensions, not shape. **One 4:3 file at 720 × 540 serves all three**, no second crop. |
| object-fit | `fill` |
| sampled dominant | `#d1d2d3` |

The reference uses a **full staff photograph** here. We may not reuse it (D-09) and may not
invent people (D-17), so the subject is changed outright to a workshop scene. Listed again as
refusal **R-05**.

> Output exactly **720 by 540 pixels**, 4:3. **A tidy repair-van interior or workshop bench
> laid out with garage door hardware** — coiled cable, nylon rollers, hinges, a torque
> wrench, two winding bars — seen in three-quarter overhead view. Everything unbranded: **no
> printed boxes, no labels, no part numbers, no van lettering.** No people at all.
> *CHROMA CEILING (verbatim from §2).* *No readable text of any kind; no identifiable faces;
> nothing that could read as a certification, award, rating or credential.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

---

#### `experience-bg` — band background, **currently not mounted**

| | |
|---|---|
| route · section | `/services` · `experience-band` |
| output px | **390 × 502** @390 · **768 × 437** @768 · **1440 × 469** @1440 |
| aspect | 0.78:1 @390 vs **3.07:1** @1440 — **aspect Δ yes, second crop required** |
| object-fit | `cover` |
| sampled dominant | `#373736` |

The reference band makes an **"over 15 years" claim**. It is scrubbed (F-03). The image must
not restate it pictorially — no "established" motif, no anniversary device, no
worn-tools-as-proof staging that implies a tenure we have not stated.

> **Wide crop (768 and 1440).** Output exactly **1440 by 469 pixels**, a shallow band. **A
> long low view down the inside of a commercial unit's door line**, roll-up curtains and
> guide channels receding, empty floor.
> *UNDEREXPOSED BACKGROUND (verbatim from §2).* *CHROMA CEILING (verbatim from §2).*
> *No readable text / no faces / no credential marks. No "established", no dates, no
> anniversary or milestone device of any kind.*
> Palette context: `#ffffff`, `#232c19`, `#0e1a00`, incidental `#5a5bc8` ≤3%.

> **Tall crop (390).** Exactly **390 by 502 pixels**, recomposed on a single bay. Same rules
> verbatim.

**Mounting warning:** unmounted today (item 22); re-run `contrast.mjs` before mounting.

---

## 5. Slots with NO second crop — the measured spreads, so the call is checkable

| slot | breakpoints it renders at | aspect at each | spread | second crop? |
|---|---|---|---|---|
| `hero-pillar-1..3` | 390, 768, 1440 | 1.000 / 1.000 / 1.000 | **0.000** | no |
| `services-pillar-1..3` | 390, 768, 1440 | 1.000 / 1.000 / 1.000 | **0.000** | no |
| `quality-icon-1`, `quality-icon-2` | 390, 768, 1440 | 1.000 / 1.000 / 1.000 | **0.000** | no |
| `icon-commercial` | 390, 768, 1440 | 1.253 / 1.253 / 1.253 | **0.000** | no |
| `cta-lockup` | 390, 768, 1440 | 5.049 / 5.049 / 5.049 | **0.000** | no |
| `testimonial-quote-mark` | 390, 768, 1440 | 1.302 / 1.302 / 1.302 | **0.000** | no |
| `why-us-1`, `why-us-5` | 390, 768, 1440 | 0.929 / 0.931 / 0.930 | **0.002 (0.2%)** | no |
| `why-us-2` | 390, 768 | 0.929 / 0.931 | **0.002** | no |
| `why-us-3`, `why-us-4` | 390, 1440 | 0.929 / 0.930 | **0.001** | no |
| `promise-media` | 390, 768, 1440 | 1.774 / 1.778 / 1.776 | **0.004 (0.2%)** | **no — overriding the inventory's Δ flag, which fires on pixel size, not shape** |
| `services-detail-image` | 390, 768, 1440 | 1.331 / 1.333 / 1.332 | **0.002 (0.2%)** | **no — same override** |
| `promise-bg-mobile` | 390 only | 0.274 | **single breakpoint, no spread exists** | no |
| `credential-badge-the-states-best-of-2018` | 390 only | 1.147 | **single breakpoint** | refused, R-01 |
| `credential-badge-irmo-chapin2024-1`, `-select-shinglemaster-1` | 1440 only | 1.000 | **single breakpoint** | refused, R-01 |

Every slot in §4 that **does** get a second crop has a spread above **0.4**; the smallest is
`intro-bg` at 0.38 → 2.09.

---

## 6. REFUSALS — prompts NOT written, and why

Each of these is a slot a generator could plausibly fill and **must not**. Every sibling site
in this programme refused the same list; a plausible credential badge is precisely what D-14
exists to prevent.

| # | what was refused | slots | reason |
|---|---|---|---|
| R-01 | **All 16 certification / award / "best of" badges** | `credential-badge-*` — 15 on `/`, 1 on `/services` | **D-14 / F-06, F-07, F-08.** We hold none of these credentials. A drawn badge asserts one. **Their slot dimensions are recorded in `assets/INVENTORY.md` and `docs/facts-needed.md` precisely so they stay `TODO(fact)` chips at the correct box rather than becoming images** — the geometry is honest and the claim is absent. If the owner supplies real credentials, the artwork comes from the certifying body, not from a generator. |
| R-02 | **Star rows, rating graphics, review-count devices** | would sit in `/` `testimonials`, `/about` `reputation` | **D-13 / F-02.** Fabricated ratings are a legal problem, not a content gap. There is also no `AggregateRating` or `Review` JSON-LD anywhere on this site for one to pair with. |
| R-03 | **Testimonial portraits and customer photographs** | `/` `testimonials` | **D-13 + D-17.** A face beside a `[TESTIMONIAL PLACEHOLDER]` block invents a person. The band ships three literal placeholder blocks and a visible `TODO(fact)` line. |
| R-04 | **Staff headshots and any team photograph** | `deleted-team-headshot-1..3`, `deleted-team-bg` | **D-09 + D-17 / F-05.** We may not reuse theirs and may not invent ours. The whole band is deleted, not placeheld — there is no D-13-style placeholder licence for people. |
| R-05 | **`services-detail-image` as a team photo** | `/services` `services-detail` | Same cause as R-04. The reference's asset here is a full staff photograph; the subject is changed to a workshop bench rather than substituting a generated crew. |
| R-06 | **"Years in business", "jobs completed", milestone or anniversary devices** | would sit in `experience-band`, `reputation` | **D-14 / F-03, F-04.** The reference band claims "over 15 years"; the claim is scrubbed and the `experience-bg` prompt explicitly forbids restating it pictorially. |
| R-07 | **Price graphics, "starting at" devices, financing marks** | `/` `door-styles` (a price table on the reference), `why-us` | **D-12 / F-11, F-12.** No figures, no ranges. "Free estimate" is the only permitted commercial claim and it is set as live text, not artwork. |
| R-08 | **Warranty / guarantee seals** | would sit in `/` `why-us` (reference: "Lifetime Workmanship Warranty") | **D-14 / F-10.** A seal is a credential mark. The item is replaced with a description of what we actually do on the visit. |
| R-09 | **Commercial gallery tiles of named client premises** | `deleted-gallery-01..10` | **D-01 + D-09.** The band exists only to link to a gallery route that is out of scope, and the tiles are photographs of *their* clients' buildings. |
| R-10 | **Service-area map graphic** | `deleted-locations-map`, `deleted-locations-icon-residential` | **D-02.** The locations grid is scrubbed entirely. The site's two maps are live keyless `<iframe>`s addressed by `MAP_COORDS`, not images. |
| R-11 | **Any rasterised heading** | `form-head-graphic` | Not a fact problem — a quality one. Rasterised type is unselectable, does not scale with the user's font size, and reports `UNMEASURABLE` to `contrast.mjs`, which reads as a pass. Ships as live Teko text. |
| R-12 | **Video, video-poster chrome, play buttons** | `promise-media` | **D-15.** No third-party embeds. The slot is a still at the same box so the band height stays honest. |
| R-13 | **Anything carrying readable text, faces, plates or logos, in any prompt above** | all | **D-09 + D-17.** Rendered text inside a generated image is uncontrolled copy that no gate reads: it bypasses the email sweep, the locations sweep, the NAP check and the `TODO(fact)` count simultaneously. |

---

## 7. Drop-in procedure (OVERRIDE 3 — the terminal step)

1. Files land in `public/assets/`, named for their slot ID (`-alt` suffix on second crops).
2. Point each section's `<img>` or background at the real file; **do not** change any
   geometry, token, class name or band padding while doing it — A-6 still freezes the shell.
3. Mount `intro-bg`, `process-bg` and `experience-bg` **only** after step 5 confirms their
   bands still score.
4. `pnpm build`, restart on 3108, `rm -rf .harness/cap/ours`, re-capture `--side ours`.
5. Re-run **all three** gates: `diff.mjs` on the affected sections, then `contrast.mjs` and
   `rendertruth.mjs` in full. `contrast.mjs` must read **0 FAIL and 0 UNMEASURABLE** — a new
   `UNMEASURABLE` means an image was mounted under text and the band stopped being scored.
   `rendertruth.mjs` must read **0 findings**; a new `cta-primacy` finding means an image
   broke the chroma ceiling in §2, and the fix is the image — never the CTA, never the type.
6. Report the final per-section table. That ends the run.
