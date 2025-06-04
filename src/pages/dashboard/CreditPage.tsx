
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';
import CreditLimitCard from '@/components/dashboard/CreditLimitCard';
import { useToast } from '@/hooks/use-toast';

const CreditPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for credit information
  const creditData = {
    creditLimit: 5000000,
    availableCredit: 3500000,
    usedCredit: 1500000,
    interestRate: 2.5,
    remainingDays: 23,
    creditScore: 720,
    lastPayment: '2024-01-15',
    nextPaymentDue: '2024-02-15'
  };

  const creditHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 500000,
      type: 'repayment',
      status: 'completed',
      description: 'Monthly repayment'
    },
    {
      id: 2,
      date: '2024-01-10',
      amount: 2000000,
      type: 'withdrawal',
      status: 'completed',
      description: 'Working capital withdrawal'
    },
    {
      id: 3,
      date: '2024-01-05',
      amount: 1000000,
      type: 'withdrawal',
      status: 'completed',
      description: 'Inventory purchase funding'
    }
  ];

  const handleWithdraw = (amount: number) => {
    console.log('Withdrawing amount:', amount);
    toast({
      title: "Withdrawal processed",
      description: `₦${amount.toLocaleString()} has been added to your wallet`,
    });
  };

  const handleApplyForIncrease = () => {
    toast({
      title: "Credit increase application submitted",
      description: "We'll review your application and get back to you within 48 hours",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <CreditCard className="mr-2 h-6 w-6" /> Credit & Loans
        </h1>
        <Button onClick={handleApplyForIncrease} className="bg-solar-green-600 hover:bg-solar-green-700">
          <TrendingUp className="mr-2 h-4 w-4" />
          Apply for Increase
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="application">Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Limit Card */}
            <CreditLimitCard
              creditLimit={creditData.creditLimit}
              availableCredit={creditData.availableCredit}
              usedCredit={creditData.usedCredit}
              interestRate={creditData.interestRate}
              remainingDays={creditData.remainingDays}
              onWithdraw={handleWithdraw}
            />

            {/* Credit Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Credit Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-solar-green-600">
                    {creditData.creditScore}
                  </div>
                  <p className="text-sm text-gray-500">Excellent</p>
                </div>
                
                <Progress value={(creditData.creditScore / 850) * 100} className="h-3" />
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Poor (300)</span>
                  <span>Excellent (850)</span>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Last Updated:</span>
                    <span className="text-sm font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Next Update:</span>
                    <span className="text-sm font-medium">Feb 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Last Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">₦500,000</div>
                  <div className="text-sm text-gray-500">Paid on {creditData.lastPayment}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    On time payment
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5 text-amber-600" />
                  Next Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">₦37,500</div>
                  <div className="text-sm text-gray-500">Due on {creditData.nextPaymentDue}</div>
                  <div className="flex items-center text-sm text-amber-600">
                    <Calendar className="mr-1 h-4 w-4" />
                    23 days remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'repayment' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {transaction.type === 'repayment' ? 
                          <CheckCircle className="h-4 w-4" /> : 
                          <DollarSign className="h-4 w-4" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'repayment' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'repayment' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Credit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Apply for More Credit?</h3>
                  <p className="text-gray-600 mb-6">
                    Increase your credit limit to access more working capital for your business growth.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Current Limit</h4>
                    <p className="text-2xl font-bold text-solar-green-600">₦5M</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Available</h4>
                    <p className="text-2xl font-bold text-blue-600">₦3.5M</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Credit Score</h4>
                    <p className="text-2xl font-bold text-green-600">{creditData.creditScore}</p>
                  </div>
                </div>

                <Button 
                  onClick={handleApplyForIncrease}
                  className="bg-solar-green-600 hover:bg-solar-green-700 px-8"
                >
                  Apply for Credit Increase
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditPage;
