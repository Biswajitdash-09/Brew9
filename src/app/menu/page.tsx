import type { Metadata } from "next";
import { Coffee } from "lucide-react";
import { MenuFilterClient } from "@/components/menu/menu-filter-client";
import { MenuItemData } from "@/components/menu/menu-card";

export const metadata: Metadata = {
  title: "Menu — Fresh Brews, Cold Coffee & Teas",
  description:
    "Explore the BREW 9 menu: Classic Hot Coffee starting at ₹30, signature brews, thick cold coffees, and refreshing chai. Honest prices, premium beans.",
};

const DEFAULT_CATEGORIES = [
  { name: "Hot Coffee", slug: "hot-coffee" },
  { name: "Cold Coffee", slug: "cold-coffee" },
  { name: "Signature", slug: "signature" },
  { name: "Tea & Infusions", slug: "non-coffee" },
];

const DEFAULT_MENU_ITEMS: MenuItemData[] = [
  {
    _id: "m-1",
    name: "Classic Coffee",
    description: "Freshly brewed aromatic Indian blend with a smooth, velvety finish.",
    price: 30,
    categorySlug: "hot-coffee",
    imageUrl: "/images/menu/espresso.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "m-2",
    name: "Strong Brew",
    description: "Double decoction robust coffee crafted for the early morning grind.",
    price: 40,
    categorySlug: "hot-coffee",
    imageUrl: "/images/menu/espresso.jpg",
    isAvailable: true,
    isFeatured: false,
  },
  {
    _id: "m-3",
    name: "Cappuccino",
    description: "Rich espresso topped with a thick layer of creamy microfoam.",
    price: 50,
    categorySlug: "hot-coffee",
    imageUrl: "/images/menu/latte.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "m-4",
    name: "Cold Coffee",
    description: "Thick, chilled espresso blended with fresh cream and subtle caramel sweetness.",
    price: 50,
    categorySlug: "cold-coffee",
    imageUrl: "/images/menu/iced-coffee.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "m-5",
    name: "Iced Latte",
    description: "Smooth espresso poured over iced whole milk for a clean, refreshing lift.",
    price: 60,
    categorySlug: "cold-coffee",
    imageUrl: "/images/menu/iced-coffee.jpg",
    isAvailable: true,
    isFeatured: false,
  },
  {
    _id: "m-6",
    name: "Mocha",
    description: "Decadent dark chocolate melted into bold espresso and cold milk.",
    price: 70,
    categorySlug: "cold-coffee",
    imageUrl: "/images/menu/mocha.jpg",
    isAvailable: true,
    isFeatured: false,
  },
  {
    _id: "m-7",
    name: "The 9 Brew",
    description: "Our signature house blend: slow-extracted cold espresso with roasted hazelnut undertones.",
    price: 60,
    categorySlug: "signature",
    imageUrl: "/images/menu/cold-brew.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    _id: "m-8",
    name: "Classic Chai",
    description: "Traditional brewed Indian tea infused with cardamom and fresh ginger.",
    price: 20,
    categorySlug: "non-coffee",
    imageUrl: "/images/menu/chai.jpg",
    isAvailable: true,
    isFeatured: false,
  },
  {
    _id: "m-9",
    name: "Lemon Iced Tea",
    description: "Refreshing cold black tea infused with real lemon zest and mint.",
    price: 30,
    categorySlug: "non-coffee",
    imageUrl: "/images/menu/chai.jpg",
    isAvailable: true,
    isFeatured: false,
  },
];

export default async function MenuPage() {
  let menuItems = DEFAULT_MENU_ITEMS;
  let categories = DEFAULT_CATEGORIES;

  try {
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("@/convex/_generated/api");
    const liveItems = await fetchQuery(api.menu.list, {});
    if (liveItems && liveItems.length > 0) {
      menuItems = liveItems;
    }
    const liveCats = await fetchQuery(api.categories.list);
    if (liveCats && liveCats.length > 0) {
      categories = liveCats;
    }
  } catch {
    // Fallback
  }

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-bold uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5 text-primary" />
            <span>Handcrafted Daily</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Our Menu
          </h1>
          <p className="text-base text-muted-foreground mt-3 leading-relaxed">
            Freshly roasted beans, crafted for taste and speed. No hidden charges, just honest coffee priced for your daily routine.
          </p>
        </div>

        <MenuFilterClient initialItems={menuItems} categories={categories} />
      </div>
    </div>
  );
}
