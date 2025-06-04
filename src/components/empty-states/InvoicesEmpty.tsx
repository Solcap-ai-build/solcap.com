
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { FileText } from 'lucide-react';

interface InvoicesEmptyProps {
  onCreateInvoice?: () => void;
}

export const InvoicesEmpty: React.FC<InvoicesEmptyProps> = ({ onCreateInvoice }) => {
  return (
    <EmptyState
      icon={<FileText className="w-16 h-16" />}
      title="No invoices yet"
      description="Create your first invoice to start getting paid by your customers. Invoices help you track payments and manage your business finances."
      actionLabel="Create Invoice"
      onAction={onCreateInvoice}
      className="min-h-[400px]"
    />
  );
};
