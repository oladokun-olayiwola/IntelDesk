// src/types/auth.ts
export type UserRole = 'citizen' | 'officer' | 'supervisor';
export type AuthContextType = {
  role: UserRole;
  isAuthenticated: boolean;
  isLogin: boolean;
  setRole: (role: UserRole) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
};