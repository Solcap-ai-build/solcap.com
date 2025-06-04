
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  paystackPlanCode?: string;
}

const paymentPlans: PaymentPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49000, // Price in kobo (₦490)
    currency: 'NGN',
    interval: 'month',
    description: 'Perfect for small businesses getting started',
    paystackPlanCode: 'PLN_starter_monthly',
    features: [
      { text: 'Up to ₦500,000 credit line', included: true },
      { text: 'Basic inventory financing', included: true },
      { text: 'Email support', included: true },
      { text: 'Standard processing times', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom credit terms', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149000, // Price in kobo (₦1,490)
    currency: 'NGN',
    interval: 'month',
    description: 'Ideal for growing businesses with higher volume',
    popular: true,
    paystackPlanCode: 'PLN_professional_monthly',
    features: [
      { text: 'Up to ₦2,500,000 credit line', included: true },
      { text: 'Advanced inventory financing', included: true },
      { text: 'Priority email & phone support', included: true },
      { text: 'Fast processing times', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Multiple payment methods', included: true },
      { text: 'Custom credit terms', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499000, // Price in kobo (₦4,990)
    currency: 'NGN',
    interval: 'month',
    description: 'Comprehensive solution for established businesses',
    paystackPlanCode: 'PLN_enterprise_monthly',
    features: [
      { text: 'Up to ₦25,000,000 credit line', included: true },
      { text: 'Full inventory financing suite', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Instant processing', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'All payment methods', included: true },
      { text: 'Custom credit terms', included: true },
    ],
  },
];

const PaymentPlans = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const formatPrice = (priceInKobo: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(priceInKobo / 100);
  };

  const handleSubscribe = async (plan: PaymentPlan) => {
    if (!user) {
      toast.error('Please log in to subscribe');
      return;
    }

    setIsLoading(plan.id);

    try {
      // Initialize Paystack payment
      const paystackHandler = (window as any).PaystackPop?.setup({
        key: 'pk_test_your_paystack_public_key', // This should come from environment variables
        email: user.email,
        amount: plan.price,
        currency: plan.currency,
        plan: plan.paystackPlanCode,
        metadata: {
          custom_fields: [
            {
              display_name: "Plan Name",
              variable_name: "plan_name",
              value: plan.name
            },
            {
              display_name: "User ID",
              variable_name: "user_id", 
              value: user.id
            }
          ]
        },
        callback: async function(response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Save subscription to database
          try {
            const { error } = await supabase
              .from('transactions')
              .insert({
                user_id: user.id,
                amount: plan.price / 100, // Convert back to naira
                type: 'subscription',
                status: 'completed',
                description: `${plan.name} plan subscription`,
                payment_reference: response.reference,
                payment_provider: 'paystack'
              });

            if (error) throw error;
            
            toast.success(`Successfully subscribed to ${plan.name} plan!`);
          } catch (error) {
            console.error('Error saving subscription:', error);
            toast.error('Payment successful but failed to update subscription status');
          }
        },
        onClose: function() {
          toast.info('Payment window closed');
        }
      });

      if (paystackHandler) {
        paystackHandler.openIframe();
      } else {
        throw new Error('Paystack is not available. Please try again later.');
      }
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the perfect plan for your business needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {paymentPlans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-solar-green-500 shadow-lg' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-solar-green-600">
                Most Popular
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                <DollarSign className="h-5 w-5 text-solar-green-600" />
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check 
                      className={`h-4 w-4 mr-3 ${
                        feature.included 
                          ? 'text-green-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                    <span className={feature.included ? '' : 'text-gray-400 line-through'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-6"
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading === plan.id}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isLoading === plan.id ? 'Processing...' : `Subscribe to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>All payments are processed securely through Paystack</p>
        <p>You can cancel your subscription at any time</p>
      </div>
    </div>
  );
};

export default PaymentPlans;
