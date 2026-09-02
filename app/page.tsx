import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// Metadata is READ from content/copy.ts, never written here. A sibling site hardcoded
// `metadata` into five page files, shipped the wrong city in all five, and no gate could
// see it — similarity.mjs reads copy.ts, so anything there is measured.
export const metadata: Metadata = copy.routes['/'].meta;

export default function HomePage() {
  return <main data-route="/">{/* STUB: sections land in Prompt 6 */}</main>;
}
