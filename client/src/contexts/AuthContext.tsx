import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import { AuthContextType, UserRole } from "@/types/Auth";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('citizen');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const value = useMemo(() => ({
    role,
    isAuthenticated,
    isLogin,
    setRole,
    setIsAuthenticated,
    setIsLogin,
  }), [role, isAuthenticated, isLogin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};