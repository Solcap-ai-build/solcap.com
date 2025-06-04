
import { User } from "@/types/auth";
import { getUserRole } from "./useAuthHelpers";

export const useUserCreation = () => {
  const createUserObject = async (supabaseUser: any): Promise<User> => {
    const role = await getUserRole(supabaseUser.id);
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      role,
      emailVerified: !!supabaseUser.email_confirmed_at
    };
  };

  return { createUserObject };
};
