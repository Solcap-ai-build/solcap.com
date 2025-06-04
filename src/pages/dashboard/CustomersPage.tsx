
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { CustomersEmpty } from '@/components/empty-states';

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Store className="mr-2 h-6 w-6" /> Customers
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomersEmpty onAddCustomer={() => console.log('Adding customer...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
