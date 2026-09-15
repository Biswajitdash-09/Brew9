import { MenuItemData, MenuCard } from "./menu-card";
import { cn } from "@/lib/utils";

interface MenuGridProps {
  items: MenuItemData[];
  className?: string;
}

export function MenuGrid({ items, className }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-card/40 my-8">
        <p className="text-base font-semibold text-foreground">No drinks found in this category.</p>
        <p className="text-xs text-muted-foreground mt-1">Check back soon as we brew fresh batches!</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
        className
      )}
    >
      {items.map((item) => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  );
}
