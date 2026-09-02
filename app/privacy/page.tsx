import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// Read, never hardcoded — see app/page.tsx.
export const metadata: Metadata = copy.routes['/privacy'].meta;

export default function PrivacyPage() {
  return <main id="main" tabIndex={-1} className="page-main" data-route="/privacy">{/* STUB: sections land in Prompt 7 */}</main>;
}
