export type UserRole = 'citizen' | 'officer' | 'supervisor';
export type AuthContextType = {
  role: UserRole;
  isAuthenticated: boolean;
  isLogin: boolean;
  login: (token: string, userRole: UserRole) => void;
  setRole: (role: UserRole) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
};