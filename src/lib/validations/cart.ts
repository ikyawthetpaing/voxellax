import * as z from "zod";

export const cartPatchSchema = z.object({
  purchaseLicenseId: z.string(),
});
