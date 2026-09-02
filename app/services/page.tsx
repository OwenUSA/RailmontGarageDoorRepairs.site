import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// Read, never hardcoded — see app/page.tsx.
export const metadata: Metadata = copy.routes['/services'].meta;

export default function ServicesPage() {
  return <main data-route="/services">{/* STUB: sections land in Prompt 7 */}</main>;
}
