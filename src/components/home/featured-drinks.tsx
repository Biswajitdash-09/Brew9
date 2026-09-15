import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MenuItemData, MenuCard } from "@/components/menu/menu-card";
import { Button } from "@/components/ui/button";

interface FeaturedDrinksProps {
  items: MenuItemData[];
}

export function FeaturedDrinks({ items }: FeaturedDrinksProps) {
  const displayItems = items.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Featured Brews
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Freshly decocted blends crafted for consistent flavor, rich aroma, and quick satisfaction.
            </p>
          </div>

          <Link href="/menu">
            <Button
              variant="outline"
              className="group border-border bg-card hover:bg-secondary/60 text-foreground font-semibold flex items-center gap-1.5"
            >
              Explore Full Menu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Drink Cards */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            Featured menu items are being prepared. Check back shortly!
          </div>
        )}
      </div>
    </section>
  );
}
