import * as z from "zod";
import { productLicensesSchema } from "@/lib/validations/product";

type Licenses = z.infer<typeof productLicensesSchema>;

export const licenses: Licenses = [
  { type: "Personal" },
  { type: "Commercial" },
  { type: "Extended Commercial" },
];
