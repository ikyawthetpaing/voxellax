// import { products } from "@/db/schema"
import * as z from "zod";

export const productImagesSchema = z.array(z.object({ url: z.string() })).min(1).max(12);

export const productLicensesSchema = z.array(
  z.object({
    type: z.string(),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Must be a valid price",
    }).optional(),
  })
);

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.any(),
  category: z.string(),
  subcategory: z.string().optional(),
  licenses: productLicensesSchema,
  images: productImagesSchema,
});

// export const filterProductsSchema = z.object({
//   query: z.string(),
// })

// export const getProductSchema = z.object({
//   id: z.number(),
//   storeId: z.number(),
// })

// export const getProductsSchema = z.object({
//   limit: z.number().default(10),
//   offset: z.number().default(0),
//   categories: z
//     .string()
//     .regex(/^\d+.\d+$/)
//     .optional()
//     .nullable(),
//   subcategories: z
//     .string()
//     .regex(/^\d+.\d+$/)
//     .optional()
//     .nullable(),
//   sort: z
//     .string()
//     .regex(/^\w+.(asc|desc)$/)
//     .optional()
//     .nullable(),
//   price_range: z
//     .string()
//     .regex(/^\d+-\d+$/)
//     .optional()
//     .nullable(),
//   store_ids: z
//     .string()
//     .regex(/^\d+.\d+$/)
//     .optional()
//     .nullable(),
// })
