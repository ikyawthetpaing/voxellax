import { CollectionPrivacy } from "@prisma/client";
import * as z from "zod";

export const collectionPostSchema = z.object({
  name: z.string().min(3).max(50),
  privacy: z.nativeEnum(CollectionPrivacy),
});

export const collectionPatchSchema = z.object({
  // collectionId: z.string(),
  productId: z.string(),
});
