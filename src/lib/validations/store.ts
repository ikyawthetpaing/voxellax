import * as z from "zod";

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(255),
});

export const storePatchSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(3).max(255).optional(),
});
