import { ProductImageUploadedFile, UploadedFile } from "@/types";
import * as z from "zod";

const priceSchema = z.string().regex(/^\d+(\.\d{1,2})?$/, {
  message: "Must be a valid price",
});

export const productSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().max(255).optional(),
  price: priceSchema,
  category: z.string(),
  subcategory: z.string().optional(),
});

const addProductSchema = z.object({
  ...productSchema.shape,
  images: z.custom<ProductImageUploadedFile[]>().default([]),
  files: z.custom<UploadedFile[]>().default([]),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type AddProductSchema = z.infer<typeof addProductSchema>;
export type UpdateProductSchema = AddProductSchema;

export const getProductsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  subcategories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  price_range: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .nullable(),
  store_ids: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
});
export type GetProductsSchema = z.infer<typeof getProductsSchema>;
