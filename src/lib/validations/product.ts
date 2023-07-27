import * as z from "zod";
import {
  PRODUCT_DIGITAL_FILE_MAX_COUNT,
  PRODUCT_IMAGE_FILE_MAX_COUNT,
  PRODUCT_IMAGE_FILE_MIN_COUNT,
  PRODUCT_DIGITAL_FILE_MIN_COUNT,
} from "@/constants/product";

export const productFileSchema = z.object({
  key: z.string(),
});

export const productImagePostSchema = z.object({
  key: z.string(),
  index: z.number(),
  isThumbnail: z.boolean(),
});

export const productLicenseSchema = z.object({
  type: z.string(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Must be a valid price",
    })
    .optional(),
});

export const productFormSchema = z.object({
  name: z.string().min(3).max(191),
  description: z.string().min(3).max(256),
  category: z.string().min(3).max(191),
  subcategory: z.string().min(3).max(191).optional(),
  licenses: z.array(productLicenseSchema),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
});

export const productPostSchema = z.object({
  name: z.string().min(3).max(191),
  description: z.string().min(3).max(256),
  category: z.string().min(3).max(191),
  subcategory: z.string().min(3).max(191).optional(),
  licenses: z.array(productLicenseSchema),
  images: z
    .array(productImagePostSchema)
    .min(PRODUCT_IMAGE_FILE_MIN_COUNT)
    .max(PRODUCT_IMAGE_FILE_MAX_COUNT),
  files: z
    .array(productFileSchema)
    .min(PRODUCT_DIGITAL_FILE_MIN_COUNT)
    .max(PRODUCT_DIGITAL_FILE_MAX_COUNT)
    .optional(),
});

export const productImagesPatchSchema = z.object({
  deleted: z.array(z.object({ key: z.string() })),
  added: z.array(
    z.object({
      key: z.string(),
      index: z.number(),
      isThumbnail: z.boolean(),
    })
  ),
  updated: z.array(
    z.object({ index: z.number(), key: z.string(), isThumbnail: z.boolean() })
  ),
});

export const productPatchSchema = z.object({
  name: z.string().min(3).max(191).optional(),
  description: z.string().min(3).max(256).optional(),
  category: z.string().min(3).max(191).optional(),
  subcategory: z.string().min(3).max(191).optional(),
  licenses: z.array(productLicenseSchema).optional(),
  images: productImagesPatchSchema,
  files: z
    .array(productFileSchema)
    .min(PRODUCT_DIGITAL_FILE_MIN_COUNT)
    .max(PRODUCT_DIGITAL_FILE_MAX_COUNT)
    .optional(),
});
