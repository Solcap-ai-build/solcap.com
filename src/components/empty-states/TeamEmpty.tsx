
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { UserPlus } from 'lucide-react';

interface TeamEmptyProps {
  onInviteMember?: () => void;
}

export const TeamEmpty: React.FC<TeamEmptyProps> = ({ onInviteMember }) => {
  return (
    <EmptyState
      icon={<UserPlus className="w-16 h-16" />}
      title="No team members yet"
      description="Build your team by inviting members to collaborate on projects, share access to financial tools, and work together more efficiently."
      actionLabel="Invite Team Member"
      onAction={onInviteMember}
      className="min-h-[400px]"
    />
  );
};
