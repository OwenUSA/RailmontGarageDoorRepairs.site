import Link from 'next/link';
import { telHref } from '@/lib/business';
import type { Section } from '@/lib/sections';

export default function ClosingCta({ section }: { readonly section: Section }) {
  return (
    <section className="band band-dark pad-none" data-section={section.id}>
      <div className="page-shell prose">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((p, i) => (
          <p key={i} className="body-copy">{p}</p>
        ))}
        {section.ctas?.[0] ? (
          <p>
            <a href={telHref} className="action-quiet">{section.ctas[0]}</a>
          </p>
        ) : null}
        {section.ctas?.[1] ? (
          <p>
            <Link href="/contact" className="action-quiet">{section.ctas[1]}</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
