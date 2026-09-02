import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import PageHead from '@/components/sections/PageHead';
import PrivacyBody from '@/components/sections/PrivacyBody';

// Read, never hardcoded — see app/page.tsx.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/privacy'].meta,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="page-main" data-route="/privacy" id="main" tabIndex={-1}>
      <PageHead section={getSection('/privacy', 'page-head')} />
      <PrivacyBody section={getSection('/privacy', 'privacy-body')} />
    </main>
  );
}
