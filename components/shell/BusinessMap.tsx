// <BusinessMap> — docs/behavior/07. LEAD-OWNED, FROZEN AFTER PROMPT 5 (A-6).
// No section agent edits this file. Mounted by the lead on `/` (service-map,
// zoom 13) and `/contact` (contact-map, zoom 15) per D-08.
//
// ===========================================================================
// THE BYPASS ANCHOR IS THE COMPONENT'S LITERAL FIRST CHILD.
// ===========================================================================
// Not a sibling, not "nearby", not somewhere in the section. An <iframe> is a
// nested browsing context: a keyboard user who tabs into an embedded Google Map
// is handed to Google's own focus order — pan controls, zoom buttons, "view
// larger map", terms links — with no way back except Shift+Tab through all of
// it, and on some browser/AT combinations no way back at all. That is WCAG
// 2.1.2, a Level A keyboard trap.
//
// THREE SIBLING SITES SHIPPED THIS MAP AS A KEYBOARD TRAP. All three had this
// spec, written correctly. The link was never built, because the requirement
// lived in a document and the build was checked by a different document. So the
// spec's first acceptance criterion is a DOM-POSITION assertion, runnable
// against the built page:
//
//   document.querySelector('[data-section$="-map"]').firstElementChild
//     === the bypass anchor
//
// Nothing may be inserted above it. Not a heading, not a wrapper, not a comment.
// ===========================================================================
//
// Other load-bearing details:
//   - Keyless embed addressed BY COORDINATES ONLY (D-07). The address is
//     fictional and must never reach a geocoder; `mapEmbedUrl` is built from
//     `business.mapCoords` and nothing else.
//   - `loading="lazy"` IS the whole lazy-mount mechanism. No IntersectionObserver,
//     no click-to-load facade, no useEffect swapping a placeholder for the frame.
//   - Fixed aspect-ratio wrapper (4:3 at 390, 16:9 above) so the frame cannot
//     shift layout while it loads.
//   - NO TEXT IS PLACED OVER THE MAP. contrast.mjs cannot score a url()-backed
//     rectangle and would report UNMEASURABLE, which reads as a pass.
//   - Everything the map conveys — address, hours, phone, service area — is also
//     present as text in the same band, so the band still works with the frame
//     blocked.

import { directionsUrl, facts, mapEmbedUrl, telHref } from '@/lib/business';

interface Props {
  /** `service-map` on `/`, `contact-map` on `/contact`. MUST end in `-map`. */
  readonly id: string;
  readonly heading: string;
  /** NAP lines, straight from content/copy.ts. */
  readonly body: readonly string[];
  readonly directionsLabel: string;
  readonly bypassLabel: string;
  /** 13 for the service-area view on `/`, 15 for find-the-building on `/contact`. */
  readonly zoom: number;
}

export default function BusinessMap({
  id, heading, body, directionsLabel, bypassLabel, zoom,
}: Props) {
  const afterId = `after-${id}`;
  return (
    // `key` on the id: navigating between `/` and `/contact` mounts a DIFFERENT
    // instance at a different zoom, and a reused iframe keeps its old src until
    // the attribute changes — which produces a home-scale map on the contact page.
    <section key={id} className="map-band" data-section={id} style={{ position: 'relative' }}>
      <a className="map-bypass" href={`#${afterId}`}>
        {bypassLabel}
      </a>
      <div className="page-shell map-layout">
        <div className="map-frame">
          <iframe
            src={mapEmbedUrl(zoom)}
            title={`Map showing the ${facts.name} service area, Fort Mill, South Carolina`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div id={afterId} tabIndex={-1}>
          <h2>{heading}</h2>
          {body.map((line) => (
            <p key={line} style={{ marginTop: 'var(--spacing-sm)' }}>
              {line.startsWith('(') ? <a href={telHref}>{line}</a> : line}
            </p>
          ))}
          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            <a className="action-quiet" href={directionsUrl} rel="noopener noreferrer" target="_blank">
              {directionsLabel}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
