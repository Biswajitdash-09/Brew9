import { MetadataRoute } from "next";
import { clientEnv } from "@/lib/env/client";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/menu", "/locations", "/about", "/contact", "/privacy", "/terms"],
        disallow: ["/admin", "/admin/*", "/account", "/account/*", "/auth/*", "/api/*"],
      },
    ],
    sitemap: `${clientEnv.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
