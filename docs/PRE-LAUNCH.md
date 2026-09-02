# docs/PRE-LAUNCH.md — blockers before this site is public

**This site is not launchable as it stands.** Every line below is a blocker, not a
suggestion. The site is a local-only build on port 3108 (D-18): no deploy, no domain, no
env vars, no database, no third-party keys, no analytics.

Two categories, and the difference matters:

- **§1 FICTIONAL CONSTANTS** — decided, deliberate, and wrong on purpose. They are ground
  truth for the build and every one must be replaced with a real value.
- **§2 UNINVENTED FACTS** — never decided at all. They have no value, fictional or
  otherwise, and nothing on the site asserts one. They render as visible `TODO(fact)`
  markers. Full detail in `docs/facts-needed.md`.

---

## 1. FICTIONAL CONSTANTS — each named individually, each must be replaced

Declared once in `content/copy.ts` and re-exported by `lib/business.ts`. After the Prompt 11
NAP dedupe each fact exists in exactly one place, so replacing it is one edit per row.

| # | constant | fictional value shipped | what it must become | where it surfaces |
|---|---|---|---|---|
| P-01 | **Business name** | **Railmont Garage Door Repairs** | the real trading name | every `<title>`, the header and footer lockups, `LocalBusiness` JSON-LD `name`, the privacy policy postal contact, the logo artwork in `docs/asset-prompts.md` |
| P-02 | **Telephone** | **(803) 555-0164** — inside the **555-01XX reserved range**, so it *cannot ring anyone* | the real number, in both display and `tel:` digit form | every `tel:` link (`tel:+18035550164`), the header CTA, the mobile call bar, the footer NAP, the contact band, JSON-LD `telephone`, the `/contact` and `/` meta descriptions, the privacy policy contact section |
| P-03 | **Street address** | **873 Wexbury Landing, Fort Mill, SC 29708** — **this address does not exist** | the real postal address | the footer NAP, the `/contact` band beside the map, JSON-LD `PostalAddress` (`streetAddress` / `addressLocality` / `addressRegion` / `postalCode`), the privacy policy postal contact |
| P-04 | **Map coordinates** | **35.0074,-80.9451** — real Fort Mill, SC coordinates, deliberately **not** the fake address | the real premises coordinates | both `<iframe>` embeds (`?q=<coords>&z=13` on `/`, `&z=15` on `/contact`), both "Get directions" links, JSON-LD `GeoCoordinates` |
| P-05 | **Tagline** | *Set true, torqued to spec, and left running quiet.* | keep or replace, but it is currently JSON-LD `description` — check it is a claim the business will stand behind | JSON-LD `description`, hero |
| P-06 | **Service area sentence** | *Serving Fort Mill and the York County line.* | the real service area | the footer, once per page — the **only** survivor of the D-02 locations scrub |
| P-07 | **Hours** | **7 days, 7:00 AM – 7:00 PM** | the real hours | the footer NAP, the contact band, `openingHoursSpecification` (`opens: 07:00`, `closes: 19:00`, all seven days) |
| P-08 | **Site URL** | `http://localhost:3108` (`lib/business.ts`) | the real origin | `metadataBase`, every `<link rel="canonical">`, `sitemap.xml`, `robots.txt`, JSON-LD `url` and `image` |

### D-07 warning that survives launch

The map is addressed **by coordinates only** and the address is rendered as text beside it.
When the real address lands, that is still the correct construction — do not switch the
embed to an address string, and never pass an address to a geocoder as part of a build step.

---

## 2. UNINVENTED FACTS — every `TODO(fact)` must be resolved or removed

**7 `TODO(fact)` markers in code**, rendering as **36 visible markers on `/`, 32 on
`/services`, 3 on `/about`.** Fourteen distinct facts, F-01 to F-14, are tabulated in
`docs/facts-needed.md`. Not one may be guessed (D-17).

| must be supplied, or the affected element deleted | ref |
|---|---|
| **Customer reviews** — real quotes with permission to publish. Three `[TESTIMONIAL PLACEHOLDER]` blocks ship today | F-01 |
| **Star rating and review count** — nothing renders today, and **no `AggregateRating` or `Review` JSON-LD exists anywhere on this site.** If reviews are added, the markup must be added with them, and only for reviews that actually exist | F-02 |
| **Years in business / year founded** | F-03 |
| **Jobs completed / doors serviced** | F-04 |
| **Team size and any named staff** — the whole team band is deleted, not placeheld | F-05 |
| **Licence, bonding and insurance status** | F-06 |
| **Trade certifications and manufacturer approvals** | F-07 |
| **Awards and local listings** | F-08 |
| **Response time / dispatch window** — nothing renders anywhere; the proposition is workmanship, never speed | F-09 |
| **Warranty and guarantee terms** | F-10 |
| **Financing terms** | F-11 |
| **Prices, ranges, "starting at"** — every figure is stripped; "free estimate" is the only commercial claim on the site | F-12 |
| **Insurance-claims and maintenance-agreement programmes** | F-13 |
| **Logo asset** — wordmark + icon lockup | F-14 |

**The 16 `credential-badge-*` slots are the point of this section.** They ship as visible
`TODO(fact)` chips at the reference's own badge dimensions and are **refused** in
`docs/asset-prompts.md` (R-01). A generated badge would assert a credential we do not hold.
When real credentials exist, the artwork comes from the certifying body — never from an
image generator.

---

## 3. Assets — every photograph and the logo

**47 REPLACE slots ship as generated SVG placeholders** (`public/placeholders/`, 66 files
including 19 `-alt` crops). **Zero assets belonging to the reference were downloaded into
this repo** (D-09), and none may be.

- Run every prompt in **`docs/asset-prompts.md`** through Nano Banana Pro and drop the files
  in. The chroma ceiling in §2 of that file is load-bearing: an over-saturated photograph
  fails `rendertruth.mjs`'s `cta-primacy` check after drop-in.
- **The logo does not exist yet.** Two crops are required — header 1.31:1, footer 2.99:1 —
  plus the 5.05:1 `cta-lockup` variant. Prompts are written; artwork is not.
- **`intro-bg`, `process-bg` and `experience-bg` are deliberately unmounted.** Mount them
  only after re-running `contrast.mjs` and confirming the band still scores rather than
  reporting `UNMEASURABLE`.
- Re-run `diff.mjs`, `contrast.mjs` and `rendertruth.mjs` after drop-in. `contrast.mjs` must
  read **0 FAIL and 0 UNMEASURABLE**.

---

## 4. Legal and functional blockers

| # | blocker | detail |
|---|---|---|
| L-01 | **Privacy policy requires legal review** | The file carries `<!-- UNREVIEWED TEMPLATE — requires legal review before launch -->` at the top. It is written to match what the site actually does — a phone-callback form, no email collection, no analytics, no cookies beyond framework defaults — and it **does not claim GDPR or CCPA compliance** (D-16). If any tracker, pixel, chat widget or cookie banner is ever added, the policy is wrong the moment it ships. |
| L-02 | **Testimonials: real or removed** | Three `[TESTIMONIAL PLACEHOLDER]` blocks are live on `/`. Publishing them as-is is not an option, and inventing quotes is worse. Either real, attributed, permissioned quotes go in, or the band comes out. |
| L-03 | **The contact form has no submission target** | `components/sections/CallbackForm.tsx` is marked `// STUB: no submission target`. Five fields — name, phone, service needed, preferred callback window, message — with client-side validation only; on submit it shows a "we'll call you back" state and `console.warn`s a stub notice. **A submitted form currently reaches nobody.** Give it a real endpoint, and note D-03 still bans email: the destination cannot be a mail relay or an `<input type="email">`. |
| L-04 | **JSON-LD must be re-verified after every fact above lands** | The `LocalBusiness` block deliberately omits `email` (D-03), `aggregateRating` and `review` (D-13), `priceRange` (D-12), `areaServed` (D-02), and `founded` / `numberOfEmployees` / `hasCredential` (D-14, D-17). Re-validate the whole block once P-01…P-08 are real, and **do not add a property to make the schema "complete"** — each absence is a decision. |
| L-05 | **No trackers, and the policy says so** | No analytics, no pixels, no chat widget, no cookie banner (D-15). Adding any of them re-opens L-01. |

---

## 5. Gates DROPPED by A-4 — never run, nothing substituted

Both are stated in the exact words the amendment requires.

- **performance never measured**
  Lighthouse was dropped on all five routes and no substitute was run. There is no
  performance number for this site — not a good one, not a bad one. Measure before launch.

- **keyboard access is spec-verified only, never hand-tested**
  The manual keyboard-only pass was dropped. What exists is programmatic verification
  against `docs/behavior/`: the drawer toggle's `aria-expanded` flips on Enter and returns
  focus on Escape; the first Tab stop is the skip link; the six `<details>`/`<summary>` FAQ
  items are focusable and operate on Enter; all 29 interactive elements on `/contact` are in
  the tab order with no `tabindex="-1"`; both map bypass anchors are the first child of
  their band with a live target; no `tel:` link falls under 44px at 390; and
  `prefers-reduced-motion: reduce` leaves zero elements with a transition or animation over
  1ms. **No human has driven this site from a keyboard.** Do that before launch.

---

## 6. Deployment

`next.config.ts` emits `output: 'standalone'` on Linux only — the Windows standalone tracer
symlinks into the pnpm store and fails with EPERM, so local builds skip it and
`scripts/start-standalone.mjs` falls back to `next start` against the same `.next`. The
Hostinger path (`$PORT`, `.next/standalone/server.js`) is unchanged. **Do not revert
`output: 'standalone'`.**

`lib/business.ts` still hardcodes `siteUrl = 'http://localhost:3108'` (P-08). Canonicals,
the sitemap, `robots.txt` and the JSON-LD `url` all derive from it, so it is the single edit
that makes the site addressable — and until it is made, every canonical on the public site
would point at localhost.
