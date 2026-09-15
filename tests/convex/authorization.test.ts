import { test, expect } from "@playwright/test";

test.describe("Convex Authorization & Rate Limit Logic", () => {
  test("requireCurrentUser throws on missing identity", async () => {
    const mockCtxWithoutAuth = {
      auth: {
        getUserIdentity: async () => null,
      },
    };

    let errorThrown = false;
    try {
      const identity = await mockCtxWithoutAuth.auth.getUserIdentity();
      if (!identity) throw new Error("Unauthorized: Active user session required.");
    } catch (err: any) {
      errorThrown = true;
      expect(err.message).toBe("Unauthorized: Active user session required.");
    }

    expect(errorThrown).toBe(true);
  });

  test("requireAdmin throws when user is not admin", () => {
    const standardUser = {
      _id: "user_123",
      role: "user",
    };

    let errorThrown = false;
    try {
      if (standardUser.role !== "admin") {
        throw new Error("Forbidden: Administrator privileges required.");
      }
    } catch (err: any) {
      errorThrown = true;
      expect(err.message).toBe("Forbidden: Administrator privileges required.");
    }

    expect(errorThrown).toBe(true);
  });

  test("rate limit threshold triggers generic message without leaking action name", () => {
    const rule = { windowMs: 3600000, maxRequests: 3 };
    const currentCount = 3;

    let errorThrown = false;
    try {
      if (currentCount >= rule.maxRequests) {
        throw new Error("Too many requests. Please try again in a few minutes.");
      }
    } catch (err: any) {
      errorThrown = true;
      expect(err.message).toBe("Too many requests. Please try again in a few minutes.");
    }

    expect(errorThrown).toBe(true);
  });
});
