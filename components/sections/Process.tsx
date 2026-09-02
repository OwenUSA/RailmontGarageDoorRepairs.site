import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function Process(
  { section, padClass }: { readonly section: Section; readonly padClass: string },
) {
  const cta = section.ctas?.[0];
  return (
    <section className={`band ${padClass} ta-center-sm`} data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((line) => (
          <p key={line} className="lede">
            {line}
          </p>
        ))}
        <ol className="cols cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {(section.items ?? []).map((item, index) => (
            <li key={item.label} className="stack">
              <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-6xl)' }}>
                {index + 1}
              </span>
              <h3 className="h-item">{item.label}</h3>
              {item.text ? <p className="body-copy">{item.text}</p> : null}
            </li>
          ))}
        </ol>
        {cta ? (
          <Link href="/contact" className="action-quiet">
            {cta}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
