import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Public query: Lists active menu items, optionally filtered by category.
 */
export const list = query({
  args: {
    categorySlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let items;
    if (args.categorySlug) {
      items = await ctx.db
        .query("menuItems")
        .withIndex("by_categorySlug", (q) => q.eq("categorySlug", args.categorySlug!))
        .collect();
    } else {
      items = await ctx.db
        .query("menuItems")
        .withIndex("by_displayOrder")
        .collect();
    }

    return items;
  },
});

/**
 * Public query: Returns featured drinks for homepage.
 */
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("menuItems")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
  },
});

/**
 * Public query: Gets a single menu item by ID.
 */
export const getById = query({
  args: {
    id: v.id("menuItems"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
