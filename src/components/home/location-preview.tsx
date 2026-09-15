import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { LocationData } from "@/lib/utils/location";
import { LocationCard } from "@/components/locations/location-card";
import { Button } from "@/components/ui/button";

interface LocationPreviewProps {
  locations: LocationData[];
}

export function LocationPreview({ locations }: LocationPreviewProps) {
  const displayLocations = locations.slice(0, 2);

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kiosk Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Find Your Nearest BREW 9
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Designed for quick roadside stops, daily commutes, and on-the-go coffee runs.
            </p>
          </div>

          <Link href="/locations">
            <Button
              variant="outline"
              className="group border-border bg-card hover:bg-secondary/60 text-foreground font-semibold flex items-center gap-1.5"
            >
              View All Kiosks
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {displayLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayLocations.map((loc) => (
              <LocationCard key={loc._id} location={loc} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            Our inaugural kiosk is being set up. Check back soon for launch locations!
          </div>
        )}
      </div>
    </section>
  );
}
