
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { PaymentLinksEmpty } from '@/components/empty-states';

const PaymentLinksPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Link className="mr-2 h-6 w-6" /> Payment Links
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Links (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentLinksEmpty onCreateLink={() => console.log('Creating payment link...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinksPage;
