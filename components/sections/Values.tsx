import type { Section } from '@/lib/sections';

export default function Values({ section }: { readonly section: Section }) {
  return (
    <section className="band band-tint pad-none" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <div className="cols cols-3">
          {(section.items ?? []).map((item, i) => (
            <div key={i}>
              <h3 className="h-item">{item.label}</h3>
              {item.text ? <p className="body-copy">{item.text}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
