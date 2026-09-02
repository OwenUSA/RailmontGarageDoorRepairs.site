// Footer — LEAD-OWNED, FROZEN AFTER PROMPT 5 (A-6). Server component: nothing
// here is interactive.
//
// TWO BANDS, TWO SIBLINGS, and the structure is load-bearing for the instrument.
// `footer-nap` (the fat NAP block, ref s13) and `footer-legal` (the copyright
// strip, ref s14-footer) are separate rows in docs/sections.md. probe.mjs builds
// its chrome set from `chromeSelectors` plus every [data-section] outside <main>,
// then keeps only the OUTERMOST of any containment pair — so nesting the legal
// strip inside <footer> would delete it from every capture and leave its contract
// row unpaired. They are siblings for the same reason the reference's own
// `.bottom-area` and `#footer` are two separate #page bands.
//
// NO EMAIL COLUMN (D-03), and no locations column (D-02) — the single
// SERVICE_AREA sentence is the only survivor of that scrub.
//
// This band is the site's dark surface and it carries REAL TEXT from Prompt 5
// onward, deliberately: a sibling's shell passed both gates green because its
// header and footer were the only bands with any text on them, and its build wave
// then found two utility classes that resolved to no token at all, painting every
// dark band at 1.46:1 on all five routes.

import Link from 'next/link';
import { copy } from '@/content/copy';
import { directionsUrl, telHref } from '@/lib/business';

const HREF: Record<string, string> = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Contact: '/contact',
  'Privacy Policy': '/privacy',
};

const nap = copy.routes['/'].sections.find((s) => s.id === 'footer-nap');
const legal = copy.routes['/'].sections.find((s) => s.id === 'footer-legal');

export default function Footer() {
  const links = (nap?.ctas ?? []).filter((c) => c in HREF);
  const directionsLabel = (nap?.ctas ?? []).find((c) => !(c in HREF)) ?? 'Get directions';
  const [contact, visit, open] = nap?.items ?? [];

  return (
    <>
      <footer className="site-footer" data-section="footer-nap">
        <div className="page-shell footer-grid">
          <div>
            <h2>{nap?.heading}</h2>
            <p className="footer-muted">{nap?.subheading}</p>
            {(nap?.body ?? []).map((line) => (
              <p key={line} className="footer-muted" style={{ marginTop: 'var(--spacing-md)' }}>
                {line}
              </p>
            ))}
          </div>

          <div>
            <p className="footer-heading">{contact?.label}</p>
            <ul className="footer-list">
              <li>
                <a href={telHref}>{contact?.text}</a>
              </li>
            </ul>
            <p className="footer-heading" style={{ marginTop: 'var(--spacing-lg)' }}>
              {visit?.label}
            </p>
            {/* The address is FICTIONAL and is rendered as text only. It is never
                passed to a geocoder and never used to build a Google URL (D-07). */}
            <p className="footer-muted">{visit?.text}</p>
            <ul className="footer-list">
              <li>
                <a href={directionsUrl} rel="noopener noreferrer" target="_blank">
                  {directionsLabel}
                </a>
              </li>
            </ul>
            <p className="footer-heading" style={{ marginTop: 'var(--spacing-lg)' }}>
              {open?.label}
            </p>
            <p className="footer-muted">{open?.text}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="footer-list">
              {links.map((label) => (
                <li key={label}>
                  <Link href={HREF[label] ?? '/'}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      <div className="footer-legal" data-section="footer-legal">
        <div className="page-shell footer-legal__inner">
          <p>{legal?.body?.[0]}</p>
          <p>
            <Link href="/sitemap.xml">{legal?.ctas?.[0]}</Link>
            {' · '}
            <Link href="/privacy">{legal?.ctas?.[1]}</Link>
          </p>
        </div>
      </div>
    </>
  );
}
