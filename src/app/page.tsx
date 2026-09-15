import { Hero } from "@/components/home/hero";
import { BrandStatement } from "@/components/home/brand-statement";
import { FeaturedDrinks } from "@/components/home/featured-drinks";
import { WhyBrew9 } from "@/components/home/why-brew9";
import { LocationPreview } from "@/components/home/location-preview";
import { CtaSection } from "@/components/home/cta-section";
import { MenuItemData } from "@/components/menu/menu-card";
import { LocationData } from "@/lib/utils/location";

// Fallback initial items for instant rendering / offline dev
const DEFAULT_FEATURED: MenuItemData[] = [
  {
    _id: "sample-1",
    name: "Classic Coffee",
    description: "Freshly brewed aromatic Indian blend with a smooth, velvety finish.",
    price: 30,
    categorySlug: "hot-coffee",
    imageUrl: "/images/menu/espresso.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "sample-2",
    name: "Cappuccino",
    description: "Rich espresso topped with a thick layer of creamy microfoam.",
    price: 50,
    categorySlug: "hot-coffee",
    imageUrl: "/images/menu/cappuccino.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "sample-3",
    name: "The 9 Brew",
    description: "Our signature house blend: slow-extracted cold espresso with roasted hazelnut undertones.",
    price: 60,
    categorySlug: "signature",
    imageUrl: "/images/menu/cold-brew.jpg",
    isAvailable: true,
    isFeatured: true,
  },
];

const DEFAULT_LOCATIONS: LocationData[] = [
  {
    _id: "loc-1",
    name: "BREW 9 — Kiosk #01 (Station Road)",
    slug: "station-road-kiosk",
    city: "Bhubaneswar",
    state: "Odisha",
    status: "coming_soon",
    specialNotice: "Inaugural kiosk launching soon. Follow us on Instagram for opening date!",
    weeklySchedule: [
      { dayOfWeek: 1, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 2, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 3, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 4, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 5, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 6, openTime: "09:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 0, openTime: "09:00", closeTime: "21:00", isClosed: false },
    ],
  },
];

export default async function HomePage() {
  let featuredItems: MenuItemData[] = DEFAULT_FEATURED;
  let locations: LocationData[] = DEFAULT_LOCATIONS;

  try {
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("@/convex/_generated/api");
    const liveFeatured = await fetchQuery(api.menu.getFeatured);
    if (liveFeatured && liveFeatured.length > 0) {
      featuredItems = liveFeatured;
    }
    const liveLocations = await fetchQuery(api.locations.getActive);
    if (liveLocations && liveLocations.length > 0) {
      locations = liveLocations;
    }
  } catch {
    // Graceful fallback to static initial dataset during build/offline
  }

  // Schema.org Organization Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CoffeeShop",
    name: "BREW 9",
    description: "Modern, affordable Indian coffee brand designed around the everyday 9-to-9 grind.",
    priceRange: "₹20 - ₹70",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://brew9.in",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col">
        <Hero />
        <BrandStatement />
        <FeaturedDrinks items={featuredItems} />
        <WhyBrew9 />
        <LocationPreview locations={locations} />
        <CtaSection />
      </div>
    </>
  );
}
