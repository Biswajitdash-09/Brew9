import Image from "next/image";
import { formatINR } from "@/lib/utils/format";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MenuItemData {
  _id: string;
  name: string;
  description: string;
  price: number;
  categorySlug: string;
  imageUrl?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder?: number;
}

interface MenuCardProps {
  item: MenuItemData;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "hot-coffee": "Hot Coffee",
  "cold-coffee": "Cold Coffee",
  signature: "Signature",
  "non-coffee": "Tea & Infusions",
};

export function MenuCard({ item, className }: MenuCardProps) {
  const categoryLabel = CATEGORY_LABELS[item.categorySlug] || item.categorySlug;

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border-border/80 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg flex flex-col justify-between",
        !item.isAvailable && "opacity-60 grayscale-30",
        className
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/40">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={item.isFeatured}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase font-semibold text-muted-foreground bg-muted/60">
            BREW 9 Blend
          </div>
        )}

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge
            variant="secondary"
            className="bg-card/90 text-foreground text-[11px] font-bold backdrop-blur-xs px-2.5 py-0.5 pointer-events-auto border-border shadow-xs"
          >
            {categoryLabel}
          </Badge>
          <div className="pointer-events-auto">
            <FavoriteButton menuItemId={item._id} size="sm" />
          </div>
        </div>

        {/* Availability Badge */}
        {!item.isAvailable && (
          <div className="absolute bottom-2 left-3 bg-black/80 text-cream text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
            Sold Out
          </div>
        )}
      </div>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h3>
            <span className="font-extrabold text-lg text-primary shrink-0">
              {formatINR(item.price)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">
            {item.isFeatured ? "⭐ House Favorite" : "Freshly Brewed"}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Quick Grab
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
