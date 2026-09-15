import { MutationCtx } from "../_generated/server";

interface RateLimitRule {
  windowMs: number;
  maxRequests: number;
}

const RULES: Record<string, RateLimitRule> = {
  "feedback:submit": { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 submissions per hour
  "favorites:toggle": { windowMs: 60 * 1000, maxRequests: 30 },     // 30 per minute
  "profile:update": { windowMs: 5 * 60 * 1000, maxRequests: 10 },   // 10 per 5 minutes
};

/**
 * Transaction-safe sliding window rate limit enforcement inside a Convex mutation.
 * Emits generic, non-leaking user-facing error messages while maintaining atomic counts.
 */
export async function enforceRateLimit(
  ctx: MutationCtx,
  identifier: string,
  action: string
): Promise<void> {
  const rule = RULES[action];
  if (!rule) return;

  const now = Date.now();
  const windowBoundary = now - rule.windowMs;

  const record: any = await ctx.db
    .query("rateLimits")
    .withIndex("by_identifier_action", (q: any) =>
      q.eq("identifier", identifier).eq("action", action)
    )
    .unique();

  if (!record || Number(record.windowStart) < windowBoundary) {
    if (record) {
      await ctx.db.patch(record._id, { windowStart: now, count: 1 });
    } else {
      await ctx.db.insert("rateLimits", {
        identifier,
        action,
        windowStart: now,
        count: 1,
      });
    }
    return;
  }

  if (Number(record.count) >= rule.maxRequests) {
    throw new Error("Too many requests. Please try again in a few minutes.");
  }

  await ctx.db.patch(record._id, { count: Number(record.count) + 1 });
}
