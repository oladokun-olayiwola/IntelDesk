import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/Auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}


// const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();
  
//   // Debug log:
//   console.log('ProtectedRoute check - isAuthenticated:', isAuthenticated);
  
//   return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
// };


const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;