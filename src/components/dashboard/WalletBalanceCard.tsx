
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, WalletCards, CreditCard, Clock } from "lucide-react";
import AddFundsDialog from "./AddFundsDialog";
import WalletTransferDialog from "./WalletTransferDialog";

interface WalletBalanceCardProps {
  availableBalance: number;
  creditBalance: number;
  pendingBalance: number;
  totalBalance: number;
  onAddFunds?: (amount: number, method: string) => void;
  onTransfer?: (amount: number, method: string) => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  availableBalance,
  creditBalance,
  pendingBalance,
  totalBalance,
  onAddFunds,
  onTransfer
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-solar-green-50 border-b border-solar-green-100">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <WalletCards className="h-5 w-5 text-solar-green-600 mr-2" />
            Available Balance
          </div>
          <span className="text-2xl font-bold">₦{availableBalance.toLocaleString()}</span>
        </CardTitle>
        <CardDescription>Your funds available for immediate use</CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          <div className="p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 flex items-center">
                <CreditCard className="h-4 w-4 mr-1 text-solar-blue-500" /> 
                Credit Balance
              </span>
              <span className="font-semibold">₦{creditBalance.toLocaleString()}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-solar-blue-500 hover:text-solar-blue-600 hover:bg-solar-blue-50"
            >
              <span>Details</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1 text-amber-500" /> 
                Pending
              </span>
              <span className="font-semibold">₦{pendingBalance.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Balance</span>
            <span className="font-bold">₦{totalBalance.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 p-4 pt-2">
        <AddFundsDialog onAddFunds={onAddFunds} />
        <WalletTransferDialog onTransfer={onTransfer} />
      </CardFooter>
    </Card>
  );
};

export default WalletBalanceCard;
