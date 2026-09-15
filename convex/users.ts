import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, requireCurrentUser } from "./lib/auth";
import { enforceRateLimit } from "./lib/rateLimit";

/**
 * Explicit mutation called once per session by AuthSyncProvider upon Clerk authentication.
 */
export const ensureCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const existing: any = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
      .unique();

    const now = Date.now();
    const name = identity.name || identity.nickname || "Coffee Lover";
    const email = identity.email || "";
    const imageUrl = identity.pictureUrl;

    if (existing) {
      // Update profile attributes if changed
      await ctx.db.patch(existing._id as any, {
        name,
        email,
        imageUrl: imageUrl || undefined,
        updatedAt: now,
      });
      return existing._id;
    }

    // Insert new user with default 'user' role
    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      email,
      name,
      imageUrl: imageUrl || undefined,
      role: "user",
      createdAt: now,
      updatedAt: now,
    } as any);
  },
});

/**
 * Returns current authenticated user profile.
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

/**
 * Updates current authenticated user profile.
 */
export const updateProfile = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx);
    await enforceRateLimit(ctx, user._id, "profile:update");

    const trimmed = args.name.trim();
    if (trimmed.length < 2 || trimmed.length > 50) {
      throw new Error("Name must be between 2 and 50 characters.");
    }

    await ctx.db.patch(user._id as any, {
      name: trimmed,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
