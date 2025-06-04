
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SetupComplete = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-24 w-24 text-solar-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Setup Complete!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for setting up your account with SolCap. You're now ready to access our full suite of financial solutions for renewable energy businesses.
        </p>
        
        <Button 
          asChild 
          size="lg" 
          className="bg-solar-green-600 hover:bg-solar-green-700 text-white flex items-center gap-2 mx-auto"
        >
          <Link to="/dashboard">
            Go to Dashboard <span className="ml-1">→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SetupComplete;
