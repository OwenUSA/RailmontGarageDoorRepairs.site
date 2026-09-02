import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import BusinessMap from '@/components/shell/BusinessMap';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Process from '@/components/sections/Process';
import ServicesGrid from '@/components/sections/ServicesGrid';
import DoorStyles from '@/components/sections/DoorStyles';
import WhyUs from '@/components/sections/WhyUs';
import Promise_ from '@/components/sections/Promise';
import Testimonials from '@/components/sections/Testimonials';
import NewDoorCta from '@/components/sections/NewDoorCta';
import Credentials from '@/components/sections/Credentials';

// Metadata is READ from content/copy.ts, never written here. A sibling site hardcoded
// `metadata` into five page files, shipped the wrong city in all five, and no gate could
// see it — similarity.mjs reads copy.ts, so anything there is measured.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/'].meta,
  alternates: { canonical: '/' },
};

const map = getSection('/', 'service-map');
// The confirmation line lives on the /contact band; the hero form reuses it rather than
// inventing a second wording for the same state.
const doneText = getSection('/contact', 'callback-form').subheading ?? '';

// Render ORDER is ours and is not a class change: diff.mjs pairs on ref-section-id, never
// on position. Four moves, all argued in docs/content-divergence.md — process lifts to
// third (workmanship leads), services-grid and door-styles swap, promise and testimonials
// swap, and service-map takes the slot the deleted locations grid vacated.
export default function HomePage() {
  return (
    <main className="page-main" data-route="/" id="main" tabIndex={-1}>
      <Hero doneText={doneText} pillarPrefix="hero-pillar" section={getSection('/', 'hero')} />
      <Intro section={getSection('/', 'intro')} />
      {/* Home's process band is padded 50/80 -> 75/200 -> 100/200; the /services copy of
          the same component is on the plain 50/75/100 rhythm. Same band, different
          reference padding, so the class is a prop. */}
      <Process padClass="pad-process" section={getSection('/', 'process')} />
      <ServicesGrid section={getSection('/', 'services-grid')} />
      <DoorStyles section={getSection('/', 'door-styles')} />
      <WhyUs section={getSection('/', 'why-us')} />
      <Promise_ section={getSection('/', 'promise')} />
      <Testimonials section={getSection('/', 'testimonials')} />
      <NewDoorCta section={getSection('/', 'new-door-cta')} />
      <Credentials section={getSection('/', 'credentials')} />
      {/* D-08: zoom ~13 on home — the service-area view. */}
      <BusinessMap
        body={map.body ?? []}
        bypassLabel={map.ctas?.[1] ?? ''}
        directionsLabel={map.ctas?.[0] ?? ''}
        heading={map.heading ?? ''}
        id="service-map"
        zoom={13}
      />
    </main>
  );
}
