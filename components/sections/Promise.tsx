// `promise` — ADAPTED, ref band s08. `band-dark` paints neutral-900 with
// surface text on heading/body; no hand-set colour here (a sibling shipped a
// 1.46:1 band that way).

import Link from 'next/link';
import type { Section } from '@/lib/sections';

export default function Promise({ section }: { readonly section: Section }) {
  const cta = section.ctas?.[0];

  return (
    <section className="band band-dark pad-promise" data-section={section.id}>
      <div className="page-shell">
        <div className="cols cols-2">
          <div>
            <img
              alt="Garage door technician balancing springs and hardware — Railmont Garage Door Repairs, Fort Mill, SC"
              className="media"
              height={366}
              src="/placeholders/promise-media.svg"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              width={650}
            />
          </div>
          <div>
            {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
            <div className="body-copy" style={{ marginTop: 'var(--spacing-lg)' }}>
              {(section.body ?? []).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {cta ? (
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                <Link className="action-quiet" href="/contact">
                  {cta}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
