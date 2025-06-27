import { createContext, useState, ReactNode, useContext, useMemo, useEffect } from "react";
import { AuthContextType, UserRole } from "@/types/Auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>("citizen");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("role") as UserRole | null;

    if (token) {
      setIsAuthenticated(true);
      if (storedRole) {
        setRole(storedRole);
      }
    }

    setLoading(false);
  }, []);

  const login = (token: string, userRole: UserRole) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("citizen");
  };

  const value = useMemo(
    () => ({
      role,
      isAuthenticated,
      isLogin,
      setRole,
      setIsAuthenticated,
      setIsLogin,
      login,
      logout,
    }),
    [role, isAuthenticated, isLogin]
  );

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
