import { ApiError } from "./http";

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

export function getBackendFieldErrors(
  e: unknown,
): Record<string, string> | null {
  if (!isApiError(e)) return null;
  const d: any = e.details;

  // spodziewamy się fieldErrors: { email: "...", ... }
  if (
    d &&
    typeof d === "object" &&
    d.fieldErrors &&
    typeof d.fieldErrors === "object"
  ) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(d.fieldErrors)) {
      if (typeof v === "string") out[k] = v;
    }
    return Object.keys(out).length ? out : null;
  }
  return null;
}

/**
 * Zwraca klucz do tłumaczenia (jeśli masz mapę) albo fallback message z backendu.
 */
export function getApiErrorTextKeyOrMessage(e: unknown): string {
  if (!isApiError(e)) return "errors.common.unknown";

  // domyślnie: mapujemy po errorCode
  return `errors.api.${e.code}`;
}
