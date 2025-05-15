
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 bg-solar-green-50 rounded-lg border border-solar-green-100">
              <span className="text-sm font-medium text-solar-green-800">Operating System for Renewable Energy Businesses</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
              Powering the <span className="text-solar-green-700">renewable energy</span> revolution
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Specialized financial solutions for solar providers. 
              Unlock your growth potential with flexible working capital 
              and inventory financing options.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-solar-green-600 hover:bg-solar-green-700 text-white flex items-center gap-2 w-full sm:w-auto"
                asChild
              >
                <Link to="/register">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-solar-green-700 border-solar-green-300 w-full sm:w-auto"
                asChild
              >
                <a href="#about">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
