import { clientEnv } from "@/lib/env/client";
import { BRAND } from "./brand";

export const siteConfig = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  description: `${BRAND.name} — ${BRAND.tagline}. ${BRAND.secondaryTagline} Fresh, affordable, grab-and-go coffee crafted for everyday routines.`,
  url: clientEnv.NEXT_PUBLIC_APP_URL,
  ogImage: `${clientEnv.NEXT_PUBLIC_APP_URL}/brand/og-image.png`,
  links: {
    twitter: BRAND.socials.twitter,
    instagram: BRAND.socials.instagram,
  },
};
