import type { Metadata } from 'next';
import { business, copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import PageHead from '@/components/sections/PageHead';
import PrivacyBody from '@/components/sections/PrivacyBody';

// Read, never hardcoded — see app/page.tsx.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/privacy'].meta,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: copy.routes['/privacy'].meta.title,
    description: copy.routes['/privacy'].meta.description,
    url: '/privacy',
    siteName: business.name,
    type: 'website',
    images: ['/placeholders/logo-header.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.routes['/privacy'].meta.title,
    description: copy.routes['/privacy'].meta.description,
    images: ['/placeholders/logo-header.svg'],
  },
};

export default function PrivacyPage() {
  return (
    <main className="page-main" data-route="/privacy" id="main" tabIndex={-1}>
      <PageHead section={getSection('/privacy', 'page-head')} />
      <PrivacyBody section={getSection('/privacy', 'privacy-body')} />
    </main>
  );
}
