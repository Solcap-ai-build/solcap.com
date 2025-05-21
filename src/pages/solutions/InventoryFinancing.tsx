
import React, { useState } from "react";
import { Package, Check, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const InventoryFinancing = () => {
  const [term, setTerm] = useState<string>("30");
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const benefits = [
    "Finance inventory for up to 90 days",
    "Purchase solar panels and equipment without tying up capital",
    "Maintain optimal inventory levels to meet customer demand",
    "Competitive rates with transparent pricing",
    "Scale operations to handle larger projects"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Financing request submitted",
        description: `Your request for ₦${parseInt(amount).toLocaleString()} with ${term}-day term has been received.`,
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-2/3">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-solar-yellow-100 rounded-xl flex items-center justify-center mr-4">
                    <Package className="h-6 w-6 text-solar-yellow-600" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Inventory Financing</h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-8">
                  90-day financing to help you stock the solar equipment you need without depleting your cash reserves.
                </p>
              </div>
              
              {/* Financing Request Form - Desktop and Mobile */}
              <Card className="p-6 mb-8 lg:mb-0">
                <h2 className="text-xl font-bold mb-6">Request Inventory Financing</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="amount">Financing Amount (₦)</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder="Enter amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="term">Financing Term</Label>
                      <Select 
                        value={term} 
                        onValueChange={setTerm}
                      >
                        <SelectTrigger className="mt-1 w-full">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-base font-medium mb-2">Financing Summary</h3>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Amount:</span>
                        <span>₦{amount ? parseInt(amount).toLocaleString() : "0"}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Term:</span>
                        <span>{term} days</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium pt-1 border-t">
                        <span>Estimated Fee:</span>
                        <span>₦{amount ? (parseInt(amount) * 0.01 * parseInt(term) / 30).toLocaleString() : "0"}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-solar-green-600 hover:bg-solar-green-700"
                      disabled={isSubmitting || !amount}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
            
            <div className="w-full lg:w-1/3 sticky top-24">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Benefits</h3>
                
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 bg-solar-yellow-100 p-1 rounded-full mt-0.5">
                        <Check className="h-4 w-4 text-solar-yellow-600" />
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

export default InventoryFinancing;
