
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Leaf, CheckCircle, XCircle, Loader2 } from "lucide-react";

const VerifyConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { verifyEmail } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      setIsVerifying(true);
      try {
        if (!token) {
          throw new Error("No verification token provided");
        }
        const result = await verifyEmail(token);
        setIsSuccess(true); 
      } catch (error) {
        setIsSuccess(false);
        setErrorMessage(error instanceof Error ? error.message : "Verification failed");
      } finally {
        setIsVerifying(false);
      }
    };

    verify();
  }, [token]);

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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
          
          <div className="mt-8">
            {isVerifying ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-16 w-16 text-solar-green-600 animate-spin" />
                <p className="mt-4 text-lg text-gray-600">Verifying your email...</p>
              </div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <p className="mt-4 text-lg text-green-600">Your email has been successfully verified!</p>
                <p className="mt-2 text-sm text-gray-600">Your account is now active. You can now sign in to access your dashboard.</p>
                <div className="mt-6">
                  <Button asChild className="bg-solar-green-600 hover:bg-solar-green-700">
                    <Link to="/login">Sign in to your account</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="h-16 w-16 text-red-500" />
                <p className="mt-4 text-lg text-red-600">
                  {errorMessage}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Please try again or request a new verification email.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild variant="outline">
                    <Link to="/verify-email">Request new verification</Link>
                  </Button>
                  <Button asChild className="bg-solar-green-600 hover:bg-solar-green-700">
                    <Link to="/login">Return to login</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyConfirm;
