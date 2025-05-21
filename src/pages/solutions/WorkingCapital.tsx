
import React from "react";
import { Wallet, Check, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const WorkingCapital = () => {
  const benefits = [
    "Fast 30-day rolling capital for operational expenses",
    "Draw down funds as needed and only pay for what you use",
    "No long-term debt commitments or complex covenants",
    "Transparent pricing with no hidden fees",
    "Quick approval and funding process"
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <div className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-solar-green-600 hover:text-solar-green-700">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-2/3">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-solar-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Wallet className="h-6 w-6 text-solar-green-600" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Working Capital</h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-8">
                  Flexible 30-day financing to fuel your solar business operations and growth.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/3 sticky top-24">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Benefits</h3>
                
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 bg-solar-green-100 p-1 rounded-full mt-0.5">
                        <Check className="h-4 w-4 text-solar-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-solar-green-600 hover:bg-solar-green-700 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Apply today and get a decision within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingCapital;
