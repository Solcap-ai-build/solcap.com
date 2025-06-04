
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { Activity } from 'lucide-react';

export const TransactionsEmpty: React.FC = () => {
  return (
    <EmptyState
      icon={<Activity className="w-16 h-16" />}
      title="No transactions yet"
      description="Your transaction history is empty. Start by adding funds to your wallet or making your first transaction."
      className="min-h-[400px]"
    />
  );
};
