
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { LoanEmptyIcon } from '@/components/icons/fintech-icons';

interface LoanEmptyProps {
  onRequestLoan?: () => void;
}

export const LoanEmpty: React.FC<LoanEmptyProps> = ({ onRequestLoan }) => {
  return (
    <EmptyState
      icon={<LoanEmptyIcon />}
      title="No loan history"
      description="You haven't applied for any loans yet. Get quick access to working capital to grow your business."
      actionLabel="Request Loan"
      onAction={onRequestLoan}
      className="min-h-[400px]"
    />
  );
};
