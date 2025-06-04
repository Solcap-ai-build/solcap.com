
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AuthNavigationHandler: React.FC = () => {
  const { user, session, hasCompletedOnboarding, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't navigate while loading
    if (isLoading) return;

    console.log('Navigation check:', {
      hasSession: !!session,
      hasUser: !!user,
      userRole: user?.role,
      hasCompletedOnboarding,
      currentPath: location.pathname
    });

    // If user is authenticated
    if (session?.user && user) {
      console.log('User authenticated, checking navigation...');
      
      // Admin/super-admin users go to admin dashboard
      if (user.role === "admin" || user.role === "super-admin") {
        if (!location.pathname.startsWith('/admin')) {
          console.log('Redirecting admin to admin dashboard');
          navigate("/admin/dashboard", { replace: true });
        }
        return;
      }
      
      // For regular users and technicians
      if (user.role === "user" || user.role === "technician") {
        // If on auth pages, redirect based on onboarding status
        if (location.pathname === '/login' || location.pathname === '/register') {
          if (hasCompletedOnboarding) {
            console.log('User completed onboarding, redirecting to dashboard');
            navigate("/dashboard", { replace: true });
          } else {
            console.log('User needs onboarding, redirecting to onboarding');
            navigate("/onboarding", { replace: true });
          }
          return;
        }
        
        // If trying to access dashboard without completing onboarding
        if (location.pathname.startsWith('/dashboard') && !hasCompletedOnboarding) {
          console.log('User accessing dashboard without onboarding, redirecting to onboarding');
          navigate("/onboarding", { replace: true });
          return;
        }
        
        // If trying to access onboarding after completing it (except setup-complete)
        if (location.pathname === '/onboarding' && hasCompletedOnboarding) {
          console.log('User already completed onboarding, redirecting to dashboard');
          navigate("/dashboard", { replace: true });
          return;
        }
        
        // Allow access to setup-complete page
        if (location.pathname === '/setup-complete') {
          return;
        }
        
        // If on root path, redirect appropriately
        if (location.pathname === '/') {
          if (hasCompletedOnboarding) {
            console.log('User on root with completed onboarding, redirecting to dashboard');
            navigate("/dashboard", { replace: true });
          } else {
            console.log('User on root without onboarding, redirecting to onboarding');
            navigate("/onboarding", { replace: true });
          }
          return;
        }
      }
    } else {
      // No authenticated user - redirect to login if trying to access protected routes
      const protectedRoutes = ['/dashboard', '/onboarding', '/admin', '/setup-complete'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));
      
      if (isProtectedRoute) {
        console.log('Unauthenticated user trying to access protected route, redirecting to login');
        // navigate("/login", { replace: true });
      }
    }
  }, [session, user, hasCompletedOnboarding, isLoading, navigate, location.pathname]);

  return null; // This component doesn't render anything
};

export default AuthNavigationHandler;
