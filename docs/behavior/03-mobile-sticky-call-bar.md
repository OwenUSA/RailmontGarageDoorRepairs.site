# 03 — Mobile sticky call bar

**Owner:** lead (shell, frozen after Prompt 5). **Routes:** all five. **Below 768 only.**
**Class: NOVEL** — the reference has no counterpart band, so this is measured by token
conformance, not against anything.

## Why it exists

D-04: the phone number is the conversion. On a phone-driven category the single most
valuable pixel on a small screen is a permanently reachable call target, and a customer
whose door is stuck open should never have to scroll to find it.

## Mechanism

- `position: fixed; bottom: 0; inset-inline: 0`, displayed only below 768 by media query.
  Not `sticky` (same reasoning as spec 02), and not JS-positioned.
- The bar contains **one primary target**: an `<a href="tel:+18035550164">` styled as a
  full-width button, plus the hours line as static text. One decision, not a toolbar.
- `padding-bottom: max(<pad>, env(safe-area-inset-bottom))` so the tap target clears the
  iOS home indicator. Without it the bottom ~34px of the button is unreachable on every
  notched iPhone and the bar looks fine in every screenshot.
- `<main>` gets `padding-bottom: var(--callbar-h)` below 768, so the footer's last line is
  never permanently covered. One custom property, read by both.
- **No scroll listener, no show-on-scroll-up behaviour, no dismiss button.** The profile
  found zero scroll-linked motion on the reference and there is no state here worth
  animating. A bar that appears and disappears is a bar the user cannot rely on.

## Ratio, and why

- Height **56px** content box, giving the call link a **48px** tap target inside it —
  comfortably over the WCAG 2.5.8 minimum of 24x24 and over the 44x44 that A-14 enforces
  globally. 56 is also close enough to the header's 90px mobile height that the two chrome
  bands read as a pair rather than as an accident.
- Occupies **100% of the width, minus the page gutter**. A centred pill would be smaller and
  no prettier; the whole point is that a thumb cannot miss it.
- Contrast: this is the **call-now CTA**, so A-7's hard constraint applies — it must be the
  highest-chroma interactive element on every page, and `rendertruth.mjs` checks chroma
  dominance, not painted contrast. Nothing else on any route may out-saturate it.

## Failure mode

**Atlas shipped its primary call CTA painted in exactly its own background colour, 1:1, on
all five routes, while its acceptance sweep reported 23/23 pairs passing AA.** Every check
in that chain trusted declared values. This bar is the highest-risk element on the site for
exactly that bug, because it is chrome that no section agent owns and that no page-level
screenshot review looks at twice.

Guards, both BLOCKING and both outside `ITERATION_CAP` (A-13):

1. `contrast.mjs` resolves the bar's background as a layer stack and scores the worst sample
   along any gradient ramp — not a flat model of it.
2. `rendertruth.mjs` screenshots the call link's text box and measures the contrast between
   its dominant painted tones. A label painted in its own background reads 1:1 here no
   matter what the tokens claim.

Second failure mode: the bar covering the footer's legal links or the FAQ's last answer.
The `<main>` bottom padding is the fix and it must be tested at 390 with the page scrolled
fully to the bottom, not just at the top.

Third: the bar overlapping an open drawer. The drawer's `z-index` sits above the call bar,
and the call bar is `inert` while the drawer is open — otherwise a trapped focus cycle can
still reach it.

## Trigger

- **Rendered unconditionally below 768.** No scroll trigger, no delay, no entrance
  animation, no first-visit-only logic.
- **Client-side route change:** the bar is in the shell and does not remount. Its only
  route-dependent behaviour is going `inert` while the drawer is open, which is driven by
  the drawer's state and therefore resets with it.
- Above 768 it is not rendered at all — not hidden with `display: none` while still in the
  accessibility tree, and not merely translated off screen.

## Accessibility

- Accessible name is the full number, spoken as a phone number: the link text is
  `Call (803) 555-0164`, not `Call` or an icon alone.
- The bar is a `<div role="region" aria-label="Call Railmont Garage Door Repairs">` so a
  screen-reader user can jump to it deliberately rather than only encountering it in reading
  order at the end of the document.
- It is the **last** element in the DOM order but is visually first-priority. That is
  correct: a fixed element that hijacks tab order to the front interrupts the page's real
  reading sequence, and the region landmark plus the header's call link both give a faster
  path.
- 48px tap target, 44px enforced globally by A-14.
- No motion, so `prefers-reduced-motion` has nothing to honour here.

## Acceptance

1. Visible at 390, absent from the DOM at 768 and 1440.
2. `rendertruth.mjs` reports the call link's painted text contrast at AA or better, and the
   bar as the highest-chroma interactive element on every route. **0 findings.**
3. At 390, scrolled fully to the bottom, no footer text is covered by the bar.
4. On a notched viewport the tap target does not intersect the home indicator.
5. With the drawer open, `Tab` cannot land inside the call bar.
