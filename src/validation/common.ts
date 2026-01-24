import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "errors.email.required")
  .email("errors.email.invalid");

export const passwordSchema = z
  .string()
  .min(1, "errors.password.required")
  .min(8, "errors.password.min")
  .max(72, "errors.password.max");
