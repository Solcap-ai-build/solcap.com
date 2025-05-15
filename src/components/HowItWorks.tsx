
import React from "react";
import { ClipboardList, ArrowRight, CreditCard, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="h-12 w-12 text-solar-green-600" />,
      title: "Quick Application",
      description: "Complete our streamlined application process in minutes, providing basic information about your solar business.",
    },
    {
      icon: <ArrowRight className="h-12 w-12 text-solar-green-600" />,
      title: "Fast Approval",
      description: "Our technology-driven underwriting process evaluates your application quickly, typically within 24-48 hours.",
    },
    {
      icon: <CreditCard className="h-12 w-12 text-solar-green-600" />,
      title: "Access Funds",
      description: "Once approved, funds are deposited directly into your business bank account or made available through your SolCap wallet.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-solar-green-600" />,
      title: "Flexible Repayment",
      description: "Choose repayment terms that work for your business cycle, with options ranging from 30 to 90 days.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-solar-green-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How SolCap Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our straightforward process gets you the financing you need without the hassle
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile view - Vertical steps */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm border border-solar-green-200 hover:shadow-md transition-all duration-300 hover:border-solar-green-300"
              >
                <div className="mb-4 bg-solar-green-100 p-4 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-solar-green-800">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop view - Horizontal steps with connecting lines */}
          <div className="hidden md:grid grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-solar-green-200 -z-10"></div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative bg-white p-6 rounded-lg shadow-sm border border-solar-green-200 hover:shadow-md transition-all duration-300 hover:border-solar-green-300"
              >
                <div className="mb-4 bg-solar-green-100 p-4 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-solar-green-800">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
