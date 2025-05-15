
import { Sun, Leaf, ChartBar } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-solar-green-50">      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About <span className="text-solar-green-700">SolCap</span></h2>
            <p className="text-lg text-gray-600 mb-6">
              SolCap is dedicated to accelerating the renewable energy transition by providing specialized financial solutions for solar providers and installers.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We understand the unique challenges faced by solar businesses, from seasonal fluctuations to inventory management. Our financing solutions are specifically designed to address these needs.
            </p>
            <p className="text-lg text-gray-600">
              Founded by experts from both renewable energy and finance sectors, we combine deep industry knowledge with financial innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-300">
              <Sun className="h-10 w-10 text-solar-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-solar-green-800">Our Mission</h3>
              <p className="text-gray-600">
                To accelerate the global transition to renewable energy by removing financial barriers for solar providers.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-300">
              <Leaf className="h-10 w-10 text-solar-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-solar-green-800">Our Impact</h3>
              <p className="text-gray-600">
                We aim to finance solar projects across Africa, contributing to a cleaner energy future.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-300 sm:col-span-2">
              <ChartBar className="h-10 w-10 text-solar-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-solar-green-800">Our Expertise</h3>
              <p className="text-gray-600">
                Our team brings together decades of experience in renewable energy financing, with a deep understanding of the solar industry's specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
