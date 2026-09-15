import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

/**
 * One-time admin bootstrap. Executable solely via backend CLI:
 * npx convex run admin:bootstrapAdmin '{"clerkId": "user_xxx"}'
 */
export const bootstrapAdmin = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    // Guard: refuse if any admin already exists
    const existingAdmin = await ctx.db
      .query("users")
      .withIndex("by_role", (q: any) => q.eq("role", "admin"))
      .first();

    if (existingAdmin) {
      throw new Error("Bootstrap rejected: An administrator is already registered in the system.");
    }

    const user: any = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("Bootstrap failed: Target user must sign in to the website once first.");
    }

    await ctx.db.patch(user._id as any, {
      role: "admin",
      updatedAt: Date.now(),
    });

    return { success: true, userId: user._id, name: user.name };
  },
});

/**
 * Admin query: Aggregates metrics for the admin dashboard.
 */
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const users: any[] = await ctx.db.query("users").collect();
    const menuItems: any[] = await ctx.db.query("menuItems").collect();
    const locations: any[] = await ctx.db.query("locations").collect();
    const feedback: any[] = await ctx.db.query("feedback").collect();

    const featuredCount = menuItems.filter((i) => i.isFeatured).length;
    const activeLocations = locations.filter((l) => l.status === "open").length;

    return {
      totalUsers: users.length,
      totalMenuItems: menuItems.length,
      featuredMenuItems: featuredCount,
      totalLocations: locations.length,
      activeLocations,
      totalFeedback: feedback.length,
    };
  },
});

/**
 * Admin mutation: Creates a new menu item.
 */
export const createMenuItem = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    categorySlug: v.string(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
    isFeatured: v.boolean(),
    displayOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    if (args.price < 0 || !Number.isInteger(args.price)) {
      throw new Error("Price must be a positive integer in INR.");
    }

    const now = Date.now();
    return await ctx.db.insert("menuItems", {
      name: args.name.trim(),
      description: args.description.trim(),
      price: args.price,
      categorySlug: args.categorySlug,
      imageUrl: args.imageUrl,
      isAvailable: args.isAvailable,
      isFeatured: args.isFeatured,
      displayOrder: args.displayOrder,
      createdAt: now,
      updatedAt: now,
    } as any);
  },
});

/**
 * Admin mutation: Updates an existing menu item.
 */
export const updateMenuItem = mutation({
  args: {
    id: v.id("menuItems"),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    categorySlug: v.string(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
    isFeatured: v.boolean(),
    displayOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    if (args.price < 0 || !Number.isInteger(args.price)) {
      throw new Error("Price must be a positive integer in INR.");
    }

    await ctx.db.patch(args.id as any, {
      name: args.name.trim(),
      description: args.description.trim(),
      price: args.price,
      categorySlug: args.categorySlug,
      imageUrl: args.imageUrl,
      isAvailable: args.isAvailable,
      isFeatured: args.isFeatured,
      displayOrder: args.displayOrder,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Admin mutation: Toggles menu item availability.
 */
export const toggleItemAvailability = mutation({
  args: {
    id: v.id("menuItems"),
    isAvailable: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    await ctx.db.patch(args.id as any, {
      isAvailable: args.isAvailable,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Admin mutation: Creates a new coffee kiosk location.
 */
export const createLocation = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    postalCode: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    phone: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("coming_soon"), v.literal("temporarily_closed")),
    imageUrl: v.optional(v.string()),
    specialNotice: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const now = Date.now();
    return await ctx.db.insert("locations", {
      name: args.name.trim(),
      slug: args.slug.trim().toLowerCase(),
      address: args.address?.trim(),
      city: args.city.trim(),
      state: args.state.trim(),
      postalCode: args.postalCode?.trim(),
      latitude: args.latitude,
      longitude: args.longitude,
      phone: args.phone?.trim(),
      status: args.status,
      imageUrl: args.imageUrl,
      specialNotice: args.specialNotice?.trim(),
      createdAt: now,
      updatedAt: now,
    } as any);
  },
});

/**
 * Admin mutation: Updates an existing location.
 */
export const updateLocation = mutation({
  args: {
    id: v.id("locations"),
    name: v.string(),
    slug: v.string(),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    postalCode: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    phone: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("coming_soon"), v.literal("temporarily_closed")),
    imageUrl: v.optional(v.string()),
    specialNotice: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    await ctx.db.patch(args.id as any, {
      name: args.name.trim(),
      slug: args.slug.trim().toLowerCase(),
      address: args.address?.trim(),
      city: args.city.trim(),
      state: args.state.trim(),
      postalCode: args.postalCode?.trim(),
      latitude: args.latitude,
      longitude: args.longitude,
      phone: args.phone?.trim(),
      status: args.status,
      imageUrl: args.imageUrl,
      specialNotice: args.specialNotice?.trim(),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Admin query: Lists all users.
 */
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    return await ctx.db
      .query("users")
      .order("desc")
      .collect();
  },
});

/**
 * Admin mutation: Updates a user's role.
 */
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    await ctx.db.patch(args.userId as any, {
      role: args.role,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
