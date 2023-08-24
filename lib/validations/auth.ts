import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export type UserAuthSchema = z.infer<typeof userAuthSchema>;
