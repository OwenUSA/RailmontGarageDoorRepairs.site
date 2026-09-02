# docs/facts-needed.md — every `TODO(fact)` on this site

Opened at Prompt 2+3+4. D-17: never guess. Anything not in CLAUDE.md CONSTANTS is a
`TODO(fact):` marker that **renders visibly**, is listed here, and is supplied by the owner
before launch.

The distinction that matters: **CONSTANTS are fictional but decided** — they are ground truth
for the build and are listed separately in `docs/PRE-LAUNCH.md` as must-replace-before-public.
Everything on *this* page is not decided at all. It has no value yet, fictional or otherwise,
and nothing on the site asserts one.

## Open facts

| # | fact needed | where it renders | what is shipped instead | blocked by |
|---|---|---|---|---|
| F-01 | **Customer reviews** — real quotes with permission to publish | `/` `testimonials` | three literal `[TESTIMONIAL PLACEHOLDER]` blocks at realistic length, plus a visible `TODO(fact)` line | D-13. No named customer, no quote, and **no `AggregateRating` or `Review` JSON-LD at all** — fabricated review markup is a legal problem, not a content gap |
| F-02 | **Star rating and review count** | would sit in `/` `testimonials` and `/about` `reputation` | nothing renders | D-13 |
| F-03 | **Years in business / year founded** | `/about` `reputation`; the reference makes an "over 15 years" claim in the equivalent `/services` band | nothing renders; the claim is scrubbed from `experience-band` | D-14 |
| F-04 | **Jobs completed / doors serviced** | `/about` `reputation` | nothing renders | D-14 |
| F-05 | **Team size and any named staff** | would be the home `deleted-team` band | **the band is deleted outright.** There is no D-13-style placeholder licence for people: we may not reuse their headshots (D-09) and may not invent ours (D-17) | D-09 + D-17 |
| F-06 | **Licence, bonding and insurance status** | `credentials` on `/` and `/services` | `TODO(fact)` chips at the reference's badge dimensions | D-14 |
| F-07 | **Trade certifications and manufacturer approvals** | same band | same chips | D-14 |
| F-08 | **Awards and local "best of" listings** | same band | same chips | D-14 |
| F-09 | **Response time / dispatch window** | nowhere | nothing renders, anywhere. The proposition is workmanship, never speed, and no route makes a timing claim | D-14 + the pre-answered proposition |
| F-10 | **Warranty and guarantee terms** | would be `/` `why-us`, where the reference has "Lifetime Workmanship Warranty" | the item is replaced with a description of what we do on the visit, which is not a warranty | D-14 |
| F-11 | **Financing terms** | would be `/` `why-us` and the header's GET FINANCING link | the link is scrubbed and the item is replaced | D-12 + D-17 |
| F-12 | **Prices, price ranges, "starting at" figures** | would be `/` `door-styles`, which on the reference is a **price table** with three monthly figures and three ranges | every figure is stripped; the band keeps its geometry as a style browser. "Free estimate" is the only permitted commercial claim (D-12) | D-12 |
| F-13 | **Insurance-claims assistance and maintenance-agreement programmes** | `/` `why-us`, two of the reference's five items | replaced with workmanship items | D-17 |
| F-14 | **Logo asset** — wordmark plus icon lockup | `header` (all routes), `footer-nap` (all routes) | a wordmark set in Teko, the display face. Header box 130x99 / 153x117 / 260x198; footer box 330x111 / 471x158 / 427x143 — the aspect differs, so this is two crops | D-09. The prompt for it is written in `docs/asset-prompts.md` at Prompt 10/11 with the applied palette hues named |

## The `credentials` band, in detail

`credentials` is the only band whose entire information content is `TODO(fact)`. **16 badge
slots** were inventoried — 15 on `/`, one additional on `/services` — at these rendered
dimensions:

| slot | 390 | 768 | 1440 |
|---|---|---|---|
| `credential-badge-best-of-irmo-2023` | 158x88 | — | 158x88 |
| `credential-badge-best-of-irmo-2024` | 158x88 | — | 158x88 |
| `credential-badge-eos` | 139x86 | — | 139x86 |
| `credential-badge-everest-systems-certified-installers` | 225x63 | 155x43 | 225x63 |
| `credential-badge-gaf-coating-pro` | 219x94 | 155x67 | 219x94 |
| `credential-badge-gaf-gold-elite-commercial-contractor` | 183x120 | 155x102 | 183x120 |
| `credential-badge-img-cert1` | 134x146 | — | 134x146 |
| `credential-badge-img-cert3` | 134x146 | — | 134x146 |
| `credential-badge-img-cert5` | 225x86 | 155x59 | 225x86 |
| `credential-badge-irmo-chapin2024-1` | — | — | 170x170 |
| `credential-badge-mule-hide-certified` | 184x63 | 155x53 | 184x63 |
| `credential-badge-roofing-contractors-columbia-2025-drk` | 170x170 | — | 170x170 |
| `credential-badge-select-shinglemaster-1` | — | — | 170x170 |
| `credential-badge-the-states-best-of-2018` | 195x170 | — | — |
| `credential-badge-verico-authorized-contractor` | 219x120 | 155x85 | 219x120 |
| `credential-badge-duro-last-certified-installers` (`/services`) | 225x120 | 155x83 | 200x107 |

**Where the marker renders.** The band's DOM carries a heading and nothing else — 23
characters on `/`, 18 on `/services`, both at 0.0% against their reference bands. The
`TODO(fact)` text is painted **inside the placeholder chip artwork**, which is where the
reference's own information lives too. This is not a way of hiding the marker: it is visible
on the page at the chip's real dimensions, exactly as D-14 asks. It is a way of keeping a
23-character band measurable instead of exempting it from the length rule.

## Facts we deliberately did NOT need

Recorded so nobody re-derives them:

- **Service area.** `SERVICE_AREA` is in CONSTANTS. D-02 removes the locations grid, its nav
  item, its footer column and any `areaServed` array; the one sentence in the footer is the
  only survivor.
- **Hours.** In CONSTANTS. Seven days, 7:00 AM to 7:00 PM, one block, no split hours, and
  **no invented 24/7 or after-hours claim** (D-06).
- **Phone, address, coordinates, business name, tagline.** All in CONSTANTS, all fictional,
  all in `docs/PRE-LAUNCH.md`.
- **The eight services.** Pre-answered in CLAUDE.md and used verbatim.

## Sweep

```bash
rg -n "TODO\(fact\)" content app components docs/behavior
```

Current count in rendered copy: **2 markers in `content/copy.ts`** (F-01 and the combined
F-02/F-03/F-04 line), plus the chip artwork for F-06/F-07/F-08. Every other row above is a
fact that is simply **absent** — the correct treatment for a claim we cannot make, since a
visible placeholder for a warranty we do not offer would itself be misleading.
