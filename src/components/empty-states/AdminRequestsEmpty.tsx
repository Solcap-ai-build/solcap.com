
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { RequestsEmptyIcon } from '@/components/icons/fintech-icons';

export const AdminRequestsEmpty: React.FC = () => {
  return (
    <EmptyState
      icon={<RequestsEmptyIcon />}
      title="No loan requests"
      description="All caught up! There are no pending loan requests at the moment. New requests will appear here when users apply."
      className="min-h-[300px]"
    />
  );
};
