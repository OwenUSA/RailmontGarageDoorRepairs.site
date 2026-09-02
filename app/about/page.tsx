import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// Read, never hardcoded — see app/page.tsx.
export const metadata: Metadata = copy.routes['/about'].meta;

export default function AboutPage() {
  return <main id="main" tabIndex={-1} className="page-main" data-route="/about">{/* STUB: sections land in Prompt 7 */}</main>;
}
