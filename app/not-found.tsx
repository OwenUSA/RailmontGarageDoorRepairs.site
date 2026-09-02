import Link from 'next/link';
import { facts, telHref } from '@/lib/business';

// 404. Renders inside the shell, so the header, footer and mobile call bar are
// all present and the phone number is one tap away from a wrong URL.
// Not one of the five ROUTES: it has no sitemap entry and no nav item.
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-main" data-route="/404">
      <section className="map-band" data-section="not-found">
        <div className="page-shell">
          <h2>Page not found</h2>
          <p style={{ marginTop: 'var(--spacing-md)' }}>
            That address is not part of this site. Everything here lives on five pages.
          </p>
          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            <Link className="action-quiet" href="/">
              Back to the front page
            </Link>
          </p>
          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            <a className="action-call" href={telHref}>
              {`Call ${facts.phone}`}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
