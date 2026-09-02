import { ChevronDown } from 'lucide-react';
import type { Section } from '@/lib/sections';

export default function Faq({ section }: { readonly section: Section }) {
  return (
    <section className="band band-tint pad-rhythm" data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {section.faqs?.length ? (
          <div className="stack">
            {section.faqs.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>
                  <h3>{f.q}</h3>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
