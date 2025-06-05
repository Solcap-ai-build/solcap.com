
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { WalletEmpty } from '@/components/empty-states';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface CreditWallet {
  avaialable_balance: number;
  credit_balance: number;
  pending_balance: number;
  user_id: string;
}

const WalletPage = () => {
  const { user, hasCompletedOnboarding } = useAuth();
  const [creditWallet, setCreditWallet] = useState<CreditWallet | null>(null);

  useEffect(() => {
    const fetchCreditwallet = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching onboarding data:', error);
        } 
        setCreditWallet(data)
      } catch (error) {
        console.error('Error in fetchCreditwallet:', error);
      }
    };

    fetchCreditwallet();
  }, [user]);


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
