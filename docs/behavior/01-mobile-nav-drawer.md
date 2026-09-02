# 01 — Mobile nav drawer

**Owner:** lead (shell, frozen after Prompt 5 per A-6). **Routes:** all five. **Below 768.**

## What the reference does, and what we are not cloning

jQuery.mmenu. `body` gets `mm-page mm-slideout`, the toggle is `.nav-btn > a` wrapping two
`span.mm-line` bars, and the panel slides in from the side. Profiled at Prompt 1.

**It has no `aria-expanded` anywhere on any of the five pages, and no `aria-controls`.** A
screen-reader user is given a link with two empty spans in it and no indication that
anything opened. We are cloning the *geometry and motion* of that drawer and correcting the
semantics — D-19 sets WCAG 2.2 AA, and cloning an accessibility defect is not fidelity.

## Mechanism

- The toggle is a real `<button type="button">`, never an `<a>` and never a `<div role>`.
  It carries `aria-expanded="false|true"` and `aria-controls="site-drawer"`.
- The panel is a `<nav id="site-drawer">` in the DOM at all times, moved with
  `transform: translateX(100%) → translateX(0)`. **Not** `left`, **not** `width`,
  **not** `display: none` — the first two lay out on every frame, the third destroys the
  focus target mid-interaction and makes the transition uncancellable.
- While closed it is `inert` and `aria-hidden="true"`, so nothing inside it is tabbable or
  reachable by a virtual cursor. `inert` is the mechanism; do not rely on
  `visibility: hidden` alone, which some AT still walks.
- Scroll lock is `position: fixed; top: -<scrollY>px; width: 100%` on `body`, with the
  scroll position stored on open and restored with `window.scrollTo(0, stored)` on close.
  **Never `overflow: hidden` on `body`** — iOS Safari ignores it and the page scrolls behind
  the open drawer, which is the single most-reported mobile drawer bug there is.
- Focus is trapped between the close button and the last link while open, by handling `Tab`
  and `Shift+Tab` at the panel. `Escape` closes.
- The scrim is a sibling `<div>` with `pointer-events: auto` and a click handler; it is
  `aria-hidden` and is never the only way to close.

## Ratio, and why

- Open **240 ms**, close **180 ms** — a 4:3 ratio. Opening is the state you asked for and
  can afford to be seen arriving; closing is a state you have already abandoned and should
  get out of the way faster. Equal durations make dismissal feel sticky.
- Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` on open (decelerating, settles), linear-ish
  `cubic-bezier(0.4, 0, 1, 1)` on close (accelerating, leaves).
- Scrim opacity animates over the same durations, `0 → 0.55`. 0.55 is the lowest value that
  still reads as "the page behind is disabled" against the mid-tone Prompt 5 neutrals.
- Panel width `min(86vw, 380px)`. Leaving 14% of the viewport visible is what tells a
  first-time user the page is still there and tappable-to-dismiss.

## Failure mode

If the JS never runs — hydration error, script blocked — the drawer must degrade to a
**visible, usable list**, not a hidden one. So: the closed state's `transform` and `inert`
are applied by a class that JavaScript adds on mount (`.js-drawer-ready` on `<html>`),
not by the base stylesheet. Without JS the nav renders as a plain stacked list under the
header. A drawer that is `display: none` in CSS and only revealed by JS becomes a site with
no navigation the moment anything throws.

Second failure mode: the scroll-lock restore. If the component unmounts while open (a route
change that is not intercepted), `body` is left `position: fixed` at a negative offset and
the page appears blank. The restore therefore runs in a cleanup effect as well as in the
close handler, and it is idempotent.

## Trigger

- Tap or `Enter`/`Space` on the toggle.
- `Escape` anywhere while open.
- Click on the scrim.
- **Client-side route change.** Next's App Router does not unmount the shell between routes,
  so a link inside the drawer navigates with the drawer still open and the body still
  locked. The drawer subscribes to `usePathname()` and closes on any change of value —
  including a navigation to the route it is already on, which must still close it.
- Viewport crossing 768 upward while open: close, restore scroll, and hand focus back to the
  toggle, because the toggle is about to be hidden.

## Accessibility

- `aria-expanded` on the toggle, flipped in the same commit as the class change.
- `aria-controls` pointing at the panel's id.
- Focus moves to the panel's close button on open; returns to the toggle on close. Never
  leave focus on a node inside an `inert` subtree.
- The toggle has an accessible name — `Menu` / `Close menu` — not just two bars.
- Tap target: 44x44 minimum (WCAG 2.5.8), and `a[href^="tel:"] { min-height: 44px }` from
  A-14 already covers the call link inside the panel.
- `prefers-reduced-motion: reduce` → duration `0.01ms` on both directions, opacity only.
  The drawer still opens and closes; it just does not slide.

## Acceptance

1. `aria-expanded` is present and correct in both states, on all five routes.
2. With the drawer open, dragging the page behind it does not scroll (iOS Safari).
3. Navigating from a drawer link closes the drawer AND restores scroll position.
4. `Escape` closes and returns focus to the toggle.
5. With JavaScript disabled the navigation is still visible and clickable.
