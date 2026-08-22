import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Prototype-only mock credentials. Replace with real auth (Lovable Cloud)
// before shipping anything sensitive.
const MOCK_LOGIN = "admin";
const MOCK_PASSWORD = "admin123";
const SESSION_KEY = "psz-admin-session";

type AdminAuthValue = {
  isAuthenticated: boolean;
  login: (user: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  const login = useCallback((user: string, password: string) => {
    const ok = user.trim() === MOCK_LOGIN && password === MOCK_PASSWORD;
    if (ok) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setAuthenticated(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
