import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Clock, Phone, Navigation } from "lucide-react";
import { LocationData, getLocationOpenStatus } from "@/lib/utils/location";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `BREW 9 — Kiosk (${slug})`,
    description: `Visit our BREW 9 kiosk for fresh grab-and-go coffee, espresso blends, and chai.`,
  };
}

export default async function SingleLocationPage({ params }: LocationPageProps) {
  const { slug } = await params;

  let location: LocationData | null = null;

  try {
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("@/convex/_generated/api");
    location = await fetchQuery(api.locations.getBySlug, { slug });
  } catch {
    // Fallback if testing static
  }

  // Fallback sample match if testing offline
  if (!location && slug === "station-road-kiosk") {
    location = {
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
    };
  }

  if (!location) {
    notFound();
  }

  const { statusBadgeText, statusColorClass } = getLocationOpenStatus(location);

  const hasCoordinates =
    location.latitude !== undefined &&
    location.longitude !== undefined &&
    location.latitude !== 0 &&
    location.longitude !== 0;

  const directionsUrl = hasCoordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`
    : location.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${location.name}, ${location.address}, ${location.city}`
      )}`
    : null;

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/locations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all kiosks
        </Link>

        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                {location.name}
              </h1>
              <p className="text-sm font-bold uppercase tracking-wider text-primary mt-1">
                {location.city}, {location.state}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`text-xs font-bold px-3 py-1 border shrink-0 ${statusColorClass}`}
            >
              {statusBadgeText}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Location & Hours
              </h2>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {location.address || (
                    <span className="italic">Kiosk address to be confirmed upon launch.</span>
                  )}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Operating Schedule: 9:00 AM – 9:00 PM Daily</span>
              </div>
              {location.phone && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href={`tel:${location.phone}`} className="hover:underline text-foreground">
                    {location.phone}
                  </a>
                </div>
              )}
            </div>

            {location.specialNotice && (
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border text-sm text-foreground leading-relaxed flex flex-col justify-center">
                <span className="font-bold text-xs uppercase tracking-wider text-primary mb-1">
                  Kiosk Announcement
                </span>
                {location.specialNotice}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
            {directionsUrl ? (
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground min-h-[48px] font-bold flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Live Directions
                </Button>
              </a>
            ) : (
              <Button disabled variant="outline" className="flex-1 min-h-[48px]">
                Directions Available on Launch
              </Button>
            )}
            <Link href="/menu" className="flex-1">
              <Button variant="outline" className="w-full min-h-[48px] font-semibold">
                View Kiosk Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
