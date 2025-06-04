
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

const InventoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6" /> Inventory Finance
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Finance</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Package className="w-16 h-16" />}
            title="No inventory financing requests"
            description="Get financing for your inventory purchases. Upload invoices and purchase orders to request inventory financing at competitive rates."
            actionLabel="Request Financing"
            className="min-h-[400px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
