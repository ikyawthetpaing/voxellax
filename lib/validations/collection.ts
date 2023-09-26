import * as z from "zod";

import { collections } from "@/db/schema";

export const collectionPostSchema = z.object({
  name: z.string().min(3).max(50),
  privacy: z.enum(collections.privacy.enumValues),
});

export const collectionUpdateSchema = z.object({
  productId: z.string(),
});

export type CollectionSchema = z.infer<typeof collectionPostSchema>;
export type CollectionUpdateSchema = z.infer<typeof collectionUpdateSchema>;
