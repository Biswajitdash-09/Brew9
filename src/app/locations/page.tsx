import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { LocationCard } from "@/components/locations/location-card";
import { LocationData } from "@/lib/utils/location";

export const metadata: Metadata = {
  title: "Locations — Find a Roadside Kiosk",
  description:
    "Find your nearest BREW 9 roadside kiosk. Fast grab-and-go coffee, iced brews, and chai on your daily commute.",
};

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

export default async function LocationsPage() {
  let locations: LocationData[] = DEFAULT_LOCATIONS;

  try {
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("@/convex/_generated/api");
    const liveLocations = await fetchQuery(api.locations.getActive);
    if (liveLocations && liveLocations.length > 0) {
      locations = liveLocations;
    }
  } catch {
    // Fallback
  }

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Kiosk Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Find a Kiosk
          </h1>
          <p className="text-base text-muted-foreground mt-3 leading-relaxed">
            Our compact roadside kiosks are engineered for lightning-fast service on high-traffic commute routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {locations.map((loc) => (
            <LocationCard key={loc._id} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
}
