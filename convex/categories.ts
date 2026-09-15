import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Lists all categories ordered by displayOrder.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_displayOrder")
      .collect();
  },
});

/**
 * Gets a category by slug.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});
