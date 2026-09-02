// The interior page-head strip — `/about`, `/services`, `/contact`, `/privacy`.
// ADAPTED, and explicitly NOT placeholder-blocked: docs/known-divergence.md 4 corrects
// the earlier claim that this band carries a roofing photograph. The Prompt 2 asset
// probe finds none; it is a solid strip, so it converges with nothing excluded.
//
// The reference strip is the only band on the site with a band-level box-shadow, and
// its computed value is rgba(0,0,0,0.16) 0px 3px 6px 0px — exactly --shadow-md once
// shadowGeometry() strips the colour. `.page-head` carries it.

import type { Section } from '@/lib/sections';

export default function PageHead({ section }: { readonly section: Section }) {
  return (
    <section className="band band-tint page-head pad-head" data-section={section.id}>
      <div className="page-shell">
        <h1 className="h-band">{section.heading}</h1>
      </div>
    </section>
  );
}
