# 04 — Service card hover and press

**Owner:** the `services-grid` section agent. **Routes:** `/` and `/about` (`services-grid`),
`/services` (`services-detail`, `quality-band`). **Class: ADAPTED.**

## What the reference does

No choreography — 391 to 556 elements per page carry a non-zero `transition-duration`, and
`docs/profile.md` §7 identifies all of them as ordinary CSS hover and focus transitions on
links, buttons and cards. There is no library and no scroll coupling. So this spec is a
faithful clone of a plain CSS transition, not a reinvention.

## Mechanism

- The **whole card is the link.** One `<a>` wrapping the card content, not a card `<div>`
  with a nested "Learn more" anchor and a JS click handler on the parent. A card with a
  click handler on a non-interactive element is invisible to keyboard and to AT, and it
  gives two tab stops for one destination when someone adds the inner link back later.
- Hover and focus share one rule: `:hover, :focus-visible { ... }`. Never a hover-only
  affordance — that is a mouse-only feature on a site whose users are frequently on a phone
  in a driveway.
- Transitioned properties, and only these: `transform`, `box-shadow`, `border-color`,
  `background-color`. **Not** `top`/`left`/`margin`/`width`/`height` (layout on every
  frame), and **not** `filter: drop-shadow` (repaints the whole subtree).
- Press state is `:active { transform: translateY(0) scale(0.995) }` — a real depression,
  not a colour flash, because on touch the colour change is under the finger.
- `@media (hover: none)` removes the lift entirely. A hover style that latches after a tap
  on iOS leaves a card looking permanently selected.

## Ratio, and why

- Hover in **150 ms**, out **220 ms** — roughly 2:3, the inverse of the drawer's ratio and
  for the inverse reason. Arriving on a card should feel immediate; leaving should not snap,
  because a pointer crossing a grid of eight cards would otherwise strobe.
- Press **90 ms**, both directions. Anything above ~100 ms stops reading as a button
  responding and starts reading as lag.
- Lift distance **2px** with a shadow that grows from `0 1px 2px` to `0 6px 16px`. The
  shadow does most of the work; a large translate in a grid makes neighbouring cards look
  misaligned during the transition.
- Easing `ease-out` in, `ease-in` out. Not `ease-in-out` on a 150 ms transition — the
  s-curve is imperceptible at that duration and just costs the first 40 ms of response.

## Failure mode

1. **Hover latch on touch.** Covered by `@media (hover: none)`. Test at 390 by tapping a
   card, navigating back, and confirming the card is not still lifted.
2. **Focus ring clipped by the card's own `overflow: hidden`.** The lift uses `transform`,
   so the ring is drawn on the anchor and must not be inside a clipping ancestor. Use
   `outline` with `outline-offset`, never a `::after` border that the card can clip.
3. **Shadow colour drift.** A-8 excludes colour from the structural comparator but keeps the
   non-colour parts of shadows — offsets, blur, spread. Those are measured. Do not change
   the geometry of the shadow to compensate for a palette that reads differently.
4. **Eight cards, eight transitions, one repaint.** If the shadow is applied to a parent
   that also has a background image, hovering repaints the band. Shadow goes on the card.

## Trigger

- `:hover` from a fine pointer.
- `:focus-visible` from keyboard. **Not `:focus`** — a mouse click on a card would otherwise
  leave the ring painted after navigation.
- `:active` on press, pointer or `Space`/`Enter`.
- **Client-side route change:** `/` and `/about` share the `services-grid` component. On
  navigation between them React may reuse the DOM nodes, so a card left in `:hover` on the
  old route can render hovered on the new one under the pointer. The state is pure CSS with
  no JS class, which makes this self-correcting — that is a reason to keep it pure CSS.

## Accessibility

- One tab stop per card, and the accessible name is the symptom label, which is the same
  text a sighted user reads.
- Focus ring is the semantic focus colour from Prompt 5 — **exempt from palette rotation**
  per A-7 — and holds 3:1 against both the card and the band behind it.
- The card is a link, so `Enter` activates it. If a card ever needs to be a button instead,
  it must also respond to `Space`; do not mix the two roles in one grid.
- Cards are at least 44px tall in every direction at 390 (WCAG 2.5.8).
- `prefers-reduced-motion: reduce` → `transition-duration: 0.01ms` on all four properties.
  The hover state still *changes*, it just does not animate: removing the state entirely
  would leave reduced-motion users with no hover affordance at all.

## Acceptance

1. Every card is reachable and activatable by keyboard alone, one stop each.
2. Focus ring is fully visible, not clipped, on all three breakpoints.
3. No card retains a hover style after a tap at 390.
4. `prefers-reduced-motion` reduces duration without removing the state change.
5. No `transition` on a layout-triggering property anywhere in the grid.
