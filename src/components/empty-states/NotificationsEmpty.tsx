
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { Bell } from 'lucide-react';

export const NotificationsEmpty: React.FC = () => {
  return (
    <EmptyState
      icon={<Bell className="w-16 h-16" />}
      title="No notifications"
      description="You're all caught up! New notifications about transactions, payments, and account updates will appear here."
      className="min-h-[400px]"
    />
  );
};
