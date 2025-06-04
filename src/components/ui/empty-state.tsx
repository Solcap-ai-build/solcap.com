
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-4 text-center",
      "bg-gray-50/50 rounded-lg border border-gray-100",
      className
    )}>
      <div className="mb-6 opacity-60 animate-pulse">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-solar-green-600 hover:bg-solar-green-700"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
