
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

const CreditPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <CreditCard className="mr-2 h-6 w-6" /> Credit & Loans
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit & Loan Services</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<CreditCard className="w-16 h-16" />}
            title="No credit applications yet"
            description="Apply for business credit or loans to help grow your business. Our platform offers competitive rates and quick approval processes."
            actionLabel="Apply for Credit"
            className="min-h-[400px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditPage;
