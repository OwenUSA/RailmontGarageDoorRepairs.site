import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { getSection } from '@/lib/sections';
import Hero from '@/components/sections/Hero';
import PageHead from '@/components/sections/PageHead';
import ServicesIntro from '@/components/sections/ServicesIntro';
import RiskBand from '@/components/sections/RiskBand';
import QualityBand from '@/components/sections/QualityBand';
import Process from '@/components/sections/Process';
import ServicesDetail from '@/components/sections/ServicesDetail';
import Faq from '@/components/sections/Faq';
import ExperienceBand from '@/components/sections/ExperienceBand';
import Credentials from '@/components/sections/Credentials';

// Read, never hardcoded — see app/page.tsx.
// Gate 13: a self-referencing canonical, resolved against `metadataBase`. It was absent
// on all five routes until the Prompt 11 sweep checked over HTTP rather than reading config.
export const metadata: Metadata = {
  ...copy.routes['/services'].meta,
  alternates: { canonical: '/services' },
};

const doneText = getSection('/contact', 'callback-form').subheading ?? '';

export default function ServicesPage() {
  return (
    <main className="page-main" data-route="/services" id="main" tabIndex={-1}>
      <Hero
        doneText={doneText}
        pillarPrefix="services-pillar"
        section={getSection('/services', 'services-banner')}
      />
      <PageHead section={getSection('/services', 'page-head')} />
      <ServicesIntro section={getSection('/services', 'services-intro')} />
      <RiskBand section={getSection('/services', 'risk-band')} />
      <QualityBand section={getSection('/services', 'quality-band')} />
      {/* /services pads this band on the plain rhythm; home's copy uses .pad-process. */}
      <Process padClass="pad-rhythm" section={getSection('/services', 'process')} />
      <ServicesDetail section={getSection('/services', 'services-detail')} />
      {/* NOVEL: the reference has zero accordions on any of its five pages (spec 05). */}
      <Faq section={getSection('/services', 'faq')} />
      <ExperienceBand section={getSection('/services', 'experience-band')} />
      <Credentials section={getSection('/services', 'credentials')} />
    </main>
  );
}
