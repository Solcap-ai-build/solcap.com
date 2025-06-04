
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Logo from "@/components/Logo";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting...');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    console.log('Login attempt for:', values.email);
    setAuthError(null);
    
    try {
      await login(values.email, values.password);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = "Login failed. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please verify your email address before logging in.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuthError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo size="default" />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-solar-green-600 hover:text-solar-green-500">
              Register
            </Link>
          </p>
        </div>
        
        {authError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field} 
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-solar-green-600 hover:text-solar-green-500">
                Forgot your password?
              </Link>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-solar-green-600 hover:bg-solar-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            {/* Add test accounts info for development */}
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600 text-center">
                For testing: Create an account or contact admin for demo credentials
              </p>
            </div>
            
            <div className="text-xs text-center text-gray-500 mt-4">
              By signing in, you agree to our{" "}
              <Link to="#" className="text-solar-green-600 hover:text-solar-green-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-solar-green-600 hover:text-solar-green-500">
                Privacy Policy
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
