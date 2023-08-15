import * as z from "zod";

const priceSchema = z.string().regex(/^\d+(\.\d{1,2})?$/, {
  message: "Must be a valid price",
});

export const productSchema = z.object({
  name: z.string().min(3).max(256),
  description: z.string().min(3).max(256),
  price: priceSchema,
  category: z.string(),
  subcategory: z.string().optional(),
  // pricing: z.object({
  //   leadMagnet: z.boolean(),
  //   singlePayment: priceSchema,
  //   payWhatYouWant: z.object({
  //     minimumPrice: priceSchema,
  //     suggestedPrice: priceSchema,
  //   }),
  // }),
});

export type ProductSchema = z.infer<typeof productSchema>;
