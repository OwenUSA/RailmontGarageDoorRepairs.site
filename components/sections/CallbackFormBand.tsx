// `callback-form` on `/contact` — ADAPTED. Replaces Formidable Forms + Formidable Pro
// + reCAPTCHA + an Akismet timestamp script (17-44 inputs depending on the page) with
// five fields and no backend. D-03, D-05, D-15.
//
// The band root is `id="callback"` as well as `data-section` — the shell's "Request a
// callback" links target it. The probe reads data-section first precisely so that a
// scroll anchor on a band does not break its contract pairing.

import type { Section } from '@/lib/sections';
import CallbackForm from './CallbackForm';

export default function CallbackFormBand({ section }: { readonly section: Section }) {
  const items = section.items ?? [];
  const c = section.ctas ?? [];
  // content/copy.ts: items 0-4 are the five field labels with their hints;
  // ctas 0-7 are the eight symptoms, 8-10 the three windows, 11 the submit label.
  const labels = {
    name: items[0]?.label ?? '',
    phone: items[1]?.label ?? '',
    service: items[2]?.label ?? '',
    window: items[3]?.label ?? '',
    message: items[4]?.label ?? '',
  };
  const hints = {
    name: items[0]?.text,
    phone: items[1]?.text,
    service: items[2]?.text,
    window: items[3]?.text,
    message: items[4]?.text,
  };

  return (
    <section className="band pad-prose" data-section={section.id} id="callback">
      <div className="page-shell">
        <div className="cols cols-2">
          <div>
            <h2 className="h-band">{section.heading}</h2>
            <div className="prose body-copy" style={{ marginTop: 'var(--spacing-lg)' }}>
              {(section.body ?? []).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <div>
            <CallbackForm
              doneText={section.subheading ?? ''}
              hints={hints}
              labels={labels}
              serviceOptions={c.slice(0, 8)}
              submitLabel={c[11] ?? ''}
              windowOptions={c.slice(8, 11)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
