import type { MetadataRoute } from 'next';
import { routes, siteUrl } from '@/lib/business';

// Generated FROM THE ROUTES CONSTANT, never hand-listed. D-01 fixes this site at
// five routes; D-02 scrubs the locations tree, so there is no `/locations/*`
// entry here and no city grid for one to point at. Four sibling sites reached
// their final acceptance sweep with robots, sitemap and not-found all missing.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.7,
  }));
}

export const dynamic = "force-static";
