
import React from 'react';
import { Check, Building, FileText, CreditCard } from 'lucide-react';

interface OnboardingStepsProps {
  currentStep: number;
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    completed: boolean;
  }>;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Complete Your Setup</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : currentStep === step.id 
                ? 'bg-solar-green-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-medium ${
                step.completed 
                  ? 'text-green-700' 
                  : currentStep === step.id 
                  ? 'text-solar-green-700' 
                  : 'text-gray-500'
              }`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            <div className="flex-shrink-0">
              {React.cloneElement(step.icon as React.ReactElement, {
                className: `h-5 w-5 ${
                  step.completed 
                    ? 'text-green-500' 
                    : currentStep === step.id 
                    ? 'text-solar-green-600' 
                    : 'text-gray-400'
                }`
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingSteps;
