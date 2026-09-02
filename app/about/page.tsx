import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import PageHead from '@/components/sections/PageHead';
import AboutIntro from '@/components/sections/AboutIntro';
import Approach from '@/components/sections/Approach';
import Values from '@/components/sections/Values';
import WhyChoose from '@/components/sections/WhyChoose';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Reputation from '@/components/sections/Reputation';
import WhatSetsApart from '@/components/sections/WhatSetsApart';
import ClosingCta from '@/components/sections/ClosingCta';

// Read, never hardcoded — see app/page.tsx.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/about'].meta,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="page-main" data-route="/about" id="main" tabIndex={-1}>
      <PageHead section={getSection('/about', 'page-head')} />
      <AboutIntro section={getSection('/about', 'about-intro')} />
      <Approach section={getSection('/about', 'approach')} />
      <Values section={getSection('/about', 'values')} />
      <WhyChoose section={getSection('/about', 'why-choose')} />
      {/* The same component as home's, paired to its own reference band (ordinal 6, not 4). */}
      <ServicesGrid section={getSection('/about', 'services-grid')} />
      <Reputation section={getSection('/about', 'reputation')} />
      <WhatSetsApart section={getSection('/about', 'what-sets-apart')} />
      <ClosingCta section={getSection('/about', 'closing-cta')} />
    </main>
  );
}
