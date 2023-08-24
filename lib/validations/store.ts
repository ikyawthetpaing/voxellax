import { FileWithPreview, UploadedFile } from "@/types";
import * as z from "zod";

export const storeSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
  id: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^\w+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatar: z.custom<FileWithPreview>().optional(),
  cover: z.custom<FileWithPreview>().optional(),
});

const fileSchema = z.custom<UploadedFile>();

export const addStoreSchema = z.object({
  ...storeSchema.shape,
  avatar: fileSchema.optional(),
  cover: fileSchema.optional(),
});

export const updateStoreSchema = z.object({
  ...storeSchema.shape,
  avatar: fileSchema.optional(),
  cover: fileSchema.optional(),
});

export type StoreSchema = z.infer<typeof storeSchema>;
export type AddStoreSchema = z.infer<typeof addStoreSchema>;
export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>;
