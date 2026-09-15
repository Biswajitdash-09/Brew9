import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Public query: Lists all active and upcoming coffee kiosk locations.
 */
export const getActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("locations")
      .collect();
  },
});

/**
 * Public query: Gets a specific location by slug.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("locations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});
