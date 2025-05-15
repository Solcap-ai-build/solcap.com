
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users database (in a real app, this would be in your backend)
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    emailVerified: true
  },
  {
    id: "2",
    email: "tech@example.com",
    name: "Tech User",
    role: "technician",
    emailVerified: true
  },
  {
    id: "3",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    emailVerified: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, auto-login regardless of password
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      if (!foundUser.emailVerified) {
        throw new Error("Please verify your email before logging in");
      }
      
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      toast.success(`Welcome back, ${foundUser.name}!`);
      
      // Redirect based on role
      if (foundUser.role === "admin") {
        navigate("/dashboard");
      } else if (foundUser.role === "technician") {
        navigate("/dashboard/inventory");
      } else {
        navigate("/dashboard/account");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, name: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        role,
        emailVerified: true // Setting to true to bypass email verification for demo
      };
      
      // In a real app, you would add this to your database
      mockUsers.push(newUser);
      
      // Set the user as logged in after registration
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Redirect directly to onboarding instead of verify-email
      toast.success("Registration successful! Please complete your business profile.");
      navigate("/onboarding");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast.info("You have been logged out");
  };
  
  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate the token and update the user's status in the database
      toast.success("Email verified successfully. You can now log in.");
      return true;
    } catch (error) {
      toast.error("Email verification failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Verification email resent. Please check your inbox.");
    } catch (error) {
      toast.error("Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };
  
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find(u => u.email === email);
      if (!existingUser) {
        // For security reasons, don't reveal if email exists or not
        toast.success("If your email exists in our system, you will receive reset instructions.");
      } else {
        toast.success("Password reset email sent. Please check your inbox.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login, 
        register, 
        logout,
        verifyEmail,
        resendVerificationEmail,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
