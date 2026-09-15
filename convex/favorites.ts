import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, requireCurrentUser } from "./lib/auth";
import { enforceRateLimit } from "./lib/rateLimit";

/**
 * Toggles favorite state of a menu item for current user.
 */
export const toggle = mutation({
  args: {
    menuItemId: v.id("menuItems"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx);
    await enforceRateLimit(ctx, user._id, "favorites:toggle");

    // Verify target menu item exists
    const item = await ctx.db.get(args.menuItemId as any);
    if (!item) {
      throw new Error("Item not found");
    }

    const existing: any = await ctx.db
      .query("favorites")
      .withIndex("by_userId_menuItemId", (q: any) =>
        q.eq("userId", user._id).eq("menuItemId", args.menuItemId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id as any);
      return { favorited: false };
    }

    await ctx.db.insert("favorites", {
      userId: user._id,
      menuItemId: args.menuItemId,
      createdAt: Date.now(),
    } as any);

    return { favorited: true };
  },
});

/**
 * Lists all favorited menu items for current user.
 */
export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const favorites: any[] = await ctx.db
      .query("favorites")
      .withIndex("by_userId", (q: any) => q.eq("userId", user._id))
      .collect();

    const items = await Promise.all(
      favorites.map(async (fav) => {
        const item = await ctx.db.get(fav.menuItemId as any);
        return item ? { ...item, favoriteId: fav._id } : null;
      })
    );

    return items.filter((item): item is NonNullable<typeof item> => item !== null);
  },
});

/**
 * Checks if a specific menu item is favorited by current user.
 */
export const isFavorited = query({
  args: {
    menuItemId: v.id("menuItems"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return false;
    }

    const fav = await ctx.db
      .query("favorites")
      .withIndex("by_userId_menuItemId", (q: any) =>
        q.eq("userId", user._id).eq("menuItemId", args.menuItemId)
      )
      .unique();

    return !!fav;
  },
});
