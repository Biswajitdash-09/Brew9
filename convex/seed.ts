import { mutation } from "./_generated/server";

/**
 * Initial development seed data.
 * All records are marked as sample items and can be adjusted through the Admin Dashboard.
 */
export const seedInitialData = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Seed Categories if empty
    const existingCategories = await ctx.db.query("categories").collect();
    if (existingCategories.length === 0) {
      const categories = [
        { name: "Hot Coffee", slug: "hot-coffee", displayOrder: 1 },
        { name: "Cold Coffee", slug: "cold-coffee", displayOrder: 2 },
        { name: "Signature", slug: "signature", displayOrder: 3 },
        { name: "Non-Coffee", slug: "non-coffee", displayOrder: 4 },
      ];

      for (const cat of categories) {
        await ctx.db.insert("categories", cat);
      }
    }

    // 2. Seed Sample Menu Items if empty
    const existingMenu = await ctx.db.query("menuItems").collect();
    if (existingMenu.length === 0) {
      const now = Date.now();
      const sampleItems = [
        // Hot Coffee
        {
          name: "Classic Coffee",
          description: "Freshly brewed aromatic Indian blend with a smooth, velvety finish.",
          price: 30,
          categorySlug: "hot-coffee",
          imageUrl: "/images/menu/espresso.jpg",
          isAvailable: true,
          isFeatured: true,
          displayOrder: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Strong Brew",
          description: "Double decoction robust coffee crafted for the early morning grind.",
          price: 40,
          categorySlug: "hot-coffee",
          imageUrl: "/images/menu/americano.jpg",
          isAvailable: true,
          isFeatured: false,
          displayOrder: 2,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Cappuccino",
          description: "Rich espresso topped with a thick layer of creamy microfoam.",
          price: 50,
          categorySlug: "hot-coffee",
          imageUrl: "/images/menu/cappuccino.jpg",
          isAvailable: true,
          isFeatured: true,
          displayOrder: 3,
          createdAt: now,
          updatedAt: now,
        },
        // Cold Coffee
        {
          name: "Cold Coffee",
          description: "Thick, chilled espresso blended with fresh cream and subtle caramel sweetness.",
          price: 50,
          categorySlug: "cold-coffee",
          imageUrl: "/images/menu/cold-brew.jpg",
          isAvailable: true,
          isFeatured: true,
          displayOrder: 4,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Iced Latte",
          description: "Smooth espresso poured over iced whole milk for a clean, refreshing lift.",
          price: 60,
          categorySlug: "cold-coffee",
          imageUrl: "/images/menu/latte.jpg",
          isAvailable: true,
          isFeatured: false,
          displayOrder: 5,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Mocha",
          description: "Decadent dark chocolate melted into bold espresso and cold milk.",
          price: 70,
          categorySlug: "cold-coffee",
          imageUrl: "/images/menu/mocha.jpg",
          isAvailable: true,
          isFeatured: false,
          displayOrder: 6,
          createdAt: now,
          updatedAt: now,
        },
        // Signature
        {
          name: "The 9 Brew",
          description: "Our signature house blend: slow-extracted cold espresso with roasted hazelnut undertones.",
          price: 60,
          categorySlug: "signature",
          imageUrl: "/images/menu/iced-coffee.jpg",
          isAvailable: true,
          isFeatured: true,
          displayOrder: 7,
          createdAt: now,
          updatedAt: now,
        },
        // Non-Coffee
        {
          name: "Classic Chai",
          description: "Traditional brewed Indian tea infused with cardamom and fresh ginger.",
          price: 20,
          categorySlug: "non-coffee",
          imageUrl: "/images/menu/chai.jpg",
          isAvailable: true,
          isFeatured: false,
          displayOrder: 8,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Lemon Iced Tea",
          description: "Refreshing cold black tea infused with real lemon zest and mint.",
          price: 30,
          categorySlug: "non-coffee",
          imageUrl: "/images/menu/iced-coffee.jpg",
          isAvailable: true,
          isFeatured: false,
          displayOrder: 9,
          createdAt: now,
          updatedAt: now,
        },
      ];

      for (const item of sampleItems) {
        await ctx.db.insert("menuItems", item);
      }
    }

    // 3. Seed Initial Kiosk Placeholder (Option A Structured Hours, zero fake coordinates)
    const existingLocations = await ctx.db.query("locations").collect();
    if (existingLocations.length === 0) {
      const now = Date.now();
      await ctx.db.insert("locations", {
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
        createdAt: now,
        updatedAt: now,
      });
    }

    return { success: true, message: "Initial sample seed completed." };
  },
});
