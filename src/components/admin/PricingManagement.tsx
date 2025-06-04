
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, DollarSign } from 'lucide-react';

interface PricingConfig {
  workingCapitalRate: number;
  inventoryFinanceRate: number;
  latePaymentFee: number;
  basicPlanPrice: number;
  proPlanPrice: number;
  customPlanPrice: number;
  payInFeeBasic: number;
  payOutFeeBasic: number;
  payInFeePro: number;
  payOutFeePro: number;
  payInFeeCustom: number;
  payOutFeeCustom: number;
}

const PricingManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Default pricing configuration
  const [pricing, setPricing] = useState<PricingConfig>({
    workingCapitalRate: 5.0,
    inventoryFinanceRate: 4.5,
    latePaymentFee: 2.0,
    basicPlanPrice: 99,
    proPlanPrice: 199,
    customPlanPrice: 399,
    payInFeeBasic: 1.0,
    payOutFeeBasic: 2.0,
    payInFeePro: 0.8,
    payOutFeePro: 1.5,
    payInFeeCustom: 0.5,
    payOutFeeCustom: 1.0,
  });

  const handleInputChange = (field: keyof PricingConfig, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setPricing(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleSavePricing = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to save pricing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo purposes
      localStorage.setItem('adminPricing', JSON.stringify(pricing));
      
      toast({
        title: "Pricing Updated",
        description: "All pricing configurations have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pricing configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Interest Rates & Fees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-solar-green-600" />
            Interest Rates & Fees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="working-capital-rate">Working Capital Rate (%)</Label>
              <Input
                id="working-capital-rate"
                type="number"
                step="0.1"
                value={pricing.workingCapitalRate}
                onChange={(e) => handleInputChange('workingCapitalRate', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="inventory-finance-rate">Inventory Finance Rate (%)</Label>
              <Input
                id="inventory-finance-rate"
                type="number"
                step="0.1"
                value={pricing.inventoryFinanceRate}
                onChange={(e) => handleInputChange('inventoryFinanceRate', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="late-payment-fee">Late Payment Fee (%)</Label>
              <Input
                id="late-payment-fee"
                type="number"
                step="0.1"
                value={pricing.latePaymentFee}
                onChange={(e) => handleInputChange('latePaymentFee', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Plan Pricing ($)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="basic-plan">Basic Plan</Label>
              <Input
                id="basic-plan"
                type="number"
                value={pricing.basicPlanPrice}
                onChange={(e) => handleInputChange('basicPlanPrice', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="pro-plan">Pro Plan</Label>
              <Input
                id="pro-plan"
                type="number"
                value={pricing.proPlanPrice}
                onChange={(e) => handleInputChange('proPlanPrice', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="custom-plan">Custom Plan</Label>
              <Input
                id="custom-plan"
                type="number"
                value={pricing.customPlanPrice}
                onChange={(e) => handleInputChange('customPlanPrice', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees (%)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="basic-pay-in">Basic Plan - Pay-in Fee</Label>
                <Input
                  id="basic-pay-in"
                  type="number"
                  step="0.1"
                  value={pricing.payInFeeBasic}
                  onChange={(e) => handleInputChange('payInFeeBasic', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basic-pay-out">Basic Plan - Pay-out Fee</Label>
                <Input
                  id="basic-pay-out"
                  type="number"
                  step="0.1"
                  value={pricing.payOutFeeBasic}
                  onChange={(e) => handleInputChange('payOutFeeBasic', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="pro-pay-in">Pro Plan - Pay-in Fee</Label>
                <Input
                  id="pro-pay-in"
                  type="number"
                  step="0.1"
                  value={pricing.payInFeePro}
                  onChange={(e) => handleInputChange('payInFeePro', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pro-pay-out">Pro Plan - Pay-out Fee</Label>
                <Input
                  id="pro-pay-out"
                  type="number"
                  step="0.1"
                  value={pricing.payOutFeePro}
                  onChange={(e) => handleInputChange('payOutFeePro', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="custom-pay-in">Custom Plan - Pay-in Fee</Label>
                <Input
                  id="custom-pay-in"
                  type="number"
                  step="0.1"
                  value={pricing.payInFeeCustom}
                  onChange={(e) => handleInputChange('payInFeeCustom', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="custom-pay-out">Custom Plan - Pay-out Fee</Label>
                <Input
                  id="custom-pay-out"
                  type="number"
                  step="0.1"
                  value={pricing.payOutFeeCustom}
                  onChange={(e) => handleInputChange('payOutFeeCustom', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSavePricing} 
        className="w-full bg-solar-green-600 hover:bg-solar-green-700"
        disabled={isLoading}
      >
        <Save className="mr-2 h-4 w-4" />
        {isLoading ? 'Saving...' : 'Save All Pricing Changes'}
      </Button>
    </div>
  );
};

export default PricingManagement;
