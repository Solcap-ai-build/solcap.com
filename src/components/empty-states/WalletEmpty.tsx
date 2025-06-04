
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { WalletEmptyIcon } from '@/components/icons/fintech-icons';

interface WalletEmptyProps {
  onAddFunds?: () => void;
}

export const WalletEmpty: React.FC<WalletEmptyProps> = ({ onAddFunds }) => {
  return (
    <EmptyState
      icon={<WalletEmptyIcon />}
      title="No transactions yet"
      description="Your wallet is ready to go! Add funds to start making transactions and managing your finances."
      actionLabel="Add Funds"
      onAction={onAddFunds}
      className="min-h-[400px]"
    />
  );
};
