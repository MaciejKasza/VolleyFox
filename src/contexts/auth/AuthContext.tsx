import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authService, type User } from "../../services/authService";
import { authToken } from "../../services/authToken";
import { ApiError } from "../../services/http";

type AuthState = {
  isInitialized: boolean; // czy zakończyliśmy init (sprawdzenie /me)
  isAuthenticated: boolean; // czy user jest zalogowany (po udanym /me)
  user: User | null;

  login: (email: string, password: string) => Promise<void>;
  registerAndLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = Boolean(user);

  // INIT: jeśli mamy token, próbujemy /me
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const token = authToken.get();
      if (!token) {
        if (!cancelled) setInitialized(true);
        return;
      }

      try {
        const me = await authService.me();

        if (!cancelled) setUser(me);
      } catch (e) {
        // token nieważny / wygasł → wyloguj
        // if (e instanceof ApiError && e.code === "UNAUTHORIZED") {
        authService.logout();
        // }
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setInitialized(true);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email: string, password: string) {
    await authService.login({ email, password });
    const me = await authService.me();
    setUser(me);
  }

  async function registerAndLogin(email: string, password: string) {
    // 1) rejestracja
    await authService.register({ email, password });

    // 2) jeśli register nie ustawił tokena (backend nie zwraca tokena),
    //    to logujemy się normalnie
    if (!authToken.get()) {
      await authService.login({ email, password });
    }

    // 3) prawdziwe logowanie → /me
    const me = await authService.me();
    setUser(me);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value = useMemo<AuthState>(
    () => ({
      isInitialized,
      isAuthenticated,
      user,
      login,
      registerAndLogin,
      logout,
    }),
    [isInitialized, isAuthenticated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
