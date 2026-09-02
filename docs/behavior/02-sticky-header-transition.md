# 02 — Sticky header transition

**Owner:** lead (shell, frozen after Prompt 5). **Routes:** all five.

## The finding this spec exists to record

**There is no transition to clone.** `docs/profile.md` §7 measured the reference header at
the top of the page and after scrolling, on all five pages, and the two states are
byte-identical:

| property | at top | scrolled |
|---|---|---|
| `position` | `fixed` | `fixed` |
| `height` | 168 / 116 / 90 (1440 / 768 / 390) | same |
| `background` | `rgba(0, 0, 0, 0)` | same |
| `box-shadow` | `none` | same |
| `transform` | `none` | same |
| `topOffset` | 0 | 0 |

It is a transparent fixed overlay in both states. **We specify a static sticky and we do not
invent a transition** — no shrink, no background fade-in, no shadow on scroll, no
hide-on-scroll-down. Adding one would be a divergence we authored ourselves and then had to
defend in every structural measurement of `s00-header` on five routes.

## Mechanism

- `position: fixed; top: 0; inset-inline: 0; z-index: <header layer>`. Not `sticky`:
  `position: sticky` on a header that is a sibling of `<main>` behaves differently the
  moment any ancestor gains `overflow` or a transform, and our shell will gain both.
- The header is transparent, so `<main>` needs top padding equal to the header height at
  each breakpoint — set as a CSS custom property (`--header-h`) so the value lives in one
  place and the map, the drawer and the skip target all read the same number.
- **No scroll listener at all.** No `IntersectionObserver` sentinel, no `useEffect` reading
  `scrollY`, no class toggling. There is nothing for them to do, and a scroll handler that
  exists but changes nothing is a rAF cost on every frame for zero pixels.
- `will-change` is **not** set. The profile found zero elements with `will-change` other
  than `auto` on the entire reference; promoting a static layer costs memory and buys
  nothing.

## Ratio, and why

**No motion, therefore no ratio.** The one number that matters is the height set, and it
comes from the reference rather than from taste: **168px at 1440, 116px at 768, 90px at
390**. Those are the measured values and they are what `s00-header`'s structural comparison
scores.

If a later prompt wants a scrolled state, it needs a new written justification here first,
and it will inherit a permanent structural delta against a reference that has none.

## Failure mode

The transparent-overlay pattern has exactly one real hazard: **the first band's content
sliding under an invisible header**. On a route whose first band is light, a transparent
header's text can land on top of a light hero and drop below AA without anything looking
broken in a screenshot. That is a `rendertruth.mjs` finding (A-13), not a divergence, and it
is BLOCKING and not subject to `ITERATION_CAP`.

Guard: the header's own text and its call CTA are checked by `contrast.mjs` against the
resolved layer stack *of the band beneath it*, not against a page default. Where a route's
first band cannot carry the header text at AA, the fix is that band's background, not a
header background invented for the purpose.

Second hazard: `--header-h` and the actual rendered height drifting apart, which silently
hides the top of every anchored section. The value is read from one custom property by
everything that needs it, and `padding-top` on `<main>` is `var(--header-h)` rather than a
repeated literal.

## Trigger

**None.** The header does not respond to scroll, to viewport, or to focus, beyond the
breakpoint height change which is a media query and not an event.

**Client-side route change:** the App Router keeps the shell mounted, so the header does not
re-render between routes and nothing needs resetting. The one thing that must happen on a
route change is the drawer closing (spec 01) — the header itself is stateless.

## Accessibility

- The header is a `<header>` landmark containing a `<nav>` landmark.
- **A skip link is the first focusable element in the document**, before the header's own
  contents: `<a href="#main" class="skip">Skip to content</a>`, visually hidden until
  `:focus-visible`, then painted at the top-left with the standard focus ring. `#main` is
  the `<main>` element and takes `tabindex="-1"` so the jump actually moves focus.
- Because the header is `fixed`, an in-page anchor jump lands with the target under the
  header. Every anchorable element gets `scroll-margin-top: var(--header-h)`. Without it,
  keyboard users jumping to the FAQ (spec 05) land on a heading they cannot see.
- The header's call CTA satisfies A-14 (`min-height: 44px` on every `tel:` link).
- Current route is marked with `aria-current="page"` on the nav link, not by colour alone.

## Acceptance

1. `headerAtTop` and `headerScrolled` computed styles are identical on all five routes —
   the same assertion the reference passes.
2. Rendered header height is 168 / 116 / 90 at 1440 / 768 / 390.
3. Zero scroll listeners attached by the header component.
4. Tab from a cold page load reaches the skip link first; activating it moves focus to
   `<main>`.
5. An anchor jump to any in-page target leaves the target fully below the header.
