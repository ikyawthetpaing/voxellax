import { FileWithPreview } from "@/types";
import * as z from "zod";

export const storeSettingsSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(256).optional(),
  handle: z.string().min(2).max(50),
  location: z.object({ countryCode: z.string(), city: z.string() }),
  currency: z.object({ countryCode: z.string(), currency: z.string() }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatar: z.custom<FileWithPreview>().optional(),
  cover: z.custom<FileWithPreview>().optional(),
});

export type StoreSettingsSchema = z.infer<typeof storeSettingsSchema>;
