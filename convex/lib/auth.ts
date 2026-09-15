import { QueryCtx, MutationCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

/**
 * Resolves current Convex user Doc from Clerk authentication context.
 */
export async function getCurrentUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
    .unique();

  return (user as Doc<"users">) || null;
}

/**
 * Throws an unauthorized error if no authenticated Convex user exists.
 */
export async function requireCurrentUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx);
  if (!user) {
    throw new Error("Unauthorized: Active user session required.");
  }
  return user;
}

/**
 * Throws a forbidden error if current user is not an administrator.
 */
export async function requireAdmin(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users">> {
  const user = await requireCurrentUser(ctx);
  if (user.role !== "admin") {
    throw new Error("Forbidden: Administrator privileges required.");
  }
  return user;
}
