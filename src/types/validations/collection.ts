import {
  collectionPatchSchema,
  collectionPostSchema,
} from "@/lib/validations/collection";
import * as z from "zod";

export type CollectionPatchSchema = z.infer<typeof collectionPatchSchema>;
export type CollectionPostSchema = z.infer<typeof collectionPostSchema>;
