import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import PageHead from '@/components/sections/PageHead';
import PrivacyBody from '@/components/sections/PrivacyBody';

// Read, never hardcoded — see app/page.tsx.
export const metadata: Metadata = copy.routes['/privacy'].meta;

export default function PrivacyPage() {
  return (
    <main className="page-main" data-route="/privacy" id="main" tabIndex={-1}>
      <PageHead section={getSection('/privacy', 'page-head')} />
      <PrivacyBody section={getSection('/privacy', 'privacy-body')} />
    </main>
  );
}
