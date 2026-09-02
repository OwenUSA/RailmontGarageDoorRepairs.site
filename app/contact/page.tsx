import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// Read, never hardcoded — see app/page.tsx.
export const metadata: Metadata = copy.routes['/contact'].meta;

export default function ContactPage() {
  return <main id="main" tabIndex={-1} className="page-main" data-route="/contact">{/* STUB: sections land in Prompt 7 */}</main>;
}
