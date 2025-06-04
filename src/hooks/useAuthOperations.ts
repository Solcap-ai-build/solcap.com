
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "./useAuthHelpers";

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log('Starting login process for:', email);
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Attempt global sign out to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Previous session cleared');
      } catch (err) {
        console.log('No previous session to clear:', err);
      }

      // Wait a moment for cleanup to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login response:', { data, error });

      if (error) throw error;

      if (data.user && data.session) {
        console.log('Login successful for user:', data.user.email);
        toast.success(`Welcome back!`);
        // Navigation will be handled by the AuthNavigationHandler component
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log('Starting registration for:', email);
      
      // Clean up existing state
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name
          }
        }
      });

      console.log('Registration response:', { data, error });

      if (error) throw error;

      if (data.user) {
        if (data.user.email_confirmed_at) {
          toast.success("Registration successful! You are now logged in.");
          // Navigation will be handled by AuthNavigationHandler
        } else {
          toast.success("Registration successful! Please check your email for verification.");
          window.location.href='/verify-email'
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Starting logout process');
      
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.info("You have been logged out");
      
      // Navigate to home page using window.location for a clean reload
      window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });
      
      if (error) throw error;
      
      toast.success("Email verified successfully!");
      return true;
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("Email verification failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) throw error;
      
      toast.success("Verification email resent. Please check your inbox.");
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/auth/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send password reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    verifyEmail,
    resendVerificationEmail,
    requestPasswordReset,
    isLoading
  };
};
