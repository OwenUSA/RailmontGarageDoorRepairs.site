import type { Section } from '@/lib/sections';

export default function ServicesDetail({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-none" id="services-detail" data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <img
          className="media"
          src="/placeholders/services-detail-image.svg"
          alt=""
          width={650}
          height={488}
        />
        {section.items?.length ? (
          <div className="cols cols-2">
            {section.items.map((item) => (
              <div key={item.label} className="stack">
                <h3 className="h-item">{item.label}</h3>
                {item.text ? <p className="body-copy">{item.text}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
        {section.body?.length ? (
          <div className="prose">
            {section.body.map((p, i) => (
              <p key={i} className="body-copy">
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
