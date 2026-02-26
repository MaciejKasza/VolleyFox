import { z } from "zod";
import { requiredText } from "./common";

export const createClubSchema = z.object({
  name: requiredText("errors.validation.club.name.required").min(
    2,
    "errors.validation.club.name.min",
  ),
  city: requiredText("errors.validation.club.city.required").min(
    2,
    "errors.validation.club.city.min",
  ),
  description: z
    .string()
    .trim()
    .max(500, "errors.validation.club.description.max")
    .optional()
    .or(z.literal("")),
  logoUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || isValidUrl(v),
      "errors.validation.club.logoUrl.invalid",
    ),
});

export type CreateClubFormValues = z.infer<typeof createClubSchema>;

function isValidUrl(v: string) {
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}
