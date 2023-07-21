import * as z from "zod";
import { productLicenseSchema } from "@/lib/validations/product";

type License = z.infer<typeof productLicenseSchema>;

export const licenses: License[] = [
  { type: "Personal" },
  { type: "Commercial" },
  { type: "Extended Commercial" },
];
