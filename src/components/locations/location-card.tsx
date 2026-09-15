import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { LocationData, getLocationOpenStatus } from "@/lib/utils/location";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  location: LocationData;
  className?: string;
}

export function LocationCard({ location, className }: LocationCardProps) {
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
    <Card
      className={cn(
        "rounded-2xl border-border bg-card overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg flex flex-col justify-between",
        className
      )}
    >
      <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full gap-6">
        <div>
          {/* Header & Status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-xl text-foreground leading-snug">
              {location.name}
            </h3>
            <Badge
              variant="outline"
              className={cn("text-xs font-bold px-2.5 py-0.5 shrink-0 border", statusColorClass)}
            >
              {statusBadgeText}
            </Badge>
          </div>

          {/* City & State */}
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
            {location.city}, {location.state}
          </p>

          {/* Details List */}
          <div className="space-y-2.5 text-sm text-muted-foreground">
            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                {location.address ? (
                  location.address
                ) : (
                  <span className="italic text-muted-foreground/80">
                    Kiosk location details to be announced.
                  </span>
                )}
              </span>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                {location.status === "coming_soon"
                  ? "Standard Hours: 9:00 AM – 9:00 PM (On launch)"
                  : "Daily: 9:00 AM – 9:00 PM"}
              </span>
            </div>

            {/* Phone */}
            {location.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`tel:${location.phone}`}
                  className="hover:text-foreground hover:underline transition-colors font-medium"
                >
                  {location.phone}
                </a>
              </div>
            )}
          </div>

          {/* Special Notice */}
          {location.specialNotice && (
            <div className="mt-4 p-3 rounded-xl bg-secondary/40 border border-border/80 text-xs text-foreground/90 font-medium leading-relaxed">
              💡 {location.specialNotice}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border/80 flex items-center gap-3">
          {directionsUrl ? (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold flex items-center justify-center gap-2 min-h-[44px]">
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
          ) : (
            <Button
              disabled
              variant="outline"
              className="w-full text-muted-foreground min-h-[44px]"
            >
              Directions Available on Launch
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
