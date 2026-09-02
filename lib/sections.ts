// lib/sections.ts — the one lookup every band component uses.
//
// Page files pass a `Section` down; components never reach into `content/copy.ts`
// themselves. That keeps the copy module the single measured source (similarity.mjs
// reads it) and keeps a component reusable across the two routes that share it —
// `services-grid` on `/` and `/about`, `process` and `credentials` on `/` and
// `/services` — where the two rows pair to DIFFERENT reference bands and therefore
// carry different `refSection` values.

import { copy, type Route, type Section } from '@/content/copy';

export function getSection(route: Route, id: string): Section {
  const s = copy.routes[route].sections.find((x) => x.id === id);
  // Throwing beats returning undefined: a mistyped id is a build failure at the
  // first render rather than a silently missing band that diff.mjs reports as an
  // unpaired 100%.
  if (!s) throw new Error(`getSection: no section "${id}" on route "${route}"`);
  return s;
}

export type { Route, Section };
