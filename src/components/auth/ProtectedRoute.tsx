
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to login');
        navigate('/login');
        return;
      }

      if (requiredRole && user && !requiredRole.includes(user.role)) {
        console.log('User does not have required role, redirecting to dashboard');
        navigate('/dashboard');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
