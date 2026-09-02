import type { Section } from '@/lib/sections';

export default function Reputation({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-reputation" data-section={section.id}>
      <div className="page-shell prose">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((p, i) => (
          <p key={i} className="body-copy">{p}</p>
        ))}
        {(section.todo ?? []).map((t, i) => (
          <p key={i} className="todo-fact">{t}</p>
        ))}
      </div>
    </section>
  );
}
