
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { WalletEmpty } from '@/components/empty-states';

const WalletPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Wallet className="mr-2 h-6 w-6" /> Wallet
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <WalletEmpty onAddFunds={() => console.log('Adding funds...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
