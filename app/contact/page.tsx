import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import PageHead from '@/components/sections/PageHead';
import CallbackFormBand from '@/components/sections/CallbackFormBand';
import BusinessMap from '@/components/shell/BusinessMap';

// Read, never hardcoded — see app/page.tsx.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/contact'].meta,
  alternates: { canonical: '/contact' },
};

const map = getSection('/contact', 'contact-map');

export default function ContactPage() {
  return (
    <main className="page-main" data-route="/contact" id="main" tabIndex={-1}>
      <PageHead section={getSection('/contact', 'page-head')} />
      <CallbackFormBand section={getSection('/contact', 'callback-form')} />
      {/* D-08: zoom ~15 on /contact — find-the-building scale, not service-area scale. */}
      <BusinessMap
        body={map.body ?? []}
        bypassLabel={map.ctas?.[1] ?? ''}
        directionsLabel={map.ctas?.[0] ?? ''}
        heading={map.heading ?? ''}
        id="contact-map"
        zoom={15}
      />
    </main>
  );
}
