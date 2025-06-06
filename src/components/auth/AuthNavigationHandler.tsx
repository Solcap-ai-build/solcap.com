
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";

const AuthNavigationHandler: React.FC = () => {
  const { user, session, hasCompletedOnboarding, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Don't navigate while loading
  //   if (isLoading) return;

  //   console.log('Navigation check:', {
  //     hasSession: !!session,
  //     hasUser: !!user,
  //     userRole: user?.role,
  //     hasCompletedOnboarding,
  //     currentPath: location.pathname
  //   });

  //   // If user is authenticated
  //   if (session?.user && user) {
  //     console.log('User authenticated, checking navigation...');
      
      
  //     // For regular users and technicians
  //     if (user.role === "user" || user.role === "technician") {     
                
  //       // If trying to access dashboard without completing onboarding
  //       if (location.pathname.startsWith('/dashboard') && !hasCompletedOnboarding) {
  //         console.log('User accessing dashboard without onboarding, redirecting to onboarding');
  //         navigate("/onboarding", { replace: true });
  //         return;
  //       }
        
  //       // If trying to access onboarding after completing it (except setup-complete)
  //       if (location.pathname === '/onboarding' && hasCompletedOnboarding) {
  //         console.log('User already completed onboarding, redirecting to dashboard');
  //         navigate("/dashboard", { replace: true });
  //         return;
  //       }

  //     }
  //   } else {
  //     // No authenticated user - redirect to login if trying to access protected routes
  //     const protectedRoutes = ['/dashboard', '/onboarding', '/admin', '/setup-complete'];
  //     const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));
      
  //     if (isProtectedRoute) {
  //       console.log('Unauthenticated user trying to access protected route, redirecting to login');
  //       // navigate("/login", { replace: true });
  //     }
  //   }
  // }, [session, user, hasCompletedOnboarding, isLoading, navigate, location.pathname]);

  return null; // This component doesn't render anything
};

export default AuthNavigationHandler;
