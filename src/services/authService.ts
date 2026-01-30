import { http } from "./http";
import { authToken } from "./authToken";

export type User = {
  id: string;
  email: string;
  name?: string;
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
  token: string;
};

// Dostosuj jeśli backend zwraca np. { accessToken: "..." }
type RegisterResponse = {
  token: string;
};

export const authService = {
  async login(payload: LoginRequest): Promise<void> {
    console.log("req");

    const res = await http<LoginResponse>("/app/auth/login", {
      method: "POST",
      body: payload,
      auth: false,
    });
    console.log(res);

    authToken.set(res.token);
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
    console.log("logout");

    authToken.clear();
  },
};
