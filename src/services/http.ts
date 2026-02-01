import { authToken } from "./authToken";

const API_URL = import.meta.env.VITE_API_URL as string;

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "CONFLICT"
  | "SERVER"
  | "NETWORK"
  | "UNKNOWN";

export type BackendError = {
  errorCode?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export class ApiError extends Error {
  status?: number;
  code: string; // tu trzymamy errorCode z backendu lub fallback
  details?: unknown; // cały payload

  constructor(
    message: string,
    code: string,
    status?: number,
    details?: unknown,
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean; // default true
  signal?: AbortSignal;
};

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function mapStatusToCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 422) return "VALIDATION";
  if (status >= 500) return "SERVER";
  return "UNKNOWN";
}

export async function http<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...opts.headers,
  };

  if (opts.auth !== false) {
    const token = authToken.get();
    console.log(token);

    if (token) headers.Authorization = `Bearer ${token}`;
    console.log(headers.Authorization);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    });
  } catch (e) {
    console.log("HTTP Error:", e);

    throw new ApiError("Network error", "NETWORK");
  }

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const backend =
      data && typeof data === "object" ? (data as BackendError) : null;

    const code = backend?.errorCode ?? `HTTP_${res.status}`;

    const message = backend?.message ?? `Request failed (${res.status})`;
    console.log(message, code, res.status, data);

    throw new ApiError(message, code, res.status, data);
  }

  return data as T;
}
