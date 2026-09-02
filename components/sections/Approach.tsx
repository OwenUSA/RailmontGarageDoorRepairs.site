import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function Approach({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-rhythm" data-section={section.id}>
      <div className="page-shell prose" style={{ maxWidth: 'var(--container-prose)' }}>
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((p, i) => (
          <p key={i} className="body-copy">{p}</p>
        ))}
        {section.ctas?.[0] ? (
          <p>
            <Link href="/contact" className="action-quiet">{section.ctas[0]}</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
