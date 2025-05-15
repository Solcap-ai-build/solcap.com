import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Landmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddFundsDialogProps {
  onAddFunds?: (amount: number, method: string) => void;
}

const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ onAddFunds }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'transfer'>('card');
  const { toast } = useToast();

  const handleAddFunds = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    // Simulate adding funds
    if (onAddFunds) {
      onAddFunds(parseFloat(amount), selectedMethod);
    }

    toast({
      title: `${selectedMethod === 'card' ? 'Card Payment' : 'Bank Transfer'} Initiated`,
      description: `₦${parseFloat(amount).toLocaleString()} will be added to your wallet`
    });
    
    setOpen(false);
    setAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Funds</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Choose how you'd like to add funds to your wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              type="number"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer border-2 hover:bg-gray-50 transition-all ${
                  selectedMethod === 'card' ? 'border-solar-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod('card')}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <CreditCard className={`h-8 w-8 mb-2 ${
                    selectedMethod === 'card' ? 'text-solar-green-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    selectedMethod === 'card' ? 'text-solar-green-600' : 'text-gray-700'
                  }`}>Card</span>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer border-2 hover:bg-gray-50 transition-all ${
                  selectedMethod === 'transfer' ? 'border-solar-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod('transfer')}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Landmark className={`h-8 w-8 mb-2 ${
                    selectedMethod === 'transfer' ? 'text-solar-green-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    selectedMethod === 'transfer' ? 'text-solar-green-600' : 'text-gray-700'
                  }`}>Transfer</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {selectedMethod === 'transfer' && (
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium mb-2">Bank Transfer Details</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-500">Bank:</span> Access Bank</p>
                <p><span className="text-gray-500">Account Name:</span> SolCap Technologies Ltd</p>
                <p><span className="text-gray-500">Account Number:</span> 0123456789</p>
                <p className="text-xs mt-2 text-gray-500">
                  Please use your company name as reference
                </p>
              </div>
            </div>
          )}

          <Button 
            type="button" 
            onClick={handleAddFunds}
            disabled={!amount}
            className="bg-solar-green-600 hover:bg-solar-green-700 w-full mt-4"
          >
            {selectedMethod === 'card' 
              ? 'Pay with Card' 
              : 'I have made the transfer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
