import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function ServicesGrid({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-none ta-center" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <ul className="cols cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {(section.items ?? []).map((item) => (
            <li key={item.label}>
              <Link href="/services#services-detail">
                <h3 className="h-item">{item.label}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
