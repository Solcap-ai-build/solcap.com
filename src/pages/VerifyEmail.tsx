
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Leaf, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { resendVerificationEmail, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(false);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      await resendVerificationEmail(email);
      setResent(true);
      setTimeout(() => setResent(false), 60000); // Enable resend after 1 minute
    } catch (error) {
      // Error handling is already in the context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <div>
          <Link to="/" className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-solar-green-600 rounded-md flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-solar-green-700">SolCap</span>
          </Link>
          <div className="mt-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-solar-green-100 flex items-center justify-center">
              <Mail className="h-8 w-8 text-solar-green-600" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification email to your inbox. Please check your email and click the verification link.
          </p>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-4">
            Didn't receive the email? Enter your email address to resend the verification email.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-green-500"
            />
            <Button 
              onClick={handleResendVerification} 
              disabled={!email || isLoading || resent}
              className="bg-solar-green-600 hover:bg-solar-green-700"
            >
              {isLoading ? "Sending..." : resent ? "Sent" : "Resend"}
            </Button>
          </div>
          {resent && (
            <p className="text-xs text-solar-green-600 mt-2">
              Verification email sent. You can request another one in 60 seconds.
            </p>
          )}
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm">
            Already verified?{" "}
            <Link to="/login" className="font-medium text-solar-green-600 hover:text-solar-green-500 inline-flex items-center">
              Sign in <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
