import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireCurrentUser, requireAdmin } from "./lib/auth";
import { enforceRateLimit } from "./lib/rateLimit";

/**
 * Submits user feedback (rate-limited, authenticated).
 */
export const submit = mutation({
  args: {
    rating: v.number(),
    message: v.string(),
    locationId: v.optional(v.id("locations")),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx);
    await enforceRateLimit(ctx, user._id, "feedback:submit");

    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be an integer between 1 and 5.");
    }

    const trimmedMsg = args.message.trim();
    if (trimmedMsg.length < 5 || trimmedMsg.length > 500) {
      throw new Error("Feedback message must be between 5 and 500 characters.");
    }

    return await ctx.db.insert("feedback", {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      rating: Math.round(args.rating),
      message: trimmedMsg,
      locationId: args.locationId,
      createdAt: Date.now(),
    });
  },
});

/**
 * Admin-only query: Lists all feedback submissions ordered by creation time.
 */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    return await ctx.db
      .query("feedback")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
