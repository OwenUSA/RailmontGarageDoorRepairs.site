import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function Testimonials({ section }: { readonly section: Section }) {
  const cta = section.ctas?.[0];
  return (
    <section className="band band-tint pad-none ta-center" data-section={section.id}>
      <div className="page-shell stack">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <div className="cols cols-3">
          {/* Index keys: D-13 makes the three placeholder blocks DELIBERATELY IDENTICAL,
              so the string is not a unique key and React warns on every render. */}
          {(section.body ?? []).map((quote, i) => (
            <blockquote key={`q${i}`} className="stack">
              <img
                src="/placeholders/testimonial-quote-mark.svg"
                alt="Customer review of Railmont Garage Door Repairs, Fort Mill, SC"
                width={82}
                height={63}
              />
              <p className="body-copy">{quote}</p>
            </blockquote>
          ))}
        </div>
        {(section.todo ?? []).map((line) => (
          <p key={line} className="todo-fact">
            {line}
          </p>
        ))}
        {cta ? (
          <Link href="/contact" className="action-quiet">
            {cta}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
