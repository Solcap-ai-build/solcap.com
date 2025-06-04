
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
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
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      // In a real app, this would call an API to send a reset link
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-solar-green-600 rounded-md flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-solar-green-700">SolCap</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            We'll send you instructions to reset your password
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="mt-8 text-center">
            <p className="text-green-600 mb-4">
              Check your email for password reset instructions
            </p>
            <Button 
              asChild
              className="bg-solar-green-600 hover:bg-solar-green-700"
            >
              <Link to="/login">Return to login</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                {isLoading ? "Sending..." : "Send reset instructions"}
              </Button>
              
              <div className="text-center">
                <Link to="/login" className="text-sm text-solar-green-600 hover:text-solar-green-500">
                  Return to login
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
