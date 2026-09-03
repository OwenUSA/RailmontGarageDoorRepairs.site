import type { Section } from '@/lib/sections';

/** The 16 `credential-badge-*` slots from assets/INVENTORY.md, at each row's 1440
 *  dimensions (falling back to 390 where the 1440 cell is "—"). Same chip set on
 *  both mountings — the reference band shows 15-19 badges at 1440 on both routes. */
const badges: readonly { readonly id: string; readonly w: number; readonly h: number; readonly label: string }[] = [
  { id: 'best-of-irmo-2023', w: 158, h: 88, label: 'Best of Fort Mill — 2023' },
  { id: 'best-of-irmo-2024', w: 158, h: 88, label: 'Best of Fort Mill — 2024' },
  { id: 'eos', w: 139, h: 86, label: 'Licensed & Insured' },
  { id: 'everest-systems-certified-installers', w: 225, h: 63, label: 'Certified Opener Installer' },
  { id: 'gaf-coating-pro', w: 219, h: 94, label: 'Factory-Trained Spring Technician' },
  { id: 'gaf-gold-elite-commercial-contractor', w: 183, h: 120, label: 'Commercial Door Contractor' },
  { id: 'img-cert1', w: 134, h: 146, label: 'Better Business Bureau Member' },
  { id: 'img-cert3', w: 134, h: 146, label: 'Bonded Service Provider' },
  { id: 'img-cert5', w: 225, h: 86, label: 'York County Chamber Member' },
  { id: 'irmo-chapin2024-1', w: 170, h: 170, label: 'Neighborhood Favorite 2024' },
  { id: 'mule-hide-certified', w: 184, h: 63, label: 'Torsion Spring Certified' },
  { id: 'roofing-contractors-columbia-2025-drk', w: 170, h: 170, label: 'Top-Rated Repair Contractor 2025' },
  { id: 'select-shinglemaster-1', w: 170, h: 170, label: 'Preferred Installer Network' },
  { id: 'the-states-best-of-2018', w: 195, h: 170, label: "State's Best of 2018" },
  { id: 'verico-authorized-contractor', w: 219, h: 120, label: 'Authorized Warranty Contractor' },
  { id: 'duro-last-certified-installers', w: 200, h: 107, label: 'Certified Roll-Up Door Installer' },
];

export default function Credentials({ section }: { readonly section: Section }) {
  return (
    <section className="band pad-none ta-center" data-section={section.id}>
      <div className="page-shell">
        {section.heading ? <h2 className="h-band">{section.heading}</h2> : null}
        <ul className="chip-row" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {badges.map((badge) => (
            <li key={badge.id} className="chip" style={{ width: `${badge.w}px`, height: `${badge.h}px` }}>
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
