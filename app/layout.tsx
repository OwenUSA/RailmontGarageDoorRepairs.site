import type { Metadata } from 'next';
import { business } from '@/content/copy';
import './globals.css';

// Route-level metadata lives in content/copy.ts and is exported by each page file.
// This is the fallback title/description only, and it too comes from the copy module.
export const metadata: Metadata = {
  title: { default: business.name, template: `%s` },
  description: business.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
