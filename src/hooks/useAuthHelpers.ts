
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/auth";

export const getUserRole = async (userId: string): Promise<UserRole> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user role:', error);
      return 'user';
    }
    
    return data?.role as UserRole || 'user';
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return 'user';
  }
};

export const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('sb-access-token');
  localStorage.removeItem('sb-refresh-token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('sb-hfteylygjgemdxcvvssg-auth-token')) {
      console.log('Removing localStorage key:', key);
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('sb-hfteylygjgemdxcvvssg-auth-token')) {
      console.log('Removing sessionStorage key:', key);
      sessionStorage.removeItem(key);
    }
  });
  
  console.log('Auth state cleanup completed');
};
