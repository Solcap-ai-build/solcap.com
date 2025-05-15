
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Calendar, ClipboardCheck } from "lucide-react";

interface CreditLimitCardProps {
  creditLimit: number;
  availableCredit: number;
  usedCredit: number;
  interestRate: number;
  remainingDays: number;
  onWithdraw?: (amount: number) => void;
}

const CreditLimitCard: React.FC<CreditLimitCardProps> = ({
  creditLimit,
  availableCredit,
  usedCredit,
  interestRate,
  remainingDays,
  onWithdraw
}) => {
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { toast } = useToast();

  const usagePercentage = (usedCredit / creditLimit) * 100;

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(withdrawAmount);
    
    if (amount > availableCredit) {
      toast({
        title: "Insufficient credit",
        description: "The amount exceeds your available credit",
        variant: "destructive"
      });
      return;
    }

    if (!isTermsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms to continue",
        variant: "destructive"
      });
      return;
    }

    // Call the onWithdraw callback
    if (onWithdraw) {
      onWithdraw(amount);
    }

    toast({
      title: "Withdrawal successful",
      description: `₦${amount.toLocaleString()} has been added to your wallet`
    });

    setIsWithdrawDialogOpen(false);
    setWithdrawAmount('');
    setIsTermsAccepted(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Credit Line</span>
          <span className="text-2xl font-bold">₦{creditLimit.toLocaleString()}</span>
        </CardTitle>
        <CardDescription>30-day rolling working capital at {interestRate}% monthly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Credit Used</span>
            <span>₦{usedCredit.toLocaleString()} / ₦{creditLimit.toLocaleString()}</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <div className="flex justify-between text-sm pt-1">
            <span className="text-gray-500">Available: ₦{availableCredit.toLocaleString()}</span>
            <span className="text-gray-500">{usagePercentage.toFixed(0)}% Used</span>
          </div>
        </div>

        <div className="flex items-center p-3 bg-amber-50 rounded-md border border-amber-200">
          <Calendar className="h-5 w-5 text-amber-600 mr-2" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-amber-700">
              {remainingDays} {remainingDays === 1 ? 'day' : 'days'} remaining
            </span>
            <span className="text-xs text-amber-600">
              Reset on full repayment
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-solar-green-600 hover:bg-solar-green-700">
              <ArrowDown className="mr-2 h-4 w-4" /> Withdraw to Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw from Credit Line</DialogTitle>
              <DialogDescription>
                This amount will be added to your wallet balance and subject to {interestRate}% monthly interest until repaid.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (₦)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="1"
                  max={availableCredit}
                />
                <p className="text-xs text-gray-500">
                  Available credit: ₦{availableCredit.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Withdrawal amount:</span>
                  <span>₦{parseFloat(withdrawAmount || '0').toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interest ({interestRate}% monthly):</span>
                  <span>₦{((parseFloat(withdrawAmount || '0') * interestRate) / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-1 mt-1">
                  <span>To repay after 30 days:</span>
                  <span>₦{(parseFloat(withdrawAmount || '0') * (1 + interestRate / 100)).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="accept-terms"
                  className="mt-1"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                />
                <Label htmlFor="accept-terms" className="text-sm text-gray-600">
                  I understand that this amount will be added to my wallet and I'll need to repay with {interestRate}% interest within 30 days.
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > availableCredit || !isTermsAccepted}
                className="bg-solar-green-600 hover:bg-solar-green-700"
              >
                <ArrowDown className="mr-2 h-4 w-4" /> Withdraw to Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CreditLimitCard;
