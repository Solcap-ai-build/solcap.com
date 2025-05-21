
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import NavBar from "@/components/NavBar";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Calculate discounted yearly prices (save 20%)
  const getYearlyPrice = (monthlyPrice: number) => {
    const yearlyTotal = monthlyPrice * 12;
    const discount = yearlyTotal * 0.2;
    return (yearlyTotal - discount) / 12;
  };

  const plans = [
    {
      name: "Basic",
      description: "For small businesses getting started",
      monthlyPrice: 99,
      yearlyPrice: getYearlyPrice(99),
      features: [
        "Up to $10,000 in financing",
        "1% pay-in fees",
        "2% pay-out fees",
        "Up to 10 purchase orders",
        "Email support",
      ],
      cta: "Start with Basic",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing businesses with increasing needs",
      monthlyPrice: 199,
      yearlyPrice: getYearlyPrice(199),
      features: [
        "Up to $50,000 in financing",
        "0.8% pay-in fees",
        "1.5% pay-out fees",
        "Up to 50 purchase orders",
        "Priority email & chat support",
      ],
      cta: "Start with Pro",
      popular: true,
    },
    {
      name: "Custom",
      description: "For established businesses with unique requirements",
      monthlyPrice: 399,
      yearlyPrice: getYearlyPrice(399),
      features: [
        "Custom financing limits",
        "0.5% pay-in fees",
        "1% pay-out fees",
        "Unlimited purchase orders",
        "24/7 phone & priority support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-solar-green-700">
                Simple, transparent pricing
              </h1>
              <p className="max-w-[85%] text-muted-foreground text-lg md:text-xl">
                Choose the perfect plan for your business needs.
                No hidden fees, no surprise charges.
              </p>
              
              {/* Toggle for monthly/yearly billing */}
              <div className="flex items-center space-x-2 mt-6">
                <span className={`text-sm ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
                  Monthly billing
                </span>
                <Switch
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                />
                <span className={`text-sm ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                  Yearly billing
                  <span className="ml-1 text-xs text-solar-green-600 font-medium">Save 20%</span>
                </span>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-10">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-6 ${
                    plan.popular ? "border-solar-green-600 shadow-lg" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-solar-green-600 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-3xl font-bold">
                        ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice.toFixed(0)}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <div className="text-xs text-solar-green-600">
                          Billed annually (${(plan.yearlyPrice * 12).toFixed(0)}/year)
                        </div>
                      )}
                    </div>
                    <Button className={`w-full ${plan.popular ? "bg-solar-green-600 hover:bg-solar-green-700" : ""}`}>
                      {plan.cta}
                    </Button>
                  </div>
                  <div className="mt-6 space-y-2 text-sm">
                    <p className="font-medium">Plan includes:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-solar-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional info */}
            <div className="mx-auto mt-12 max-w-[58rem] text-center text-muted-foreground">
              <p>All plans include basic account features, secure payments, and our customer portal.</p>
              <p className="mt-2">
                Need something specific? <a href="#" className="text-solar-green-600 hover:underline">Contact our sales team</a> for a custom quote.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
