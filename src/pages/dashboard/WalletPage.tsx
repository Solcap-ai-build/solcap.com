
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { WalletEmpty } from '@/components/empty-states';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import axios from 'axios';

const PAYSTACK_SECRET = ""

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

  async function createCustomer(email: string) {
    const response = await axios.post(
      'https://api.paystack.co/customer',
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("response----------------", response)
    await createDedicatedAccount(response.data.data.id)
  
    return response.data.data.id;
  }


  async function createDedicatedAccount(customerId: string) {
    const response = await axios.post(
      'https://api.paystack.co/dedicated_account',
      {
        customer: customerId,
        preferred_bank: 'wema-bank',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );
  
    console.log("response----------------", response)
    return response.data;
  }

  async function getBalance() {
    const response = await axios.get('https://api.paystack.co/balance', {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    });
  
    return response.data.data; // array of balances for different currencies
  }
  


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
          <WalletEmpty onAddFunds={() => createCustomer("ganiyjamiu5@gmail.com")} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
