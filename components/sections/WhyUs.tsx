// `why-us` — ADAPTED, ref band s05. Also a reference carousel; rebuilt static,
// no JS. Trailing "Free estimate" cta is the sixth label in section.ctas and
// renders as a single quiet action below the row, per the brief.

import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function WhyUs({ section }: { readonly section: Section }) {
  const items = section.items ?? [];
  const ctas = section.ctas ?? [];
  const trailingCta = ctas[items.length];

  return (
    <section className="band pad-rhythm-top" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((p) => (
          <p className="lede" key={p.slice(0, 24)} style={{ marginTop: 'var(--spacing-md)' }}>
            {p}
          </p>
        ))}

        <div className="cols cols-4" style={{ marginTop: 'var(--spacing-2xl)' }}>
          {items.map((item, i) => (
            <div key={item.label}>
              <img
                alt={`${item.label} — Railmont Garage Door Repairs, Fort Mill, SC`}
                className="media"
                height={428}
                src={`/placeholders/why-us-${i + 1}.svg`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                width={398}
              />
              <h3 className="h-item" style={{ marginTop: 'var(--spacing-md)' }}>
                {item.label}
              </h3>
              {ctas[i] ? (
                <p style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Link className="action-quiet" href="/services">
                    {ctas[i]}
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {trailingCta ? (
          <p style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Link className="action-quiet" href="/contact">
              {trailingCta}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
