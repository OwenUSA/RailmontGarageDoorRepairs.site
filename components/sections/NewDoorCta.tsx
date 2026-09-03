import Link from 'next/link';
import { telHref } from '@/lib/business';
import type { Section } from '@/lib/sections';

export default function NewDoorCta({ section }: { readonly section: Section }) {
  const [firstCta, secondCta] = section.ctas ?? [];
  return (
    <section className="band band-dark pad-rhythm ta-center" data-section={section.id}>
      <div className="page-shell stack">
        <img
          src="/placeholders/cta-lockup.svg"
          alt="New garage door installation — Railmont Garage Door Repairs, Fort Mill, SC"
          width={308}
          height={61}
        />
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        {(section.body ?? []).map((line) => (
          <p key={line} className="lede">
            {line}
          </p>
        ))}
        {firstCta ? (
          <Link href="/contact" className="action-quiet">
            {firstCta}
          </Link>
        ) : null}
        {secondCta ? (
          <a href={telHref} className="action-quiet">
            {secondCta}
          </a>
        ) : null}
      </div>
    </section>
  );
}
