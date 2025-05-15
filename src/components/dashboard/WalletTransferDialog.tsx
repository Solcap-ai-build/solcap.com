
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankSelect } from "@/components/ui/bank-select";
import { useToast } from '@/hooks/use-toast';

interface WalletTransferDialogProps {
  onTransfer?: (amount: number, method: string) => void;
}

const WalletTransferDialog: React.FC<WalletTransferDialogProps> = ({ onTransfer }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const { toast } = useToast();

  const validateAccount = () => {
    if (!bankName || !accountNumber || accountNumber.length !== 10) {
      toast({
        title: "Invalid details",
        description: "Please provide valid bank details",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    // Simulate account validation (in a real app, this would be an API call)
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
      setAccountName("John Solar Enterprises Ltd");
      toast({
        title: "Account validated",
        description: "Bank account details have been verified"
      });
    }, 1500);
  };

  const handleTransfer = (method: string) => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to transfer",
        variant: "destructive"
      });
      return;
    }

    if (method === 'bank' && (!isValidated || !bankName || !accountNumber)) {
      toast({
        title: "Incomplete details",
        description: "Please validate the bank account first",
        variant: "destructive"
      });
      return;
    }

    // Simulate transfer
    if (onTransfer) {
      onTransfer(parseFloat(amount), method);
    }

    toast({
      title: "Transfer initiated",
      description: `₦${parseFloat(amount).toLocaleString()} transfer has been initiated`
    });
    
    setOpen(false);
    
    // Reset form
    setAmount('');
    setBankName('');
    setAccountNumber('');
    setAccountName('');
    setIsValidated(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-solar-green-600 hover:bg-solar-green-700">Transfer Funds</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>
            Transfer funds from your wallet to a bank account or other destination.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="bank" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
            <TabsTrigger value="internal">Internal Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Bank</Label>
              <BankSelect value={bankName} onChange={setBankName} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <div className="flex gap-2">
                <Input
                  id="account-number"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    setIsValidated(false);
                  }}
                  maxLength={10}
                  placeholder="10-digit account number"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={validateAccount}
                  disabled={isValidating || !bankName || accountNumber.length !== 10}
                >
                  {isValidating ? "Validating..." : "Validate"}
                </Button>
              </div>
            </div>
            
            {isValidated && (
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input id="account-name" value={accountName} readOnly className="bg-gray-50" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="transfer-amount">Amount (₦)</Label>
              <Input
                id="transfer-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="1"
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                onClick={() => handleTransfer('bank')}
                disabled={!isValidated || !amount}
                className="bg-solar-green-600 hover:bg-solar-green-700 w-full"
              >
                Transfer to Bank
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="internal" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="internal-destination">Destination</Label>
              <Input id="internal-destination" placeholder="Credit line repayment" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="internal-amount">Amount (₦)</Label>
              <Input
                id="internal-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="1"
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                onClick={() => handleTransfer('internal')}
                disabled={!amount}
                className="bg-solar-green-600 hover:bg-solar-green-700 w-full"
              >
                Complete Internal Transfer
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default WalletTransferDialog;
