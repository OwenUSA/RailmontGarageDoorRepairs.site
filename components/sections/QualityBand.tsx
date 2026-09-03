import type { Section } from '@/lib/sections';

const icons = [
  { src: '/placeholders/quality-icon-1.svg', width: 115, height: 115 },
  { src: '/placeholders/quality-icon-2.svg', width: 115, height: 115 },
  { src: '/placeholders/icon-commercial.svg', width: 114, height: 91 },
];

export default function QualityBand({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-rhythm" data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {section.items?.length ? (
          <div className="cols cols-3">
            {section.items.map((item, i) => {
              const icon = icons[i % icons.length] ?? icons[0]!;
              return (
                <div key={item.label} className="stack">
                  <img
                    className="media"
                    src={icon.src}
                    alt={`${item.label} — Railmont Garage Door Repairs, Fort Mill, SC`}
                    width={icon.width}
                    height={icon.height}
                  />
                  <h3 className="h-item">{item.label}</h3>
                  {item.text ? <p className="body-copy">{item.text}</p> : null}
                </div>
              );
            })}
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
