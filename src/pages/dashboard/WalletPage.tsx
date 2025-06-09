
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { TransactionsEmpty, WalletEmpty } from '@/components/empty-states';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Trash } from "lucide-react";
import AddFundsModal from '@/components/dashboard/AddFundsDialog';


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

  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { toast } = useToast();

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
      <Card>
        <CardHeader className='bg-solar-green-300 round overflow-hidden'>
          <div className="flex overflow-hidden round border-b-gray-200 flex-col md:flex-row gap-4 items-start justify-between">
            <div className="">
              <h1 className='text-2xl font-bold'>Available Balance</h1>
              <p className="">Your funds avaialable for immediate use</p>
            </div>
            <div className="text-2xl font-bold">
              ₦850,000
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-10">

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 border p-4 round">
                <h1 className=''>Credit Balance</h1>
                <p className="text-lg font-bold">₦850,000</p>
              </div>

              <div className="w-full md:w-1/2 border p-4 round">
                <h1 className=''>Pending Balance</h1>
                <p className="text-lg font-bold">₦850,000</p>
              </div>
            </div>

            <div className="flex mt-5 overflow-hidden round border-b-gray-200 flex-col md:flex-row gap-4 items-start justify-between">
              <div className="">
                <h1 className='font-semibold'>Total Balance</h1>
              </div>
              <div className="text-lg font-bold">
                ₦850,000
              </div>
            </div>

            <div className="flex border-t pt-2 mt-5 overflow-hidden round border-b-gray-200 flex-col md:flex-row gap-4 items-start justify-between">
              <div className="">
                <AddFundsModal
                  isOpen={isModalOpen}
                  onClose={handleClose}
                />
              </div>
              <div className="">
                <button className="mt-3 px-4 py-2 border border-solar-green-400 bg-solar-green-500 text-white rounded-md hover:bg-solar-green-600 transition">
                  Transfer Funds
                </button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='overflow-hidden'>
          <div className="flex overflow-hidden round border-b-gray-200 flex-col md:flex-row gap-4">
            <div className="">
              <h1 className='text-2xl font-bold'>Transaction History</h1>
            </div>
          </div>
        </CardHeader>
        <CardContent className='mb-10'>
          <TransactionsEmpty />
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
