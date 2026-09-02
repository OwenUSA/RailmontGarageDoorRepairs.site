# docs/profile.md — reference profile (Prompt 1)

**Reference:** `https://roofteam.com/` — Premiere Roofing, South Carolina.
**Profiled from:** the SAVED copy in `reference/raw/`, served by
`node ../_shared/harness/src/serve-reference.mjs` on `http://127.0.0.1:3208` (A-15).
The live site was never fetched during this profile.

Identity verified before any capture was trusted:

```
reference served on http://127.0.0.1:3208
  serving: Premiere Roofing - Roofing Services in South Carolina
```

Raw data: `.harness/profile/ref-<page>-<bp>.json` (20 passes, 5 pages x 390/430/768/1440).

---

## 1. Framework

| | |
|---|---|
| CMS | WordPress 7.0.2 |
| Theme | `splashomnimediatheme` (bespoke, Bootstrap-5 grid classes) |
| Page builder | **none** — not Divi, not Elementor, not Avada/Fusion |
| JS | jQuery only (`$`, `jQuery` are the only recognised globals on `window`) |
| Drawer | jQuery.mmenu (`body.mm-page.mm-slideout`, `.mm-line` hamburger bars) |
| Forms | Formidable Forms + Formidable Pro, with Google reCAPTCHA |
| Perf/CDN | RabbitLoader (`rl-lazyload`, `data-rl-src`, `type="text/rlscript"`) |
| Search | ElasticPress |
| Third-party | Roofle instant-quote widget, CallRail number-swap, GA4, Vimeo player |

**There is not a single `<section>`, `<header>`, `<footer>`, `<main>` or `<nav>` tag on any
of the five pages.** The entire document body is `<div>`s (390 of them on home). Every
tag-shaped section candidate scores 0, which is why `sectionCandidates` had to be rewritten
per-site — see section 5.

---

## 2. Page heights and section counts

Section count is **identical at every breakpoint on every page** — no band splits anywhere,
so the probe's ordinal ids are stable across the whole `BP_SET`. That is the precondition
`docs/sections.md` depends on.

| ref page | our route | sections | H @390 | H @768 | H @1440 | tallest/shortest |
|---|---|---|---|---|---|---|
| `/` | `/` | **15** | 19443 | 12004 * | 15868 | 1.22x |
| `/about-us` | `/about` | **12** | 8741 | 7970 | 6885 | 1.27x |
| `/commercial-roofing` | `/services` | **13** | 10590 | 9547 | 7754 | 1.37x |
| `/get-an-estimate` | `/contact` | **5** | 5539 | 4241 | 3310 | 1.67x |
| `/privacy-policy` | `/privacy` | **5** | 6254 | 4405 | 3343 | 1.87x |

\* **Known measurement artefact, not a layout fact.** `profile-reference.mjs` does not
scroll, so RabbitLoader had not swapped every lazy image at 768 on home in that pass; a
scrolled probe of the same page and width returns **17747**. `capture.mjs` scrolls, so the
capture-side numbers are the ones to trust. Recorded here so nobody re-derives it.

Interior pages are ~1.7-1.9x taller at 390 than at 1440; home is only 1.22x, because home's
tall bands (pricing slider, reviews, certifications) are already vertical at 1440.

---

## 3. CSS breakpoints present

15 stylesheets, 577,968 bytes of CSS mined (cross-origin sheets re-fetched and parsed).
33 distinct `min-`/`max-width` conditions. The dominant set is stock Bootstrap 5, with the
theme adding its own `-1px` variants and a handful of one-off widths.

| width | hits | family | measured? |
|---|---|---|---|
| min-1200 | 26 | Bootstrap `xl` | no — 1440 is above it |
| min-992 | 15 | Bootstrap `lg` | no |
| min-1400 | 15 | Bootstrap `xxl` | **yes — 1440 sits just above it** |
| min-576 | 14 | Bootstrap `sm` | no |
| min-768 | 12 | Bootstrap `md` | **yes — 768 is exactly on it** |
| max-575.98 / 767.98 / 991.98 / 1199.98 / 1399.98 | 10 each | Bootstrap down-variants | 767.98 and 575.98 covered by 390 |
| max-768 / max-991 / max-767 | 7 / 7 / 6 | theme | 767 covered by 390 |
| min-481, min-550, min-601, min-769, min-1700 | 4/2/1/2/3 | theme one-offs | no |
| max-480, 500, 575, 576, 600, 700, 750, 760, 782, 900, 1199, 1399, 1699 | 1-4 each | theme one-offs | 390 covers everything <= 480 |
| max-175 | 2 | icon-sizing edge case | no |

**`BREAKPOINTS` (CLAUDE.md CONSTANTS) resolves to: 576 / 768 / 992 / 1200 / 1400
(Bootstrap 5), plus theme one-offs at 480, 600, 700, 900 and 1700.**

**`BP_SET` stays 390 / 768 / 1440**, exactly three, per CLAUDE.md. 390 is below every
`min-` and inside every `max-` in the mobile family; 768 lands **exactly on** the primary
`min-768` restack, which is where the grid resolves; 1440 is above `min-1400`, the widest
real tier. **Skipped deliberately and not measured: 576, 992, 1200, 1400, 1700, and every
theme one-off.** Do not add a fourth width for any of them (cost-discipline rule).

---

## 4. Fonts — enumerated AND status-checked

`document.fonts` on all five pages, at all widths:

| family | faces declared | faces actually loaded | used by | licence |
|---|---|---|---|---|
| **hind** | 300/400/500/600/700 | 400, 500, 700 always; 600 on home | body text — 414-662 elements/page | Google Fonts, **OFL** |
| **teko** | 300/400/500/600/700 | 400, 600, 700 always; 500 on home | display/headings — 52-78 elements/page | Google Fonts, **OFL** |

Body computed font is `hind, sans-serif` at `18px`. Headings and the pricing/stat display
type are `var(--FF-Teko)`.

**PHANTOM FACES — no substitution floor for any of these.** These names appear in
`font-family` declarations mined from the CSS but have **zero `@font-face` rules, zero
loaded faces and zero computed usages** on any page. They are Bootstrap defaults and dead
theme rules:

`Montserrat`, `Bebas Neue`, `Nanum Pen`, `var(--font)`, `var(--bs-font-sans-serif)`,
`var(--bs-body-font-family)`, `var(--bs-font-monospace)`, `var(--bs-btn-font-family)`.

(`Lucida Grande` does compute on exactly 2 nodes per page — a reCAPTCHA-adjacent UA
fallback, not a design decision.)

### Consequence for D-11: **NO FONT SUBSTITUTION FLOOR IS BOOKED ON THIS SITE.**

Hind and Teko are the only real faces, both are Google/OFL, and both are available through
`next/font/google`. We use the *same* families, not substitutes, so there is no text-metric
delta to excuse and `docs/known-divergence.md` gets **no** font row. A sibling booked a
permanent floor for what turned out to be a hosting control-panel font and permanently
excused a heading that should have converged; that is what this section exists to prevent.

---

## 5. Segmentation — what actually works, and three traps

`sectionCandidates` scored on home @1440:

| candidate | outer bands |
|---|---|
| `main > section`, `section`, `header`, `footer`, `nav` | **0** (no such tags exist) |
| `.section` | 10 — misses `banner`, `inner-head`, `pricing-section`, `bottom-area` |
| `.container` | 15, but they are inner wrappers, not bands |
| **`#page > div`** | **16** — the real band container |

Adopted: **`#page > div:not(.instant-quote-new)`**, then `#page > div`, then
`main > section`, then `section` (the last two are for OUR side, which has no `#page`).

**Trap 1 — `.instant-quote-new` must be excluded from segmentation, and this is
load-bearing.** The Roofle instant-quote widget is an absolutely-positioned overlay inside
`#page`. `segmentSections()` sorts bands by `docTop`, so the overlay sorts into a
**different ordinal slot at 390 than at 768/1440** (on `/about-us` it is index 2 at the two
wider widths and index 3 at 390). That shifts every id after it and unpairs the page — the
exact ordinal-shift failure the brief warns about. It is also `DELETED` by contract (no
quote tool among our five routes), so excluding it costs nothing. With the exclusion, all
five pages emit byte-identical id lists at 390, 768 and 1440 (verified).

**Trap 2 — bare `header`/`footer` in `chromeSelectors`.** The reference's chrome is
`DIV#header` / `DIV#footer` (**id, not tag**), and both are already `#page` children, so on
the reference side the chrome entries are a no-op the containment check absorbs. The tag
entries exist only for OUR side, whose shell is a real `<header>`/`<footer>`.
`chromeSelectors = ['#header', '#footer', 'header', 'footer']` — all exact, no `[class*=]`.
`.bottom-area` (the fat NAP/locations block) is deliberately **left out**: it is already a
`#page` band, and listing it would only risk swallowing a sibling band.

**Trap 3 — lazy-loading placeholders: CHECKED, and NOT biting here.** RabbitLoader ships
every `<img>` with a base64 1x1 SVG in `src` and the real URL in `data-rl-src`. Its own
runtime (`rl.cl.m.v5.3.27.js`) loads from the CDN and performs the swap, so images do
resolve: home **46/51** at 390 and 1440, **80/89** at 768; `/commercial-roofing`
**51-56 / 58-63**. The 5-7 unresolved on every page are the hidden mega-menu testimonial
thumbnails, which never enter the viewport. **No `data-rl-src` -> `src` forcing is needed.**
If the CDN ever stops answering, that rewrite is the fix, and it is what took a sibling from
15 to 108 resolved images.

---

## 6. Static vs fetched

Every one of the five pages is **server-rendered static WordPress HTML**. Nothing in the
measured layout is client-fetched; no route is behind auth, and nothing is geo-gated.
Client-side additions, all outside the measured bands:

- Roofle instant-quote widget (`app.roofle.com`) — injects the `.instant-quote-new` overlay.
- CallRail `swap.js` — rewrites displayed phone numbers after load. **We ship no equivalent:
  `PHONE` is static.**
- Google reCAPTCHA iframe inside the Formidable form on `/` and `/get-an-estimate`.
- Vimeo player iframe on `/`.
- A 1x1 tracking iframe on every page.

**None of these are cloned** (D-15: no analytics, no chat widget, no cookie banner, no
tracking pixels; D-03: no third-party form backend).

---

## 7. Motion — scroll-linked or time-driven?

**Neither. Nothing initialises.** Checked by name across all five saved pages and on the
live DOM of all five served pages:

| library / signal | occurrences |
|---|---|
| GSAP, ScrollTrigger | 0 |
| Lenis, Locomotive | 0 |
| AOS, `[data-aos]` | 0 |
| WOW.js, animate.css | 0 |
| Swiper, Slick, OwlCarousel | **0 scripts loaded** |
| `will-change` other than `auto` | **0 elements, every page** |
| parallax attributes | 0 |
| scroll listeners driving transforms | none found |

`slick` appears 21 times on home purely as the **class name** `.slick-pricing` in inline
CSS; no Slick script is enqueued. `wow`/`owl` matches were substrings of the word
"knowledge" and of base64. The sliders (`.roofing-slider`, `.cust-slider`, `.cert-slider`,
`.mcs-slider`) are driven by the theme's own `scripts.js` on jQuery — time-driven at most,
with no scroll coupling.

391-556 elements per page carry a non-zero `transition-duration` or a named `animation` —
these are ordinary CSS hover/focus transitions on links, buttons and cards, not
choreography.

The sticky header does **not** change on scroll: `headerAtTop` and `headerScrolled` are
identical (`position: fixed`, `height: 168`, `background: rgba(0,0,0,0)`,
`box-shadow: none`, `transform: none`, `topOffset: 0`). It is a transparent fixed overlay in
both states.

### **`framer-motion` is NOT justified on this site.**

Stated explicitly, as the dependency allowlist requires. There is no real choreography to
reproduce — CSS transitions plus `prefers-reduced-motion` cover everything the reference
does. Do not install it in any later prompt without a new, written justification.

---

## 8. State inventory

| state | where | notes |
|---|---|---|
| Sticky header | all 5 pages | `position: fixed`, transparent, **no scrolled variant** (168px @1440, 116px @768, 90px @390) |
| Mobile nav drawer | all 5 pages < 768 | jQuery.mmenu slide-out; toggle is `.nav-btn > a` (two `span.mm-line` bars); **no `aria-expanded` anywhere** |
| Mega-menu / sub-menus | header, >= 768 | 9 `.menu-item-has-children`, 9 `.sub-menu`; hover-opened; contains 5 hidden testimonial images |
| Carousels | `/` x4, `/services` x1 | `.slick-pricing.mcs-slider`, `.roofing-slider`, `.cust-slider`, `.cert-slider` — theme jQuery, `data-columns` |
| Contact form | `/`, `/get-an-estimate`, `/commercial-roofing` | Formidable; 17-44 inputs; reCAPTCHA |
| Accordions / tabs | **none** | 0 `<details>`, 0 `[aria-expanded]`, no tab roles. Our `/services` FAQ accordion is therefore NOVEL with no reference behaviour to clone |
| `tel:` links | 11-12 per page | our A-14 rule gives every one a 44px min-height |
| `mailto:` links | **0 on every page** | convenient, but D-03 is enforced by our own sweep regardless |
| Auth / geo gating | **none** | no login, no locale redirect, no geo wall |

`listCounts` @1440 (visible-only): home 150 links / 43 buttons / 42 list items;
`/commercial-roofing` 137 / 35 / 49; `/about-us` 117 / 28 / 42; `/get-an-estimate` 104 / 17 / 42;
`/privacy-policy` 102 / 16 / 46.

---

## 9. Axes chosen for measurement

- **Breakpoints:** 390 / 768 / 1440 (`BP_SET`), plus 430 captured as geometry-only `extra`.
  Canonical id width: **1440**.
- **Colour:** excluded from every structural comparison from the first measurement (A-8).
- **Advisory, never blocking:** `innerCount`, `innerRows`, `innerCols`, `position` (A-12) —
  our clean markup vs a Bootstrap column tree is unclosable by construction.
- **NOVEL and DELETED rows:** single pass, no breakpoint dimension (A-9).
- **FIDELITY count is expected to be low and was not forced.** See `docs/sections.md`.
