import { http } from "./http";
import { authToken } from "./authToken";

export type User = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

// Dostosuj jeśli backend zwraca np. { accessToken: "..." }
type LoginResponse = {
  jwtToken: string;
};

// Dostosuj jeśli backend zwraca np. { accessToken: "..." }
type RegisterResponse = {
  jwtToken: string;
};

export const authService = {
  async login(payload: LoginRequest): Promise<void> {
    const res = await http<LoginResponse>("/app/auth/login", {
      method: "POST",
      body: payload,
      auth: false,
    });

    authToken.set(res.jwtToken);
  },

  async register(payload: RegisterRequest): Promise<void> {
    const res = await http<RegisterResponse>("/app/auth/register", {
      method: "POST",
      body: payload,
      auth: false,
    });

    // jeśli backend zwróci token już na register — obsłuż to od razu:
    if (
      res &&
      typeof res === "object" &&
      "token" in res &&
      typeof (res as any).token === "string"
    ) {
      authToken.set((res as any).token);
    }
  },

  async me(): Promise<User> {
    return http<User>("/app/users/me", { method: "GET" });
  },

  logout(): void {
    authToken.clear();
  },
};
