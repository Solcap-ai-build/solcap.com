
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import { useUserCreation } from "@/hooks/useUserCreation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  checkOnboardingStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  const authOperations = useAuthOperations();
  const { createUserObject } = useUserCreation();

  const checkOnboardingStatus = async () => {
    if (!session?.user) return;
    
    try {
      const { data, error } = await supabase
        .from('business_onboarding')
        .select('status')
        .eq('user_id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error checking onboarding status:', error);
        return;
      }
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error in checkOnboardingStatus:', error);
      setHasCompletedOnboarding(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          const userObj = await createUserObject(session.user);
          setUser(userObj);
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing state');
          setUser(null);
          setSession(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   console.log('Initial session check:', session?.user?.id);
    //   setSession(session);
    //   if (session?.user) {
    //     createUserObject(session.user).then(async userObj => {
    //       console.log('Initial user object:', userObj);
    //       setUser(userObj);
          
    //       // Check onboarding status
    //       try {
    //         const { data, error } = await supabase
    //           .from('business_onboarding')
    //           .select('status')
    //           .eq('user_id', session.user.id)
    //           .single();

    //         if (error) {
    //           console.error('Error checking onboarding status:', error);
    //           setHasCompletedOnboarding(false);
    //         }
            
    //         setHasCompletedOnboarding(true);
    //       } catch (error) {
    //         console.error('Error checking onboarding:', error);
    //         setHasCompletedOnboarding(false);
    //       }
          
    //       setIsLoading(false);
    //     }).catch(error => {
    //       console.error('Error creating initial user object:', error);
    //       setIsLoading(false);
    //     });
    //   } else {
    //     setIsLoading(false);
    //   }
    // });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session,
        isLoading: isLoading || authOperations.isLoading, 
        isAuthenticated: !!session?.user,
        hasCompletedOnboarding,
        checkOnboardingStatus,
        ...authOperations
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
