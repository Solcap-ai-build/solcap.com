
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { CreditEvaluationEmptyIcon } from '@/components/icons/fintech-icons';

interface CreditEvaluationEmptyProps {
  onLinkBank?: () => void;
}

export const CreditEvaluationEmpty: React.FC<CreditEvaluationEmptyProps> = ({ onLinkBank }) => {
  return (
    <EmptyState
      icon={<CreditEvaluationEmptyIcon />}
      title="Credit not evaluated"
      description="Connect your bank account to get your credit score and unlock personalized financing options."
      actionLabel="Link Bank Account"
      onAction={onLinkBank}
      className="min-h-[400px]"
    />
  );
};
