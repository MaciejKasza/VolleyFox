import React, { createContext, useContext, useMemo, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const TOKEN_KEY = "vf_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  });

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated,
      login: () => {
        localStorage.setItem(TOKEN_KEY, "demo-token");
        setIsAuthenticated(true);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
