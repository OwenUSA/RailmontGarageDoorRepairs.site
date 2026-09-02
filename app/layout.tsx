import type { Metadata } from 'next';
import { Hind, Teko } from 'next/font/google';
import { business } from '@/content/copy';
import { localBusinessJsonLd, siteUrl } from '@/lib/business';
import { ChromeProvider } from '@/components/shell/ChromeContext';
import Header from '@/components/shell/Header';
import Footer from '@/components/shell/Footer';
import CallBar from '@/components/shell/CallBar';
import './globals.css';

// Hind (body) and Teko (display) are the REFERENCE'S OWN FACES, not substitutes.
// Both are Google Fonts under the OFL and both genuinely load on the reference
// (docs/profile.md 4), so D-11 does not apply and NO font-substitution floor is
// booked on this site. The weights are the ones the reference actually resolves:
// Hind 400/500/700 everywhere and 600 on home; Teko 400/600/700 everywhere and
// 500 on home.
const hind = Hind({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-teko',
  display: 'swap',
});

// Route-level metadata lives in content/copy.ts and is exported by each page file.
// This is the fallback title/description only, and it too comes from the copy module.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: business.name, template: `%s` },
  description: business.tagline,
  // D-15: no analytics, no pixels, no chat widget, nothing to declare here.
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hind.variable} ${teko.variable}`}>
      <body>
        {/* LocalBusiness only. No AggregateRating and no Review at all (D-13);
            no email (D-03); no priceRange (D-12); no areaServed city array (D-02). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(siteUrl)) }}
        />
        <ChromeProvider>
          {/* Spec 02: the skip link is the FIRST focusable element in the
              document, before the header's own contents. `#main` takes
              tabindex="-1" so the jump actually moves focus. */}
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
          {/* Spec 03: LAST in DOM order, visually first-priority. A fixed element
              that hijacks tab order to the front interrupts the page's real
              reading sequence; the region landmark and the header's call link
              both give a faster path. */}
          <CallBar />
        </ChromeProvider>
      </body>
    </html>
  );
}
