
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
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

const AdminLogin = () => {
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Redirect if already logged in as admin
  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  // Redirect regular users to user dashboard
  if (isAuthenticated && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setAuthError(null);
    try {
      await login(values.email, values.password);
      // Auth context will handle redirecting to the right place based on role
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed");
      console.error("Login submission error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo size="default" />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
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
                      placeholder="admin@example.com" 
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
            
            <Button
              type="submit"
              className="w-full bg-solar-green-600 hover:bg-solar-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Admin Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
