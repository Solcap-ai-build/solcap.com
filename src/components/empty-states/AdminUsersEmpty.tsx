
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { UsersEmptyIcon } from '@/components/icons/fintech-icons';

export const AdminUsersEmpty: React.FC = () => {
  return (
    <EmptyState
      icon={<UsersEmptyIcon />}
      title="No users found"
      description="No users match your current search criteria. Try adjusting your filters or check back later as new users join the platform."
      className="min-h-[300px]"
    />
  );
};
