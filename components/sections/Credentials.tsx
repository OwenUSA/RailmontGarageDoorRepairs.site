import type { Section } from '@/lib/sections';

/** The 16 `credential-badge-*` slots from assets/INVENTORY.md, at each row's 1440
 *  dimensions (falling back to 390 where the 1440 cell is "—"). Same chip set on
 *  both mountings — the reference band shows 15-19 badges at 1440 on both routes. */
const badges: readonly { readonly id: string; readonly w: number; readonly h: number }[] = [
  { id: 'best-of-irmo-2023', w: 158, h: 88 },
  { id: 'best-of-irmo-2024', w: 158, h: 88 },
  { id: 'eos', w: 139, h: 86 },
  { id: 'everest-systems-certified-installers', w: 225, h: 63 },
  { id: 'gaf-coating-pro', w: 219, h: 94 },
  { id: 'gaf-gold-elite-commercial-contractor', w: 183, h: 120 },
  { id: 'img-cert1', w: 134, h: 146 },
  { id: 'img-cert3', w: 134, h: 146 },
  { id: 'img-cert5', w: 225, h: 86 },
  { id: 'irmo-chapin2024-1', w: 170, h: 170 },
  { id: 'mule-hide-certified', w: 184, h: 63 },
  { id: 'roofing-contractors-columbia-2025-drk', w: 170, h: 170 },
  { id: 'select-shinglemaster-1', w: 170, h: 170 },
  { id: 'the-states-best-of-2018', w: 195, h: 170 },
  { id: 'verico-authorized-contractor', w: 219, h: 120 },
  { id: 'duro-last-certified-installers', w: 200, h: 107 },
];

export default function Credentials({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-none ta-center" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <ul className="chip-row" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {badges.map((badge) => (
            <li key={badge.id} className="chip" style={{ width: `${badge.w}px`, height: `${badge.h}px` }}>
              TODO(fact)
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
