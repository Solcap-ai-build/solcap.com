
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { FolderPlus } from 'lucide-react';

interface ProjectsEmptyProps {
  onCreateProject?: () => void;
}

export const ProjectsEmpty: React.FC<ProjectsEmptyProps> = ({ onCreateProject }) => {
  return (
    <EmptyState
      icon={<FolderPlus className="w-16 h-16" />}
      title="No projects yet"
      description="Organize your work by creating projects. Track expenses, manage invoices, and monitor progress all in one place."
      actionLabel="Create Project"
      onAction={onCreateProject}
      className="min-h-[400px]"
    />
  );
};
