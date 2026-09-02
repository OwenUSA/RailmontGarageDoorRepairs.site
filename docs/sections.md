# docs/sections.md — the section contract (source of truth)

Reference: Premiere Roofing (`roofteam.com`), profiled from `reference/raw/` at the
canonical width **1440**. Our site: Railmont Garage Door Repairs, five routes.

## HOW TO EDIT THIS FILE

There are **two tables below and they must be edited together.** Section 3 is the
machine-readable contract that `diff.mjs` parses; section 4 is the human reading of the same
rows. Change one without the other and the build silently measures something else.

Rules that are enforced, not stylistic:

- The machine table's column order is fixed: `| /route | ref-section-id | our-section-id | CLASS | reason |`.
- The **ref column carries the reference section id exactly as the probe emits it**
  (`s07-customer-reviews`), never an ordinal. Ids were verified byte-identical at 390, 768
  and 1440 on all five pages — see `docs/profile.md` section 5, trap 1.
- **An ADAPTED or FIDELITY row with an empty ref column is silently unmeasurable**: it skips
  the structural comparison *and* the length rule, and nothing reports it as an exemption.
  Only NOVEL and DELETED may have an empty ref. `diff.mjs` warns; heed the warning.
- `diff.mjs` **throws** if this file mentions class names but matches no rows. Two sibling
  sites parsed zero rows and a third parsed 5 of 88, and every one of them looked fine
  because the file was full of the word ADAPTED. After any edit, run
  `MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs` and check the parsed-row count.
- `our-section-id` is what our component declares in `data-section`. It must be non-empty
  even on a DELETED row (the parser requires it); DELETED rows use a `deleted-*` id that no
  component ever emits.

---

## 1. Counts by class

| class | rows | measured how |
|---|---|---|
| FIDELITY | **0** | — |
| ADAPTED | **46** | structural metrics, colour excluded (A-8), advisory fields excluded (A-12), `< 5%` |
| NOVEL | **9** | token conformance, zero violations, single pass (A-9) |
| DELETED | **8** | not built; single pass (A-9) |
| **total** | **63** | |

Per route: `/` 18 · `/about` 14 · `/services` 16 · `/contact` 8 · `/privacy` 7.

### Why FIDELITY is zero, and why that was not forced

FIDELITY means "same purpose **and** structurally equivalent content". Every band on this
reference fails the second half. The reference is a **roofing** company in South Carolina;
we are a **garage door repair** company in Fort Mill. Every band carries the business name,
the roofing service vocabulary, roofing photography, a different service count, or copy of a
different length — which is the textbook definition of ADAPTED in CLAUDE.md.

The two candidates that looked closest were checked and rejected:

- **`s14-footer`, the copyright bar.** Structurally a one-line legal strip. But it carries
  the business name and the reference's Terms & Conditions link, which we do not have a
  route for. Business-name swap is *literally* the ADAPTED definition.
- **`s01-*`, the page-head strips on the interior routes.** A single centred H1 on a band.
  The H1 text length differs on every route, and the business name appears in three of the
  four (`About Premiere Roofing`, `Commercial Roof Services`, `Get An Estimate`), which is
  the ADAPTED definition.

  **Corrected at Prompt 3:** this entry originally also claimed the band's background was
  "a roofing photograph we are forbidden to reuse (D-09)". **There is no such photograph.**
  The Prompt 2 asset probe finds zero background images on `/about-us` and
  `/privacy-policy`, and the only background images on `/get-an-estimate` and
  `/commercial-roofing` belong to other bands. `page-head` is a solid strip. The class is
  unchanged — it never rested on that claim — but the consequence matters: the four
  `page-head` bands are **NOT placeholder-blocked** and can converge structurally on their
  first measurement with nothing excluded.

CLAUDE.md names "misclassifying an ADAPTED section as FIDELITY and grinding on it" as the
single most expensive failure mode in this process. Zero is the honest number here, and
sibling sites landed at 0-3.

---

## 2. Deletions, and what replaces them

| deleted | why | replacement |
|---|---|---|
| `.instant-quote-new` (Roofle overlay, every page) | An instant-quote tool is not among our five routes (D-01), and quoting implies prices (D-12). Also excluded from segmentation because it is an absolutely-positioned overlay whose ordinal slot moves between breakpoints — see `docs/profile.md` trap 1. | nothing |
| `s09-locations-we-serve` (home) | D-02: the locations grid, its nav item, its footer column and any `areaServed` city array are all scrubbed. | `service-map` (NOVEL) — the D-08 home map at zoom ~13, plus the single `SERVICE_AREA` sentence in the footer, which is the only survivor D-02 allows |
| `s11-meet-your-roof-team` (home) | Six named staff with headshots. D-09 forbids reusing their staff shots; D-17 forbids inventing names, roles or a team size. There is no D-13-style placeholder licence for people. | nothing — the band is dropped rather than filled with invented humans |
| `s08-commercial-roofing-image-gallery` (`/services`) | A gallery route is explicitly out of scope (D-01), and the band exists only to link to it. | nothing |
| "GET FINANCING" header link (inside `s00-header`, all routes) | Financing terms are a business fact we do not have (D-17) and imply pricing (D-12). The band survives; the link does not. | nothing — noted here because it is a scrub inside a surviving band, not a band deletion |

The locations **footer column** inside `s13`/`s10`/`s11`/`s03` (`.bottom-area`) is scrubbed
the same way; that band stays ADAPTED because the rest of it is the NAP block.

---

## 3. MACHINE-READABLE CONTRACT — `diff.mjs` parses these rows

**Column order is fixed. Do not reorder, do not add columns before `reason`.**

| /route | ref-section-id | our-section-id | CLASS | reason |
|---|---|---|---|---|
| / | s00-header | header | ADAPTED | shell header retained; business name, nav labels, phone and the GET FINANCING link all swapped or scrubbed |
| / | s01-banner-get-a-free-estimate | hero | ADAPTED | hero band retained; roofing headline and estimate form replaced with our callback form (D-05) |
| / | s02-residential-and-commercial-roofing | intro | ADAPTED | intro prose band; original copy at matched length (D-10) |
| / | s03-choose-your-style | door-styles | ADAPTED | style slider retained as a garage-door style band; every price stripped (D-12) |
| / | s04-premiere-roofing-services | services-grid | ADAPTED | service card grid; our eight garage-door services replace their roofing set |
| / | s05-the-best-choice-for-roofing | why-us | ADAPTED | workmanship proposition band; warranty terms removed as an uninvented fact (D-14) |
| / | s06-protecting-your-investment-in-thre | process | ADAPTED | three-step process band; steps rewritten for a repair call |
| / | s07-customer-reviews | testimonials | ADAPTED | review carousel; filled with literal TESTIMONIAL PLACEHOLDER blocks, no AggregateRating markup (D-13) |
| / | s08-what-does-it-mean-to-have-a-dedica | promise | ADAPTED | dedicated-team explainer band recast on the workmanship proposition |
| / | s09-locations-we-serve | deleted-locations | DELETED | D-02 removes the locations grid entirely; a single SERVICE_AREA sentence in the footer is the only survivor |
| / | s10-building-your-dream-home-we-ve-go | new-door-cta | ADAPTED | new-construction CTA band recast as new residential door installation |
| / | s11-meet-your-roof-team | deleted-team | DELETED | staff names, roles and headshots are facts we do not have (D-17) and photos we may not reuse (D-09) |
| / | s12-certifications-awards | credentials | ADAPTED | badge grid kept at reference dimensions with TODO(fact) placeholder chips (D-14) |
| / | s13 | footer-nap | ADAPTED | fat footer; NAP swapped to our constants, locations column scrubbed per D-02 |
| / | s14-footer | footer-legal | ADAPTED | copyright strip; business name swapped, Terms link dropped (no such route) |
| / |  | service-map | NOVEL | D-08 requires a home map section; embedded by MAP_COORDS at zoom ~13. Replaces the deleted locations band |
| / |  | call-bar | NOVEL | D-04 mobile sticky call bar; the reference has no counterpart |
| / |  | deleted-instant-quote | DELETED | Roofle instant-quote overlay; out of scope (D-01) and excluded from segmentation, so it has no probe id |
| /about | s00-header | header | ADAPTED | as home |
| /about | s01-about-premiere-roofing | page-head | ADAPTED | interior page-head strip; H1 and background image both ours |
| /about | s02-your-trusted-partner-in-roofing-so | about-intro | ADAPTED | opening prose band; original copy at matched length (D-10) |
| /about | s03-our-approach-quality-integrity | approach | ADAPTED | media-and-copy band recast on the workmanship proposition |
| /about | s04-our-core-values-what-drives-us | values | ADAPTED | values band; original copy, no invented credentials |
| /about | s05-why-premiere-roofing-is-the-right | why-choose | ADAPTED | reasons band; years-in-business and warranty claims removed as uninvented facts (D-14) |
| /about | s06-premiere-roofing-services | services-grid | ADAPTED | the same service grid as home, with our eight services |
| /about | s07-reputation-for-excellence | reputation | ADAPTED | reputation band; no review counts or star ratings (D-13) |
| /about | s08-what-sets-premiere-roofing-apart | what-sets-apart | ADAPTED | differentiators band, workmanship-led, no speed claims |
| /about | s09-join-our-family-of-satisfied-clien | closing-cta | ADAPTED | closing CTA band; call-now CTA replaces their estimate CTA |
| /about | s10 | footer-nap | ADAPTED | as home |
| /about | s11-footer | footer-legal | ADAPTED | as home |
| /about |  | call-bar | NOVEL | D-04 sticky call bar |
| /about |  | deleted-instant-quote | DELETED | as home |
| /services | s00-header | header | ADAPTED | as home |
| /services | s01-banner | services-banner | ADAPTED | services hero banner; three roofing pillars replaced by our repair pillars |
| /services | s02-commercial-roof-services | page-head | ADAPTED | interior page-head strip |
| /services | s03-protect-your-business-with-our-rel | services-intro | ADAPTED | opening media-and-copy band, rewritten for garage doors |
| /services | s04-don-t-let-a-faulty-roof-jeopardize | risk-band | ADAPTED | consequence-of-neglect band recast on a failing door |
| /services | s05-experience-unmatched-quality-and-r | quality-band | ADAPTED | quality band held on the workmanship proposition |
| /services | s06-protecting-your-investment-in-thre | process | ADAPTED | the same three-step process band as home |
| /services | s07-at-premiere-roofing-we-understand | services-detail | ADAPTED | the long service-detail band; carries our eight named services |
| /services | s08-commercial-roofing-image-gallery | deleted-gallery | DELETED | a gallery route is out of scope (D-01) and the band exists only to link to it |
| /services | s09-we-know-commercial-roofing | experience-band | ADAPTED | experience band; the "over 15 years" claim is removed as an uninvented fact (D-14) |
| /services | s10-our-certifications | credentials | ADAPTED | badge grid with TODO(fact) placeholder chips (D-14) |
| /services | s11 | footer-nap | ADAPTED | as home |
| /services | s12-footer | footer-legal | ADAPTED | as home |
| /services |  | faq | NOVEL | in-page FAQ accordion, /services only, generic garage-door technical content. The reference has zero accordions anywhere, so there is no counterpart band |
| /services |  | call-bar | NOVEL | D-04 sticky call bar |
| /services |  | deleted-instant-quote | DELETED | as home |
| /contact | s00-header | header | ADAPTED | as home |
| /contact | s01-get-an-estimate | page-head | ADAPTED | interior page-head strip |
| /contact | s02 | callback-form | ADAPTED | the estimate-form band; our five-field callback form replaces Formidable + reCAPTCHA, no email field and no backend (D-03, D-05) |
| /contact | s03 | footer-nap | ADAPTED | as home |
| /contact | s04-footer | footer-legal | ADAPTED | as home |
| /contact |  | contact-map | NOVEL | D-08 requires a map beside the form at zoom ~15; the reference page has no map band |
| /contact |  | call-bar | NOVEL | D-04 sticky call bar |
| /contact |  | deleted-instant-quote | DELETED | as home |
| /privacy | s00-header | header | ADAPTED | as home |
| /privacy | s01-privacy-policy | page-head | ADAPTED | interior page-head strip |
| /privacy | s02-information-collection-use-and-s | privacy-body | NOVEL | CLAUDE.md names the privacy policy body as the NOVEL exemplar: the text is generated from what our site actually does (D-16), not adapted from theirs. The ref id is carried anyway so the row still pairs and the band is not silently unpaired |
| /privacy | s03 | footer-nap | ADAPTED | as home |
| /privacy | s04-footer | footer-legal | ADAPTED | as home |
| /privacy |  | call-bar | NOVEL | D-04 sticky call bar |
| /privacy |  | deleted-instant-quote | DELETED | as home |

---

## 4. HUMAN TABLE — the same 63 rows, read in page order

**Edit this together with section 3.** If they disagree, section 3 is what runs.

### Section ORDER is ours, and it is not a class change (Prompt 3)

`diff.mjs` pairs rows on `ref-section-id`, never on position, so reordering a band changes
nothing measurable and is free to be an editorial decision. Four moves on `/`, all argued in
`docs/content-divergence.md`:

| ref order | our order |
|---|---|
| hero · intro · door-styles · services-grid · why-us · process · testimonials · promise · locations · new-door-cta · team · credentials | hero · intro · **process** · **services-grid** · **door-styles** · why-us · **promise** · **testimonials** · new-door-cta · credentials · **service-map** |

`process` lifts from seventh band to third (workmanship leads); `services-grid` and
`door-styles` swap (the symptom grid answers the question the visitor arrived with);
`promise` and `testimonials` swap (the argument lands better before the social proof, and it
keeps three literal `[TESTIMONIAL PLACEHOLDER]` blocks off the fold); `service-map` takes the
slot the deleted locations grid vacated.

On `/services`, the NOVEL `faq` band is inserted between `services-detail` and
`experience-band`.

**The `#` column below is the REFERENCE band ordinal, not our render order.** Read it as the
pairing key; read the table above for what actually renders in what sequence.

### `/` — home (15 reference bands, 13 kept, 2 deleted, 2 novel added)

| # | reference band (class attr) | our section | class |
|---|---|---|---|
| 0 | `#header` — fixed transparent overlay, 168px @1440 | `header` | ADAPTED |
| 1 | `#banner` — hero, three pillars + estimate form | `hero` | ADAPTED |
| 2 | `.main.section.sect-page_intro` | `intro` | ADAPTED |
| 3 | `.pricing-section.imvd--blue` — style slider **with prices** | `door-styles` | ADAPTED (prices stripped) |
| 4 | `.services.section` — service card grid | `services-grid` | ADAPTED |
| 5 | `.roofing.section` — slider + warranty claim | `why-us` | ADAPTED |
| 6 | `.plan.section` — three steps | `process` | ADAPTED |
| 7 | `.cust-rev.section` — review carousel | `testimonials` | ADAPTED (placeholders) |
| 8 | `.imvd.section.imvd--white` | `promise` | ADAPTED |
| 9 | `.locations.section` | — | **DELETED** (D-02) |
| — | *(no counterpart)* | `service-map` | **NOVEL** (D-08) |
| 10 | `.tob.section` — new-construction CTA | `new-door-cta` | ADAPTED |
| 11 | `.mtt.section` — six staff headshots | — | **DELETED** (D-09/D-17) |
| 12 | `.certifications.section` — badge grid | `credentials` | ADAPTED (TODO(fact) chips) |
| 13 | `.bottom-area` — fat NAP footer | `footer-nap` | ADAPTED (locations column scrubbed) |
| 14 | `#footer` — copyright strip | `footer-legal` | ADAPTED |
| — | *(no counterpart)* | `call-bar` | **NOVEL** (D-04) |
| — | `.instant-quote-new` overlay | — | **DELETED** |

### `/about` <- `/about-us` (12 bands, all 12 kept)

`header` · `page-head` · `about-intro` · `approach` · `values` · `why-choose` ·
`services-grid` · `reputation` · `what-sets-apart` · `closing-cta` · `footer-nap` ·
`footer-legal` — all **ADAPTED**. Plus `call-bar` (**NOVEL**) and the deleted overlay.

### `/services` <- `/commercial-roofing` (13 bands, 12 kept, 1 deleted, 1 novel added)

`header` · `services-banner` · `page-head` · `services-intro` · `risk-band` ·
`quality-band` · `process` · `services-detail` · `experience-band` · `credentials` ·
`footer-nap` · `footer-legal` — all **ADAPTED**.
`s08-commercial-roofing-image-gallery` -> **DELETED**.
Plus `faq` (**NOVEL**, in-page accordion, this route only) and `call-bar` (**NOVEL**).

### `/contact` <- `/get-an-estimate` (5 bands, all 5 kept, 2 novel added)

`header` · `page-head` · `callback-form` · `footer-nap` · `footer-legal` — all **ADAPTED**.
Plus `contact-map` (**NOVEL**, D-08 zoom ~15 beside the form) and `call-bar` (**NOVEL**).

### `/privacy` <- `/privacy-policy` (5 bands, all 5 kept)

`header` · `page-head` · `footer-nap` · `footer-legal` — **ADAPTED**.
`privacy-body` — **NOVEL** (D-16, generated from what our site actually does).
Plus `call-bar` (**NOVEL**).

---

## 5. Shared sections, and who owns them

`header`, `footer-nap`, `footer-legal` and `call-bar` are the **shell**. Per A-6 they are
lead-owned and frozen after Prompt 5; no section agent edits them. They appear as a row on
every route because they are measured on every route, not because there are five copies.

`services-grid` appears on `/` and `/about`, and `process` on `/` and `/services` — these
are genuinely the same component reused, exactly as the reference reuses its bands.
