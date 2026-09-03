// lib/business.ts — the single source of truth for BUSINESS FACTS and the links
// derived from them. FACTS ONLY: not one line of visitor-facing prose lives here.
//
// The facts themselves are declared once, in `content/copy.ts`, because
// similarity.mjs reads that module and anything outside it is unmeasured. This
// file re-exports them and owns the hrefs — content/copy.ts explicitly does not
// carry hrefs, alt text or aria labels, since the reference side is measured as
// `textContent` and an href in the copy module inflates our character count
// against a number that never counted it.
//
// EVERY FACT BELOW IS FICTIONAL AND DELIBERATE, and every one is listed in
// docs/PRE-LAUNCH.md as must-replace-before-public. The phone is inside the
// 555-01XX reserved range and cannot ring anyone. The address does not exist —
// which is exactly why D-07 forbids passing it to a geocoder: the map is
// addressed BY COORDINATES ONLY, and the address is rendered as text beside it.
//
// NO ELECTRONIC MAIL ANYWHERE (D-03). There is no such field here and there is
// no place for one.

import { business } from '@/content/copy';

export const facts = business;

/** Digits-only tel: target. Every phone affordance on the site uses this one. */
export const telHref = `tel:+${business.phoneDigits}`;

/** D-07: coordinates only, keyless, never the address string. */
export const mapEmbedUrl = (zoom: number) =>
  `https://www.google.com/maps?q=${business.mapCoords}&z=${zoom}&output=embed`;

/** D-08: the actual conversion path on a phone, and it works with the frame blocked. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.mapCoords}`;

const [latitude, longitude] = business.mapCoords.split(',');

/** Street / locality / region / postal, split for JSON-LD only. */
const [street, locality, regionPostal] = business.address.split(', ');
const [region, postalCode] = (regionPostal ?? '').split(' ');

/**
 * LocalBusiness JSON-LD.
 *
 * DELIBERATELY ABSENT, each for a stated reason:
 *   email          — D-03 bans it in every form, JSON-LD included.
 *   aggregateRating / review — D-13. Fabricated review markup is a legal
 *                    problem, not a content gap, so there is no property here
 *                    for a later prompt to fill in.
 *   priceRange     — D-12. No prices, no ranges, no "starting at".
 *   areaServed     — D-02 scrubs the city array with the locations grid. The
 *                    single SERVICE_AREA sentence in the footer is the only
 *                    survivor.
 *   founded / numberOfEmployees / hasCredential — D-14 and D-17: uninvented
 *                    facts, tracked in docs/facts-needed.md.
 */
export const localBusinessJsonLd = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  description: business.tagline,
  telephone: business.phone,
  url: siteUrl,
  image: `${siteUrl}/placeholders/logo-header.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude,
    longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '07:00',
      closes: '19:00',
    },
  ],
});

/** The five routes in CONSTANTS. D-01: adding one is out of scope. */
export const routes = ['/', '/about', '/services', '/contact', '/privacy'] as const;

/** Canonical origin. Served as static files by nginx on owen-main. */
export const siteUrl = 'https://railmontgaragedoorrepairs.site';
