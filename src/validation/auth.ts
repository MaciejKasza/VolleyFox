import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "errors.confirmPassword.required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.confirmPassword.mismatch",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "errors.password.required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
