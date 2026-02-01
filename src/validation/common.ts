import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "errors.validation.email.required")
  .email("errors.validation.email.invalid");

export const passwordSchema = z
  .string()
  .min(1, "errors.validation.password.required")
  .min(8, "errors.validation.password.min")
  .max(72, "errors.validation.password.max");
