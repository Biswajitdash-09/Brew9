import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required").optional().or(z.literal("")),
});

export const serverEnv = serverEnvSchema.parse({
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
});
