# docs/content-divergence.md — Prompt 3, the lexical and structural gates

Every number below is produced by, and reproducible with:

```bash
node ../_shared/harness/src/serve-reference.mjs      # verify "Premiere Roofing"
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/refcopy.mjs      # -> .harness/refcopy.json
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs   # the table below
```

Reference corpus: the five saved pages in `reference/raw/`, extracted at the canonical
width 1440. Our corpus: `content/copy.ts`, which is the only place a rendered string exists
on this site.

## Result

| gate | rule | result |
|---|---|---|
| 5-gram | zero shared 5-grams against the **entire** reference corpus, all five pages, not just the paired section | **60/60 pass** |
| trigram | content-trigram Jaccard <= 0.15 against the paired reference section, stopwords and the industry allowlist removed | **60/60 pass**, highest observed **0.077** |
| length | every block within ±10% of its reference slot's character count | **37/37 measured pass**, 10 exempt under two declared rules |

Highest trigram on the site is 0.077, on `footer-legal` — a five-word copyright strip where
the only content words that survive stopword removal are "copyright", "rights" and
"reserved". Half the budget, on the one block where the overlap is unavoidable and harmless.

## Per-section table

`(metadata)` rows are the SEO title and description for each route, gated in the same pass
against the whole reference page. They live in `content/copy.ts` and every route file reads
them with `export const metadata = copy.routes['/x'].meta` — **no page file hardcodes a
string**. A sibling site hardcoded `metadata` into five page files, shipped the wrong city in
all five, and no gate could see it because no gate reads page files.

| route | our section | ref section | our chars | ref chars | Δ% | 5-grams | trigram | status |
|---|---|---|---|---|---|---|---|---|
| / | `header` | `s00-header` | 58 | 2159 | -97.3% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| / | `hero` | `s01-banner-get-a-free-estimate` | 709 | 710 | -0.1% | 0 | 0.000 | PASS |
| / | `intro` | `s02-residential-and-commercial-roofing` | 699 | 671 | +4.2% | 0 | 0.000 | PASS |
| / | `process` | `s06-protecting-your-investment-in-thre` | 754 | 755 | -0.1% | 0 | 0.000 | PASS |
| / | `services-grid` | `s04-premiere-roofing-services` | 145 | 145 | 0% | 0 | 0.000 | PASS |
| / | `door-styles` | `s03-choose-your-style` | 256 | 247 | +3.6% | 0 | 0.000 | PASS |
| / | `why-us` | `s05-the-best-choice-for-roofing` | 242 | 225 | +7.6% | 0 | 0.000 | PASS |
| / | `promise` | `s08-what-does-it-mean-to-have-a-dedica` | 925 | 936 | -1.2% | 0 | 0.000 | PASS |
| / | `testimonials` | `s07-customer-reviews` | 1254 | 1257 | -0.2% | 0 | 0.000 | PASS |
| / | `new-door-cta` | `s10-building-your-dream-home-we-ve-go` | 386 | 367 | +5.2% | 0 | 0.000 | PASS |
| / | `credentials` | `s12-certifications-awards` | 23 | 23 | 0% | 0 | 0.000 | PASS |
| / | `service-map` | — | 152 | — | — | 0 | 0.000 | PASS |
| / | `footer-nap` | `s13` | 438 | 2013 | -78.2% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| / | `footer-legal` | `s14-footer` | 80 | 86 | -7% | 0 | 0.077 | PASS |
| / | `call-bar` | — | 53 | — | — | 0 | 0.000 | PASS |
| / | `(metadata)` | `metadata` | 245 | — | — | 0 | 0.000 | PASS |
| /about | `header` | `s00-header` | 58 | 2298 | -97.5% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /about | `page-head` | `s01-about-premiere-roofing` | 21 | 22 | -4.5% | 0 | 0.000 | PASS |
| /about | `about-intro` | `s02-your-trusted-partner-in-roofing-so` | 535 | 516 | +3.7% | 0 | 0.000 | PASS |
| /about | `approach` | `s03-our-approach-quality-integrity` | 1390 | 1301 | +6.8% | 0 | 0.000 | PASS |
| /about | `values` | `s04-our-core-values-what-drives-us` | 184 | 203 | -9.4% | 0 | 0.000 | PASS |
| /about | `why-choose` | `s05-why-premiere-roofing-is-the-right` | 1391 | 1289 | +7.9% | 0 | 0.000 | PASS |
| /about | `services-grid` | `s06-premiere-roofing-services` | 145 | 145 | 0% | 0 | 0.000 | PASS |
| /about | `reputation` | `s07-reputation-for-excellence` | 366 | 364 | +0.5% | 0 | 0.000 | PASS |
| /about | `what-sets-apart` | `s08-what-sets-premiere-roofing-apart` | 884 | 872 | +1.4% | 0 | 0.000 | PASS |
| /about | `closing-cta` | `s09-join-our-family-of-satisfied-clien` | 472 | 473 | -0.2% | 0 | 0.000 | PASS |
| /about | `footer-nap` | `s10` | 438 | 2013 | -78.2% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /about | `footer-legal` | `s11-footer` | 80 | 86 | -7% | 0 | 0.077 | PASS |
| /about | `call-bar` | — | 53 | — | — | 0 | 0.000 | PASS |
| /about | `(metadata)` | `metadata` | 211 | — | — | 0 | 0.000 | PASS |
| /services | `header` | `s00-header` | 58 | 2622 | -97.8% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /services | `services-banner` | `s01-banner` | 767 | 736 | +4.2% | 0 | 0.000 | PASS |
| /services | `page-head` | `s02-commercial-roof-services` | 24 | 24 | 0% | 0 | 0.000 | PASS |
| /services | `services-intro` | `s03-protect-your-business-with-our-rel` | 510 | 515 | -1% | 0 | 0.000 | PASS |
| /services | `risk-band` | `s04-don-t-let-a-faulty-roof-jeopardize` | 534 | 506 | +5.5% | 0 | 0.000 | PASS |
| /services | `quality-band` | `s05-experience-unmatched-quality-and-r` | 589 | 586 | +0.5% | 0 | 0.000 | PASS |
| /services | `process` | `s06-protecting-your-investment-in-thre` | 901 | 847 | +6.4% | 0 | 0.000 | PASS |
| /services | `services-detail` | `s07-at-premiere-roofing-we-understand` | 971 | 886 | +9.6% | 0 | 0.000 | PASS |
| /services | `faq` | — | 2011 | — | — | 0 | 0.000 | PASS |
| /services | `experience-band` | `s09-we-know-commercial-roofing` | 308 | 295 | +4.4% | 0 | 0.000 | PASS |
| /services | `credentials` | `s10-our-certifications` | 18 | 18 | 0% | 0 | 0.000 | PASS |
| /services | `footer-nap` | `s11` | 438 | 2013 | -78.2% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /services | `footer-legal` | `s12-footer` | 80 | 86 | -7% | 0 | 0.077 | PASS |
| /services | `call-bar` | — | 53 | — | — | 0 | 0.000 | PASS |
| /services | `(metadata)` | `metadata` | 244 | — | — | 0 | 0.000 | PASS |
| /contact | `header` | `s00-header` | 58 | 2622 | -97.8% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /contact | `page-head` | `s01-get-an-estimate` | 14 | 15 | -6.7% | 0 | 0.000 | PASS |
| /contact | `callback-form` | `s02` | 1547 | 1437 | +7.7% | 0 | 0.000 | PASS |
| /contact | `contact-map` | — | 161 | — | — | 0 | 0.000 | PASS |
| /contact | `footer-nap` | `s03` | 438 | 2013 | -78.2% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /contact | `footer-legal` | `s04-footer` | 80 | 86 | -7% | 0 | 0.077 | PASS |
| /contact | `call-bar` | — | 53 | — | — | 0 | 0.000 | PASS |
| /contact | `(metadata)` | `metadata` | 217 | — | — | 0 | 0.000 | PASS |
| /privacy | `header` | `s00-header` | 58 | 2622 | -97.8% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /privacy | `page-head` | `s01-privacy-policy` | 14 | 14 | 0% | 0 | 0.000 | PASS |
| /privacy | `privacy-body` | `s02-information-collection-use-and-s` | 3483 | 3277 | +6.3% | 0 | 0.000 | PASS |
| /privacy | `footer-nap` | `s03` | 438 | 2013 | -78.2% | 0 | 0.000 | PASS (LENGTH EXEMPT) |
| /privacy | `footer-legal` | `s04-footer` | 80 | 86 | -7% | 0 | 0.077 | PASS |
| /privacy | `call-bar` | — | 53 | — | — | 0 | 0.000 | PASS |
| /privacy | `(metadata)` | `metadata` | 213 | — | — | 0 | 0.000 | PASS |
## The two length exemptions, and the twenty-two we refused

Exemptions are declared in `harness.config.mjs` under `lengthExempt`, as two `*::` rules
covering all five routes. Both are forced by the decision register, not chosen for
convenience.

| block | ref chars | ours | why the rule cannot apply |
|---|---|---|---|
| `header` | 2159 / 2298 / 2622 | 58 | The reference header's `textContent` is a nine-item mega-menu that spells out the whole site map — 44 navigation labels across residential, commercial, resources, locations and careers, plus four CallRail phone CTAs. **D-01 fixes this site at five routes** and forbids blog, gallery, FAQ, careers, booking and per-service routes; **D-02** scrubs the locations tree. Matching 2159 characters means inventing roughly forty destinations the register has already refused. The block length is a function of site size, and site size is fixed elsewhere in the contract. |
| `footer-nap` | 2013 | 438 | Same cause, same site map, repeated as four link columns plus a locations column. Our footer already carries every navigable thing this site has: NAP, hours, the single D-02 `SERVICE_AREA` sentence, five route links and a directions link. Reaching 2013 characters means padding with invented pages or invented prose. |

**What we refused to exempt.** The first draft missed tolerance on 22 blocks. Every one was
fixed by rewriting rather than exempting, including the three that were tempting:

- **`credentials`, a 23-character band.** The reference band is a heading plus fifteen
  certification images. Ours cannot carry chip text in the DOM without blowing a
  ±2-character budget — so the `TODO(fact)` marker renders **inside** the placeholder chip
  artwork, which is where the reference's own information lives too, and the band's DOM is a
  heading alone. `Credentials & Approvals` is 23 characters against a 23-character
  reference: exactly 0.0%. The same component on `/services` pairs to an 18-character band
  and takes a shorter heading, `Approvals & Awards`, rather than reusing home's and claiming
  an exemption.
- **`callback-form`, against a Formidable form.** The brief allows exempting a third-party
  form. We did not: five real fields, eight symptom options, three callback windows and two
  paragraphs of intake guidance reach 1547 against 1437, **+7.7%**.
- **`privacy-body`, 3277 characters.** Written to length, not exempted. **+6.3%**.

The first draft also ran **+19%** long on the privacy body and **+24.1%** on the services
grid. Both were cut, not excused.

## The four structural changes

### 1. Reorder — four moves on `/`

Class is unaffected: `diff.mjs` pairs on `ref-section-id`, not on position, so reordering
costs nothing measurable and is a genuine editorial decision rather than a way to dodge one.

| | order |
|---|---|
| reference | hero · intro · door-styles · services-grid · why-us · process · testimonials · promise · locations · new-door-cta · team · credentials |
| ours | hero · intro · **process** · **services-grid** · **door-styles** · why-us · **promise** · **testimonials** · new-door-cta · credentials · **service-map** |

Four moves, and one line of reasoning each:

- **`process` lifted from seventh band to third.** Workmanship is the proposition, so how the
  work is done comes before what is sold.
- **`services-grid` and `door-styles` swapped.** The symptom grid answers the question the
  visitor arrived with; the style catalogue answers one they may never ask.
- **`promise` and `testimonials` swapped.** The promise band argues the proposition and is
  stronger before the social proof than after it. It also stops the page's weakest content —
  three literal `[TESTIMONIAL PLACEHOLDER]` blocks — from sitting immediately under the fold.
- **`service-map` inserted above the footer**, in the slot the deleted locations grid vacated.

`/services` takes one insertion: the NOVEL `faq` band lands between `services-detail` and
`experience-band`, where the questions follow the eight headings that prompt them.

### 2. Drop two reference sections, add two of our own

Three and three, against a requirement of two and two.

| dropped | why | added |
|---|---|---|
| `s09-locations-we-serve` (`/`) | D-02 scrubs the locations grid, its nav item, its footer column and any `areaServed` array | `service-map` (NOVEL) — the D-08 home map at zoom ~13, in the same slot |
| `s11-meet-your-roof-team` (`/`) | six named staff with headshots. D-09 forbids the photos, D-17 forbids inventing the people, and D-13's placeholder licence covers reviews, not humans | `faq` (NOVEL) — `/services` only, in-page, generic garage-door technical content |
| `s08-commercial-roofing-image-gallery` (`/services`) | a gallery route is out of scope (D-01) and the band exists only to link to it | `contact-map` (NOVEL) — the D-08 map beside the form at zoom ~15 |

### 3. WORKMANSHIP held on all five routes, never speed

| route | where it is carried | the line that carries it |
|---|---|---|
| `/` | `hero`, `intro`, `promise` | "The repair holds" · "So we set the balance before we set anything else." |
| `/about` | `approach`, `why-choose`, `what-sets-apart` | "the only version of the job where you do not see us again for the same fault" |
| `/services` | `quality-band`, `risk-band` | "The part of the job you cannot see from the driveway" |
| `/contact` | `callback-form` | "If it turns out to be something you can safely sort yourself, we will tell you that on the phone" |
| `/privacy` | the policy itself | it describes what the site actually does rather than what a template says it does |

**Speed language appears nowhere.** No "same-day", no "fast", no "emergency", no "24/7", no
response-time claim, no after-hours claim. The reference leads on "Fast Details Estimate" and
"Call 24/7"; we deliberately do not. `same-day` sits in `industryAllowlist` only so that the
phrase could never manufacture a false n-gram match — it is not used in the copy.

### 4. Services regrouped by SYMPTOM

The reference groups by **system and material** — Asphalt Shingles, Metal Roofing, TPO,
Waterproofing / Roof Coatings, Skylights. We group by what the visitor can actually observe,
because nobody rings up asking for a torsion spring.

| symptom heading (what they see) | CONSTANTS service (what it is) |
|---|---|
| The spring snapped | spring repair and replacement |
| It will not open or close | opener repair and installation |
| It is loud and rough | cable / roller / track repair |
| A panel is bent or split | panel replacement |
| It sits crooked in the opening | off-track and misaligned door correction |
| I want a different door | new residential door installation |
| It is a shop or roll-up door | commercial and roll-up doors |
| I want it checked before it fails | annual maintenance and tune-up |

**All eight CONSTANTS services appear exactly once**, in `services-detail` on `/services`,
each paired with its symptom. `services-grid` (on `/` and `/about`) and the form's service
select carry the **symptom labels only** — no service name is repeated as a second canonical
listing.

The reference grid has a **fixed card count of eight**, so the regrouping is geometrically
free: eight symptoms into eight cards, no grid change, and the band lands at 145 characters
against 145.

## Reclassification — the audit, and why the list is short

Reordering, dropping and regrouping are **not** class changes, and `docs/sections.md` names
"reclassifying ADAPTED→NOVEL to dodge a structural comparison" as the failure mode to watch
for. Eight candidates were examined against CLAUDE.md's definitions.

| candidate | information content after the swap | class | verdict |
|---|---|---|---|
| `/` `door-styles` | the reference band is a **price table** — three monthly figures and three price ranges. D-12 removes every one | ADAPTED | **held.** The purpose (browse door styles) survives with images, names and CTAs. Purpose survives → ADAPTED |
| `/` `why-us` | all five reference items are struck out by the register: warranty (D-14), financing (D-12), insurance-claims and maintenance programmes (D-17), and "fast estimate" (no speed lead) | ADAPTED | **held**, and this was the closest call. The band is retained and its purpose is unchanged; a swapped list is the textbook ADAPTED definition. Reclassifying it would pull one of the page's most geometry-heavy bands out of structural measurement entirely |
| `/` `promise` | the reference band is a Vimeo hype video plus a "dedicated roof team" explainer. We ship no video (D-15) and have no team to describe (D-17) | ADAPTED | **held.** Same band, same job, different argument |
| `/` + `/services` `credentials` | fifteen third-party badges we do not hold and may not invent (D-14). The band now carries geometry and nothing else | ADAPTED | **held.** Geometry is precisely what ADAPTED measures |
| `/` `testimonials` | real reviews replaced by literal placeholders (D-13) | ADAPTED | **held** |
| `/` + `/about` `services-grid` | regrouped by symptom | ADAPTED | **held** — regrouping is explicitly not a class change |
| `/privacy` `privacy-body` | already NOVEL, and CLAUDE.md names it as the NOVEL exemplar. It keeps its ref id `s02-...` so the row still pairs and the length rule still bites | NOVEL | **held** |
| `/` `service-map` | replaces the deleted `s09-locations-we-serve`. Promoting it to ADAPTED with `s09`'s ref id would buy a structural comparison, but `s09` is already claimed by a DELETED row and two rows cannot hold one ref id | NOVEL | **held** |

**Reclassifications: 0.** Two *factual* corrections were made to `docs/sections.md` in the
same pass, neither of them a class change:

1. §1 justified `page-head`'s ADAPTED class partly on "the band's background is a roofing
   photograph we are forbidden to reuse". **There is no such photograph.** The Prompt 2 asset
   probe finds zero background images on `/about-us` and `/privacy-policy`, and the only ones
   on `/get-an-estimate` and `/commercial-roofing` belong to other bands. `page-head` is a
   solid strip. The ADAPTED class still holds on the H1-length grounds given alongside it, and
   the four `page-head` bands are **not** placeholder-blocked.
2. The home band order in §4 now reflects the four reorder moves above.

## Unmeasurable-row check

`docs/sections.md` warns that an ADAPTED or FIDELITY row with an empty ref column silently
skips both the structural comparison **and** the length rule, and that nothing reports it as
an exemption. Checked explicitly:

- **46 ADAPTED rows, all 46 carry a ref id.** Zero empty. FIDELITY is 0 on this site, so
  there is nothing else to check.
- The four empty-ref rows are `service-map`, `call-bar`, `faq` and `contact-map` — all NOVEL,
  the only class permitted an empty ref.
- **One real pairing bug was found by this check.** `services-grid` on `/about` was carrying
  home's `s04-premiere-roofing-services`. On `/about-us`, ordinal 4 is **Our Core Values**
  (203 chars), not the service grid — so the row was measuring against the wrong band and
  reporting a false −11.3%. Corrected to `s06-premiere-roofing-services`, which is what
  `docs/sections.md` said all along; it now reads 145 against 145.

## Where the privacy body was watched hardest

Two sibling sites had genuine lifts caught here — "we are not responsible for", "we do not
knowingly collect" — boilerplate that reads generic but is copied. Our policy is written
against what the site actually does (D-16) in an operational voice, and the usual
formulations are avoided by construction: there is no "reserve the right", no "continued use
constitutes acceptance", no "not responsible for the practices of", and the children's
section says the form transmits nothing anywhere rather than reciting the standard clause.

Result on the paired band: **0 shared 5-grams, trigram 0.000, +6.3% on length.**

## No invented facts

Three `TODO(fact)` markers render **visibly** in the copy and all three are in
`docs/facts-needed.md`. Nothing on this site states a credential, a year founded, a job
count, a review count, a star rating, a price, a response time or a team size.
