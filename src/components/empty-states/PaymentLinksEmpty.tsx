
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { Link } from 'lucide-react';

interface PaymentLinksEmptyProps {
  onCreateLink?: () => void;
}

export const PaymentLinksEmpty: React.FC<PaymentLinksEmptyProps> = ({ onCreateLink }) => {
  return (
    <EmptyState
      icon={<Link className="w-16 h-16" />}
      title="No payment links yet"
      description="Create payment links to easily collect payments from customers. Share links via email, SMS, or social media to get paid faster."
      actionLabel="Create Payment Link"
      onAction={onCreateLink}
      className="min-h-[400px]"
    />
  );
};
