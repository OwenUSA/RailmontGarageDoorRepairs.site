// `door-styles` — ADAPTED, ref band s03. The reference is a jQuery carousel;
// this is deliberately rebuilt as a static three-up (`cols cols-3`), no JS.

import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function DoorStyles({ section }: { readonly section: Section }) {
  const items = section.items ?? [];
  const ctas = section.ctas ?? [];

  return (
    <section className="band pad-100 ta-center" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <p className="eyebrow">{section.heading}</p> : null}
        {section.subheading ? <h2 className="h-band">{section.subheading}</h2> : null}
        {(section.body ?? []).map((p) => (
          <p className="lede" key={p.slice(0, 24)} style={{ marginTop: 'var(--spacing-md)' }}>
            {p}
          </p>
        ))}

        <div className="cols cols-3" style={{ marginTop: 'var(--spacing-2xl)' }}>
          {items.map((item, i) => (
            <div key={item.label}>
              <img
                alt=""
                className="media"
                height={200}
                src={`/placeholders/door-style-${i + 1}.svg`}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                width={270}
              />
              <h3 className="h-item" style={{ marginTop: 'var(--spacing-md)' }}>
                {item.label}
              </h3>
              {item.text ? <p className="body-copy">{item.text}</p> : null}
              {ctas[i] ? (
                <p style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Link className="action-quiet" href="/services#services-detail">
                    {ctas[i]}
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
