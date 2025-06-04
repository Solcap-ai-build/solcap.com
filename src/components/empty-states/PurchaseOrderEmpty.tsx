
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { PurchaseOrderEmptyIcon } from '@/components/icons/fintech-icons';

interface PurchaseOrderEmptyProps {
  onAddPO?: () => void;
}

export const PurchaseOrderEmpty: React.FC<PurchaseOrderEmptyProps> = ({ onAddPO }) => {
  return (
    <EmptyState
      icon={<PurchaseOrderEmptyIcon />}
      title="No purchase orders"
      description="Upload your purchase orders to unlock financing options and streamline your procurement process."
      actionLabel="Add Purchase Order"
      onAction={onAddPO}
      className="min-h-[400px]"
    />
  );
};
