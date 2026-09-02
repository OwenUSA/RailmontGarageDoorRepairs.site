// <!-- UNREVIEWED TEMPLATE — requires legal review before launch -->
// `privacy-body` on `/privacy` — NOVEL (D-16). CLAUDE.md names the privacy policy body
// as the NOVEL exemplar: the text is generated from what this site actually does, not
// adapted from the reference's. Measured by token conformance at zero violations,
// single pass (A-9) — tokenViolations() scores the BAND element's own colour,
// background, border colour, font size, weight, radius and shadow, all of which come
// from `.band` and therefore from the Prompt 5 @theme block.
//
// The first paragraph of `body` is the unreviewed-template notice and RENDERS VISIBLY.
// A legal caveat that exists only as an HTML comment is a caveat nobody sees; the
// comment above is the one CLAUDE.md asks for, the rendered notice is the one that works.
//
// No GDPR or CCPA claim anywhere. Contact routes are the telephone and the postal
// address, and nothing else (D-03).

import type { Section } from '@/lib/sections';

export default function PrivacyBody({ section }: { readonly section: Section }) {
  const [notice, ...rest] = section.body ?? [];
  return (
    <section className="band pad-prose" data-section={section.id}>
      <div className="page-shell">
        <div style={{ maxWidth: 'var(--container-prose)' }}>
          <h2 className="h-band">{section.heading}</h2>
          {notice ? (
            <p className="todo-fact" style={{ marginTop: 'var(--spacing-lg)' }}>{notice}</p>
          ) : null}
          <div className="prose body-copy" style={{ marginTop: 'var(--spacing-lg)' }}>
            {rest.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
