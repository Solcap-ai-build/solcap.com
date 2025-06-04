
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

const InventoryList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Inventory Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyState
          icon={<Package className="w-16 h-16" />}
          title="No inventory items"
          description="Get started by adding your first inventory item to track and manage your stock levels."
          actionLabel="Add Item"
          className="min-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default InventoryList;
