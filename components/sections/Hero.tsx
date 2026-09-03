// `hero` on `/` and `services-banner` on `/services` — the two banner bands, both
// ADAPTED, both carrying an instance of the shared callback form. LEAD-OWNED for the
// same reason CallbackForm is: two route agents editing one banner is a collision.
//
// The reference banner computes as a plain block at 0/0 padding with the visual
// padding on an inner wrapper; the band root here does the same, because diff.mjs
// scores padTop/padBottom on the band element itself.

import type { Section } from '@/lib/sections';
import CallbackForm from './CallbackForm';

interface Props {
  readonly section: Section;
  /** `hero` uses the home pillars, `services-banner` its own three. */
  readonly pillarPrefix: 'hero-pillar' | 'services-pillar';
  /** The confirmation-panel line, lifted from the /contact band so no new copy is invented. */
  readonly doneText: string;
}

export default function Hero({ section, pillarPrefix, doneText }: Props) {
  const c = section.ctas ?? [];
  // Index map, fixed by content/copy.ts and documented rather than guessed:
  // 0 legend | 1 name | 2 phone | 3 service | 4-11 the eight symptoms |
  // 12 window | 13-15 the three windows | 16 message | 17 submit.
  const labels = { name: c[1] ?? '', phone: c[2] ?? '', service: c[3] ?? '', window: c[12] ?? '', message: c[16] ?? '' };
  const serviceOptions = c.slice(4, 12);
  const windowOptions = c.slice(13, 16);

  return (
    <section className="band band-dark pad-none" data-section={section.id}>
      <div
        className="page-shell"
        style={{ paddingTop: 'var(--spacing-6xl)', paddingBottom: 'var(--spacing-6xl)' }}
      >
        <div className="cols cols-2">
          <div>
            {section.heading ? <h1 className="h-band">{section.heading}</h1> : null}
            {section.subheading ? (
              <p className="lede" style={{ marginTop: 'var(--spacing-md)' }}>{section.subheading}</p>
            ) : null}

            <ul
              className="stack"
              style={{
                listStyle: 'none',
                margin: 0,
                marginTop: 'var(--spacing-2xl)',
                padding: 0,
                flexDirection: 'row',
                gap: 'var(--spacing-2xl)',
                flexWrap: 'wrap',
              }}
            >
              {(section.items ?? []).map((item, i) => (
                <li key={item.label} style={{ textAlign: 'center' }}>
                  {/* Plain <img>, matching the shell: next/image refuses to optimise
                      SVG by default and these placeholder slots are all SVG. */}
                  <img
                    alt={`${item.label} garage door repair — Railmont Garage Door Repairs, Fort Mill, SC`}
                    className="media"
                    height={208}
                    src={`/placeholders/${pillarPrefix}-${i + 1}.svg`}
                    style={{ width: '106px', height: '106px', objectFit: 'cover' }}
                    width={208}
                  />
                  <span className="eyebrow" style={{ display: 'block', marginTop: 'var(--spacing-2xs)' }}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="prose body-copy" style={{ marginTop: 'var(--spacing-2xl)' }}>
              {(section.body ?? []).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>

          <div>
            <img
              alt="Request a garage door repair callback — Railmont Garage Door Repairs, Fort Mill, SC"
              className="media"
              height={67}
              src="/placeholders/form-head-graphic.svg"
              style={{ marginBottom: 'var(--spacing-md)', maxWidth: '427px' }}
              width={427}
            />
            <CallbackForm
              doneText={doneText}
              labels={labels}
              serviceOptions={serviceOptions}
              submitLabel={c[17] ?? ''}
              windowOptions={windowOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
