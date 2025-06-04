
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { Users } from 'lucide-react';

interface CustomersEmptyProps {
  onAddCustomer?: () => void;
}

export const CustomersEmpty: React.FC<CustomersEmptyProps> = ({ onAddCustomer }) => {
  return (
    <EmptyState
      icon={<Users className="w-16 h-16" />}
      title="No customers yet"
      description="Add your first customer to start building your customer database. You can then create invoices and track payments for each customer."
      actionLabel="Add Customer"
      onAction={onAddCustomer}
      className="min-h-[400px]"
    />
  );
};
