import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    displayOrder: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_displayOrder", ["displayOrder"]),

  menuItems: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(), // Authoritative integer in whole INR (₹)
    categorySlug: v.string(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
    isFeatured: v.boolean(),
    displayOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_categorySlug", ["categorySlug"])
    .index("by_featured", ["isFeatured"])
    .index("by_displayOrder", ["displayOrder"]),

  locations: defineTable({
    name: v.string(),
    slug: v.string(),
    address: v.optional(v.string()), // Optional until real kiosk is commissioned
    city: v.string(),
    state: v.string(),
    postalCode: v.optional(v.string()),
    latitude: v.optional(v.number()), // Optional: No fake 0,0 coordinates
    longitude: v.optional(v.number()),
    phone: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("coming_soon"), v.literal("temporarily_closed")),
    imageUrl: v.optional(v.string()),
    // Scalable structured weekly hours (Option A)
    weeklySchedule: v.optional(
      v.array(
        v.object({
          dayOfWeek: v.number(), // 0 = Sunday, 1 = Monday ... 6 = Saturday
          openTime: v.string(),  // e.g. "09:00"
          closeTime: v.string(), // e.g. "21:00"
          isClosed: v.boolean(),
        })
      )
    ),
    specialNotice: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  favorites: defineTable({
    userId: v.id("users"),
    menuItemId: v.id("menuItems"),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_menuItemId", ["menuItemId"])
    .index("by_userId_menuItemId", ["userId", "menuItemId"]),

  feedback: defineTable({
    userId: v.id("users"),
    userName: v.string(),
    userEmail: v.string(),
    rating: v.number(), // 1 to 5
    message: v.string(),
    locationId: v.optional(v.id("locations")),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_createdAt", ["createdAt"]),

  rateLimits: defineTable({
    identifier: v.string(), // user ID or IP string
    action: v.string(),     // action identifier e.g. "feedback:submit"
    windowStart: v.number(),
    count: v.number(),
  }).index("by_identifier_action", ["identifier", "action"]),
});
