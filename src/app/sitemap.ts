import { MetadataRoute } from "next";
import { clientEnv } from "@/lib/env/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = clientEnv.NEXT_PUBLIC_APP_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic kiosk locations
  const dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("@/convex/_generated/api");
    const locations = await fetchQuery(api.locations.getActive);
    if (locations) {
      for (const loc of locations) {
        dynamicRoutes.push({
          url: `${baseUrl}/locations/${loc.slug}`,
          lastModified: new Date(loc.updatedAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // Graceful fallback
    dynamicRoutes.push({
      url: `${baseUrl}/locations/station-road-kiosk`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}
