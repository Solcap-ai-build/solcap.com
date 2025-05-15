
import { Wallet, Package, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Solutions = () => {
  const solutionsList = [
    {
      icon: <Wallet className="h-10 w-10 text-solar-green-600" />,
      title: "Working Capital",
      description: "Flexible financing solutions for your operational needs, payroll, and growth initiatives. Scale your solar installation business with reliable cash flow.",
      link: "/register",
      isComingSoon: false
    },
    {
      icon: <Package className="h-10 w-10 text-solar-yellow-600" />,
      title: "Inventory Financing",
      description: "Fund your solar panel and equipment purchases without depleting your cash reserves. Meet customer demand with fully stocked inventory.",
      link: "/register",
      isComingSoon: false
    },
    {
      icon: <Cpu className="h-10 w-10 text-solar-blue-600" />,
      title: "Microgrid Financing",
      description: "Specialized funding solutions for microgrid projects, helping developers deploy sustainable energy solutions in communities.",
      link: "#",
      isComingSoon: true
    }
  ];

  const benefitsList = [
    "Fast application process",
    "Competitive interest rates",
    "Tailored for renewable energy providers",
    "Dedicated support team with solar industry expertise"
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Financial Solutions for Solar Providers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Purpose-built financing options that understand the unique challenges and opportunities in the renewable energy sector.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutionsList.map((solution, index) => (
            <Card key={index} className="h-full border border-solar-green-200 shadow-md hover:shadow-lg transition-all duration-300 hover:border-solar-green-300 bg-gradient-to-b from-white to-solar-green-50/30">
              <CardHeader className="pb-2">
                <div className="mb-4">
                  {solution.icon}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {solution.title}
                  {solution.isComingSoon && (
                    <span className="ml-2 text-xs py-1 px-2 bg-solar-blue-100 text-solar-blue-700 rounded-full">
                      coming soon
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 mb-6">
                  {solution.description}
                </CardDescription>
                {!solution.isComingSoon ? (
                  <Button className="w-full bg-solar-green-600 hover:bg-solar-green-700 text-white" asChild>
                    <Link to={solution.link}>Get Started</Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-solar-green-50 rounded-lg p-8 border border-solar-green-200 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-solar-green-800">Why Choose SolCap?</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {benefitsList.map((benefit, index) => (
              <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-300">
                <div className="mr-3 bg-solar-green-100 p-1.5 rounded-full">
                  <svg className="h-5 w-5 text-solar-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
