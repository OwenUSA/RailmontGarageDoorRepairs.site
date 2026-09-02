# 07 — Map lazy-mount, and the bypass link

**Owner:** the lead. `<BusinessMap>` is a shared shell component (A-6), frozen after
Prompt 5, and no section agent edits it. **Routes:** `/` (`service-map`, zoom ~13) and
`/contact` (`contact-map`, zoom ~15). **Class: NOVEL on both** — the reference has no map
band on either page.

## THE ONE THING THIS SPEC EXISTS FOR

**The visible-on-focus bypass link is the map component's FIRST CHILD. Not a sibling, not
"nearby", not somewhere in the section. The first child of the component's root element,
before the aspect-ratio wrapper and before the iframe.**

An `<iframe>` is a nested browsing context. A keyboard user who tabs into an embedded Google
Map is handed off to Google's own focus order — dozens of stops through pan controls, zoom
buttons, "view larger map", terms links — with no way back except `Shift+Tab` through all of
it, and on some browser and AT combinations no way back at all. That is a keyboard trap:
WCAG 2.1.2, a Level A failure, and one of the few failures that can make a page genuinely
unusable rather than merely awkward.

**Three sibling sites shipped their map as a keyboard trap.** All three had this spec. All
three had it written correctly. The link was never built, because the requirement lived in a
document and the build was checked by a different document, and no programmatic gate looked
at the gap between them. So the acceptance criteria below are written as assertions a build
either satisfies or does not, and the first of them is structural — it checks the DOM
position of the link, not merely its existence.

```
<section data-section="service-map">        <- component root
  <a class="map-bypass" href="#after-map">  <- FIRST CHILD. Nothing before it.
     Skip the map
  </a>
  <div class="map-frame">                   <- aspect-ratio wrapper
    <iframe … />
  </div>
  <p id="after-map" tabindex="-1"> … NAP text, Get directions … </p>
</section>
```

The link is visually hidden until `:focus-visible`, then painted over the top-left of the
map with the standard focus ring. Its target is the first thing *after* the iframe, which
carries `tabindex="-1"` so the jump actually moves focus rather than only scrolling.

## Mechanism

- **Keyless iframe, addressed by coordinates only** (D-07 — the address is fictional and
  must never reach a geocoder):
  `https://www.google.com/maps?q=35.0074,-80.9451&z=13&output=embed` on `/`, `z=15` on
  `/contact`. No API key, no `.env`, no third-party JS SDK (D-18).
- `loading="lazy"` on the iframe. That is the whole lazy-mount mechanism: **no
  `IntersectionObserver`, no click-to-load facade, no `useEffect` that swaps a placeholder
  for the frame.** The native attribute is honoured by every browser we care about, costs no
  JavaScript, and cannot desynchronise from the layout.
- An explicit `title` attribute naming what the frame shows — "Map showing the Railmont
  Garage Door Repairs service area, Fort Mill, South Carolina". An untitled iframe is
  announced as "frame" and nothing else.
- **Fixed aspect-ratio wrapper** so the frame cannot shift layout while it loads:
  `aspect-ratio` on the wrapper with the iframe at `position: absolute; inset: 0; width:
  100%; height: 100%`. Never a bare iframe with a percentage height, and never a height set
  by JS after load.
- A **"Get directions"** link outside the iframe:
  `https://www.google.com/maps/dir/?api=1&destination=35.0074,-80.9451`. It is a normal
  anchor, it works with the iframe blocked, and it is the actual conversion path on a phone.
- The fictional address renders as **text beside the map**, never passed to a geocoder and
  never used to build the embed URL.

## Ratio, and why

- Aspect ratio **16:9 at 1440 and 768**, **4:3 at 390**. A 16:9 map on a 390px viewport is
  219px tall, which is not enough vertical context to read a street layout; 4:3 gives 293px
  for 74 extra pixels of page height. This is the only slot on the site that changes aspect
  between breakpoints, and it is a deliberate legibility decision rather than a grid
  accident.
- Zoom **13** on home (service-area scale, the band that replaces the deleted locations
  grid) and **15** on `/contact` (find-the-building scale), per D-08.
- No transition, no fade-in on load. The wrapper reserves the space, so there is nothing to
  animate into.

## Failure mode

1. **The keyboard trap.** Covered above. It is the reason this component is lead-owned.
2. **Layout shift.** A map that sets its own height after load moves the footer, and on
   `/contact` it moves the form. The aspect-ratio wrapper is not optional.
3. **The fictional address reaching a geocoder.** `?q=<address string>` would return a
   wrong pin or none. The embed URL is built from `business.mapCoords` and a grep for the
   address string inside any Google URL must return nothing.
4. **`contrast.mjs` reporting UNMEASURABLE.** The map is a `url()`-backed rectangle, so any
   text placed *over* it cannot be scored. Therefore **no text is placed over the map.** The
   NAP block sits beside it at 1440 and below it at 390.
5. **Silent failure with the frame blocked.** If Google is unreachable the band collapses to
   a grey rectangle. The NAP text and the directions link are outside the iframe precisely so
   that the band still does its job in that case.

## Trigger

- The iframe loads when the browser decides it is near the viewport (`loading="lazy"`).
  Nothing in our code triggers it.
- The bypass link is triggered by focus only — it has no hover or click affordance for
  pointer users, who do not need it.
- **Client-side route change:** navigating between `/` and `/contact` mounts a *different*
  instance with a different zoom. The component keys on its `data-section` id so React does
  not reuse a mounted frame at the wrong zoom level. A reused iframe keeps the old `src`
  until the attribute changes, which produces a home-scale map on the contact page.

## Accessibility

- Bypass link as first child, visible on focus, target `tabindex="-1"`. **Restated because
  three sites lost it.**
- `title` on the iframe.
- The band has an accessible heading ("Where we work" / "Find us") so it appears in the
  outline.
- Everything the map conveys — address, service area, hours, phone — is also present as
  text in the same band. The map is an enhancement, never the only source of an address.
- Tap targets: "Get directions" is at least 44px tall at 390.
- No motion, so `prefers-reduced-motion` has nothing to honour.

## Acceptance — the build cannot pass without all six

These are written as assertions, not aspirations. A build that fails any one of them is not
done, and this is a render-truth-class defect: **BLOCKING, and not subject to
`ITERATION_CAP`** (A-13).

1. **`document.querySelector('[data-section$="-map"]').firstElementChild` is the bypass
   anchor** — on `/` and on `/contact`. Not the wrapper, not the heading, not a comment
   node's next sibling. If this assertion is not runnable against the built DOM, the
   component is wrong.
2. **The bypass link is the first focusable element of the band**, and focusing it makes it
   visible with a focus ring at 3:1 against whatever is behind it.
3. **Activating it moves focus past the iframe** — the element receiving focus is after the
   iframe in DOM order and has `tabindex="-1"`.
4. **A `Tab` sequence entering the band and taking the bypass reaches the footer without
   entering the iframe.** Spec-verified only; A-4 drops the manual keyboard pass and
   `docs/PRE-LAUNCH.md` records "keyboard access is spec-verified only, never hand-tested".
   The DOM assertions in 1 to 3 are what stands in for it, which is why they are structural.
5. **No Google URL on the site contains the address string.** `rg 'Wexbury' | rg 'google'`
   returns nothing.
6. **No layout shift on map load** at any of the three breakpoints: the band's height is
   identical before and after the frame resolves.
