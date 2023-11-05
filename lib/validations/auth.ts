import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must contain at least 8 characters" })
  .refine(
    (password) => {
      const containsUppercase = /[A-Z]/.test(password);
      const containsLowercase = /[a-z]/.test(password);
      const containsDigit = /\d/.test(password);
      const containsSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
        password
      );

      return (
        containsUppercase &&
        containsLowercase &&
        containsDigit &&
        containsSpecialCharacter
      );
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }
  );

const nameSchema = z
  .string()
  .min(1, { message: "Name must be at least 1 character" })
  .max(20, { message: "Name must be 20 characters or less" });

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const userSignUpSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  ...userSignInSchema.shape,
});

export type UserSignInSchema = z.infer<typeof userSignInSchema>;
export type UserSignUpSchema = z.infer<typeof userSignUpSchema>;
