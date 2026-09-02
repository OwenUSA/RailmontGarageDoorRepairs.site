// `intro` — ADAPTED, ref band s02. Reads better as centred prose than with the
// background-image slot, so the placeholder is deliberately unused here (an
// image-backed text box scores UNMEASURABLE on rendertruth's text-legibility
// check, and this band's body copy is the whole point of the section).

import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function Intro({ section }: { readonly section: Section }) {
  const cta = section.ctas?.[0];

  return (
    <section className="band pad-intro ta-center-md" data-section={section.id}>
      <div className="page-shell">
        <div className="prose">
          {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
          <div className="body-copy" style={{ marginTop: 'var(--spacing-lg)' }}>
            {(section.body ?? []).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {cta ? (
            <p style={{ marginTop: 'var(--spacing-lg)' }}>
              <Link className="action-quiet" href="/services">
                {cta}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
