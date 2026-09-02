# 05 — FAQ accordion

**Owner:** the `/services` route agent. **Route:** `/services` only, in-page.
**Class: NOVEL** — measured by token conformance at zero violations, single pass (A-9).

## Why it is NOVEL, stated plainly

`docs/profile.md` §8: the reference has **zero `<details>` elements, zero `[aria-expanded]`
attributes and no tab roles on any of the five pages.** There is no accordion, no tab set and
no disclosure widget anywhere on the reference site. So there is no behaviour to clone, and
nothing this spec says can be justified by "that is what they do". Every choice below has to
stand on its own.

D-01 also forbids a separate FAQ route, and CLAUDE.md fixes the content: generic garage-door
technical questions, nothing about response time, pricing, warranty or credentials. Six
questions, in `content/copy.ts` under `faq`.

## Mechanism

- **Native `<details>` / `<summary>`.** Not a `<div>` with `role="button"` and a JS height
  animation. The native element gives keyboard operation, the expanded/collapsed state in
  the accessibility tree, in-page find ("find in page" expands a closed `<details>` in
  Chromium and Safari), and correct behaviour before hydration — all for free, and all of
  which a hand-rolled disclosure gets wrong at least once.
- Open/close animation uses `interpolate-size: allow-keywords` plus a `height` transition to
  `auto`, wrapped in `@supports (interpolate-size: allow-keywords)`. **Where it is not
  supported the panel snaps open with no animation** and that is the accepted fallback. Do
  not substitute a `max-height: 999px` trick: it produces a wrong-speed transition on short
  panels and a visible delay on long ones, and it breaks the moment a panel exceeds the
  guessed maximum.
- `<summary>` gets `list-style: none` and `::-webkit-details-marker { display: none }`, and
  the chevron is a `lucide-react` icon rotated with `transform: rotate(180deg)` on
  `details[open]`. Rotate the icon; do not swap two icons, which flashes.
- **Independent, not exclusive.** No `name` attribute grouping them into a radio-accordion.
  A user comparing two answers should not have the first one close under them.
- No JS state at all. The component is a server component rendering `<details>` elements
  from copy.

## Ratio, and why

- Open **200 ms**, close **160 ms** — the same reasoning as the drawer (spec 01): expansion
  is requested and can be seen arriving, collapse is abandoned and should leave promptly.
- Chevron rotation shares the panel's duration exactly, so the icon and the panel finish
  together. A chevron that lands before the content does reads as a stutter.
- Easing `ease-out` on open, `ease-in` on close.
- Six panels, and the tallest answer is ~380 characters, which at 390 is roughly 9 lines.
  200 ms across that distance is fast enough not to feel gated and slow enough to show the
  direction of travel.

## Failure mode

1. **`scroll-margin-top`.** The header is a fixed overlay (spec 02). An anchor jump or a
   keyboard `Tab` into a `<summary>` near the bottom of the viewport scrolls it under the
   header unless every `<summary>` carries `scroll-margin-top: var(--header-h)`. This is the
   most likely defect in this component and it is invisible in a desktop screenshot.
2. **Cumulative layout shift on open.** Expanding a panel pushes everything below it. That is
   correct and expected — do not "fix" it by giving the panel a fixed height or by absolutely
   positioning it, which would clip long answers at 390.
3. **Hydration mismatch.** If any panel is ever given a default-open state, it must be open
   in the server HTML too. A `useEffect` that opens the first panel after mount produces a
   flash and a hydration warning.
4. **The chevron becoming the only affordance.** The whole `<summary>` row is the target, not
   the icon.

## Trigger

- Click or tap anywhere on the `<summary>` row.
- `Enter` or `Space` on a focused `<summary>` — native, no handler required.
- In-page find expanding a closed panel — native in Chromium and Safari, and a genuine
  reason to use the element rather than a div.
- **Client-side route change:** navigating away from `/services` and back re-renders the
  accordion in its default all-closed state. That is intended; there is no state to persist
  and persisting it across navigations would surprise more people than it helps.

## Accessibility

- `<summary>` is natively a button with `aria-expanded` maintained by the browser. **Do not
  add `role="button"` or a manual `aria-expanded`** — both fight the native semantics and at
  least one screen reader will then announce the state twice.
- Each `<summary>` contains a real heading (`<h3>`) so the FAQ appears in the document's
  heading outline and can be navigated by heading shortcut. The heading goes *inside* the
  summary, not wrapping it.
- Focus ring on `<summary>` uses the semantic focus colour (exempt from palette rotation,
  A-7) at 3:1 against both the row and the band.
- Summary rows are at least 44px tall at 390.
- `prefers-reduced-motion: reduce` → panels open and close instantly, chevron rotates
  instantly. State change preserved, motion removed.
- No `FAQPage` JSON-LD. The content is generic technical advice, not a business claim, and
  we are not adding structured data that implies an authority we have not documented.

## Acceptance

1. All six panels operable by keyboard alone, `Enter` and `Space`, with no JS handler.
2. `aria-expanded` present and correct in both states — supplied by the browser.
3. Tabbing to the last `<summary>` leaves it fully below the fixed header.
4. With JavaScript disabled, every panel still opens and closes.
5. `prefers-reduced-motion` removes the animation without removing the disclosure.
6. Token conformance: zero violations. Every colour, size, weight, radius and spacing value
   in the component resolves to a Prompt 5 token.
