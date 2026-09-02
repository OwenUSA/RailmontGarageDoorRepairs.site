import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function RiskBand({ section }: { readonly section: Section }) {
  return (
    <section className="band band-dark pad-none" data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {section.body?.length ? (
          <div className="prose">
            {section.body.map((p, i) => (
              <p key={i} className="body-copy">
                {p}
              </p>
            ))}
          </div>
        ) : null}
        {section.ctas?.[0] ? (
          <Link href="/contact" className="action-quiet">
            {section.ctas[0]}
          </Link>
        ) : null}
        <img
          className="media"
          src="/placeholders/promise-media.svg"
          alt=""
          width={720}
          height={405}
        />
      </div>
    </section>
  );
}
