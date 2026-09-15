import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: z
    .string()
    .url("NEXT_PUBLIC_CONVEX_URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "Clerk Publishable Key is required")
    .optional()
    .or(z.literal("")),
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid absolute URL"),
});

const rawAppUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error(
    "FATAL: NEXT_PUBLIC_APP_URL environment variable is required in production for SEO and canonical routes."
  );
}

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || "",
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  NEXT_PUBLIC_APP_URL: rawAppUrl || "http://localhost:3000",
});
