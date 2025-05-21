
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Zap, ArrowRight, Package, Wallet, File, CreditCard, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import NavBar from "@/components/NavBar";
import About from "@/components/About";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const Index = () => {
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null);

  const faqs = [
    {
      question: "What is rolling working capital?",
      answer: "Our rolling working capital provides flexible financing for 30 days, allowing solar businesses to manage cash flow, cover operational expenses, and seize growth opportunities without long-term debt commitments."
    },
    {
      question: "How does dynamic funding work?",
      answer: "Dynamic funding allows you to draw down capital as needed. This means you only pay for what you use, when you use it, giving you complete control over your financing costs."
    },
    {
      question: "What terms are available for inventory financing?",
      answer: "We offer inventory financing for up to 90 days, helping solar providers purchase panels and equipment without tying up cash. This enables you to maintain optimal inventory levels to meet customer demand."
    },
    {
      question: "Who qualifies for SolCap financing?",
      answer: "We primarily work with established solar installation companies, distributors, and manufacturers with at least 12 months of operating history. Our application process evaluates your business's financial health and growth potential."
    },
    {
      question: "How quickly can I access funding?",
      answer: "After approval, funds can be available within 1-3 business days. Our streamlined application process is designed to minimize paperwork and get you the capital you need quickly."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <Solutions />
      <HowItWorks />

      {/* Benefits Section - Was previously after About, now before */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Operating System for Renewable Energy Businesses
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Streamline your operations, improve cash flow, and accelerate growth with our all-in-one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border-solar-green-100 hover:shadow-md transition-all">
              <div className="mb-4 bg-solar-green-50 w-12 h-12 flex items-center justify-center rounded-lg">
                <File className="h-6 w-6 text-solar-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Send Invoices</h3>
              <p className="text-gray-600">
                Create and send professional invoices to your customers in seconds. Track payments and get paid faster.
              </p>
            </Card>

            <Card className="p-6 border-solar-green-100 hover:shadow-md transition-all">
              <div className="mb-4 bg-solar-green-50 w-12 h-12 flex items-center justify-center rounded-lg">
                <Users className="h-6 w-6 text-solar-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manage Teams</h3>
              <p className="text-gray-600">
                Organize your workforce, assign roles and permissions, and improve collaboration across your renewable energy business.
              </p>
            </Card>

            <Card className="p-6 border-solar-green-100 hover:shadow-md transition-all">
              <div className="mb-4 bg-solar-green-50 w-12 h-12 flex items-center justify-center rounded-lg">
                <Wallet className="h-6 w-6 text-solar-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-gray-600">
                Accept payments directly to your wallet. Multiple payment methods to make it easy for your customers.
              </p>
            </Card>

            <Card className="p-6 border-solar-green-100 hover:shadow-md transition-all">
              <div className="mb-4 bg-solar-green-50 w-12 h-12 flex items-center justify-center rounded-lg">
                <CreditCard className="h-6 w-6 text-solar-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Credit</h3>
              <p className="text-gray-600">
                Get instant access to working capital and inventory financing when you need it most to grow your business.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About section - Was previously before Benefits, now after */}
      <About />

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50" id="faqs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Common questions about our financing solutions for solar providers
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-solar-green-100 bg-white mb-3 rounded-lg overflow-hidden">
                  <AccordionTrigger className="text-left font-medium text-gray-900 px-4 py-3 hover:bg-solar-green-50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 bg-solar-green-50/30 px-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-solar-green-50 via-white to-solar-yellow-50 opacity-70 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-solar-green-400 via-solar-yellow-400 to-solar-blue-400"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-solar-green-100 rounded-full mix-blend-multiply opacity-30 blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <Zap className="h-10 w-10 text-solar-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-solar-green-800 to-solar-blue-800">Ready to Power Your Growth?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the financial solution that best fits your business needs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-3xl mx-auto">
            <Card className="flex-1 p-6 hover:shadow-xl transition-all duration-300 border-solar-green-200 bg-white/80 backdrop-blur-sm overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-solar-green-500/5 to-solar-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center space-y-4 relative z-10">
                <div className="w-14 h-14 bg-solar-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Wallet className="h-7 w-7 text-solar-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-solar-green-700">Working Capital</h3>
                <p className="text-gray-500">Flexible financing for your operational expenses and growth initiatives.</p>
                <Button asChild className="w-full bg-solar-green-600 hover:bg-solar-green-700 text-white">
                  <Link to="/register">
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="flex-1 p-6 hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-solar-green-600 to-solar-green-700 z-0"></div>
              <div className="text-center space-y-4 relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Package className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Inventory Financing</h3>
                <p className="text-white/80">Stock up on solar panels and equipment without tying up your capital.</p>
                <Button asChild className="w-full bg-white text-solar-green-700 hover:bg-solar-yellow-50">
                  <Link to="/register">
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-solar-green-900/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Leaf className="h-5 w-5 text-solar-green-400 mr-2" /> SolCap
              </h3>
              <p className="text-gray-400">Specialized financing for solar providers.</p>
            </div>

            <div className="md:col-span-1">
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="/solutions/working-capital" className="text-gray-400 hover:text-solar-green-300 transition-colors">Working Capital</a></li>
                <li><a href="/solutions/inventory-financing" className="text-gray-400 hover:text-solar-green-300 transition-colors">Inventory Financing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-solar-green-300 transition-colors flex items-center gap-1">Microgrid Financing <span className="text-xs bg-gray-700 px-1 py-0.5 rounded">Coming Soon</span></a></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="#solutions" className="text-gray-400 hover:text-solar-green-300 transition-colors">Solutions</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-solar-green-300 transition-colors">How It Works</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-solar-green-300 transition-colors">About</a></li>
                <li><a href="#faqs" className="text-gray-400 hover:text-solar-green-300 transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">hello@getsolcap.com</p>
              <div className="mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-solar-green-300 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-solar-green-300 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 SolCap Technologies Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
