# 08 — Scroll reveal

**Owner:** the lead. **Routes:** all five.

## The finding: there is nothing to reveal

`docs/profile.md` §7 checked every scroll-motion signal by name, across all five saved pages
and on the live DOM of all five served pages:

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

`slick` appears 21 times on home purely as the class name `.slick-pricing` in inline CSS —
no Slick script is enqueued. The `wow` and `owl` matches were substrings of the word
"knowledge" and of base64 data.

**So the specified behaviour is: no scroll reveal. Sections are painted in their final state
at first paint, on every route, at every breakpoint.** This spec exists to say that
explicitly and to stop a later prompt from adding one because the page "feels static".

## `framer-motion` is NOT justified on this site

Stated here as well as in the profile, because the dependency allowlist requires the profile
to say so explicitly and this is the spec a builder would reach for it from. There is no
choreography to reproduce. CSS transitions on hover, focus and disclosure — specs 04, 05 and
06 — cover everything the reference does. **Do not install it in any later prompt without a
new written justification in this file.**

Also banned by default and still banned: **Lenis and Locomotive**. Scroll hijacking breaks
keyboard navigation and mobile momentum, and a customer scrolling to find a phone number
because their door is stuck open is the one interaction on this site that must never be
janky.

## Mechanism — the no-motion baseline

- **No `IntersectionObserver` for presentational purposes.** None is mounted anywhere.
- **No scroll listener** in any component. Specs 02 and 03 already state that the header and
  the call bar have none; this generalises it to the whole site.
- **No entrance animation on any band**: no fade-up, no stagger, no `animation-delay`
  ladders, no `@starting-style` transitions on section mount.
- **No `will-change` other than `auto`**, matching the reference's zero elements. Promoting
  layers for animations that do not exist costs memory on exactly the low-end phones this
  category's customers use.
- Elements are **not** given an initial `opacity: 0`. This is the important one: a reveal
  built as "start at 0, add a class on intersect" leaves the entire page invisible if the
  observer never fires — no JS, an error before hydration, a browser with the API blocked.
  Content that is invisible until JavaScript proves otherwise is a content-loss bug wearing
  an animation costume.
- Scroll behaviour is the browser default. `scroll-behavior: smooth` is set only inside
  `@media (prefers-reduced-motion: no-preference)`, and only for in-page anchors.

## Ratio, and why

**No ratio, because there is no motion.** The only scroll-adjacent numbers on the site are:

- `scroll-margin-top: var(--header-h)` on every anchorable element, so a fixed transparent
  header never covers a jump target (specs 02 and 05).
- `scroll-padding-top: var(--header-h)` on the scroll container, for the same reason applied
  to `scroll-behavior: smooth`.

Both are layout corrections, not animation.

## Failure mode

1. **A future prompt adding a reveal to "liven up" a band.** That would be a divergence we
   authored, on a reference with measurably zero scroll motion, and it would have to be
   defended in every structural measurement of that band. If it happens anyway, it must be
   written into this file first with a reason, and `docs/known-divergence.md` must record it
   as intentional.
2. **A carousel arriving through the back door.** The five reference sliders are rebuilt as
   static bands (`assets/INVENTORY.md`), and a rotator added later would reintroduce
   time-driven motion this spec rules out. The bands stay ADAPTED either way — the cost is
   confined to `innerCount` / `innerRows` / `innerCols`, which A-12 makes advisory.
3. **`prefers-reduced-motion` untested because nothing moves.** Specs 01, 04, 05 and 06 do
   have motion, and D-19 requires the preference to be honoured on every animation. The
   media query is asserted per-component there, not here.
4. **Smooth scrolling applied globally.** `scroll-behavior: smooth` on `html` unconditionally
   makes every programmatic scroll — including focus restoration and browser back — animate,
   which is disorienting and is a reduced-motion violation. It stays inside the
   `no-preference` query.

## Trigger

**None.** No scroll event, no intersection, no timer, no viewport threshold, on any route.

**Client-side route change:** the App Router restores scroll position on navigation. Because
no band's visibility depends on having been observed, a restored scroll position mid-page
renders correctly — every section is already in its final state. This is the concrete payoff
of the no-initial-`opacity-0` rule: a scroll-reveal site restored to the middle of a page
shows blank bands above and below the restore point until the observer catches up.

## Accessibility

- Nothing animates on scroll, so there is nothing here for `prefers-reduced-motion` to
  suppress — which is the strongest possible form of honouring it.
- No content is hidden pending a JavaScript event, so the full page is available to a
  screen reader, to a text browser, and to a crawler at first paint.
- `scroll-behavior: smooth` is opt-out by preference and applies to in-page anchors only.

## Acceptance

1. `rg "IntersectionObserver|addEventListener\('scroll'|onScroll" app components` returns
   nothing.
2. No element in the built CSS has `will-change` other than `auto`.
3. No element starts at `opacity: 0` awaiting a class.
4. `framer-motion` is absent from `package.json`.
5. With JavaScript disabled, all five routes render complete: every band visible, no blank
   sections.
6. `scroll-behavior: smooth` appears only inside a `prefers-reduced-motion: no-preference`
   block.
