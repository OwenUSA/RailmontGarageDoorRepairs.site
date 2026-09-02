import type { Section } from '@/lib/sections';
import { telHref } from '@/lib/business';

export default function ServicesIntro({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-rhythm" data-section={section.id}>
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
          <a href={telHref} className="action-quiet">
            {section.ctas[0]}
          </a>
        ) : null}
      </div>
    </section>
  );
}
