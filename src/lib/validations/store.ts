import * as z from "zod";

export const storePostSchema = z.object({
  id: z.string().min(3).max(50),
  profileImage: z.object({ key: z.string() }).optional(),
  coverImage: z.object({ key: z.string() }).optional(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(256),
});

export const storePatchSchema = z.object({
  id: z.string().min(3).max(50).optional(),
  profileImage: z
    .object({
      added: z.object({ key: z.string() }).optional(),
      // deleted: z.object({ key: z.string() }).optional(),
    })
    .optional(),
  coverImage: z
    .object({
      added: z.object({ key: z.string() }).optional(),
      // deleted: z.object({ key: z.string() }).optional(),
    })
    .optional(),
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(3).max(256).optional(),
});
