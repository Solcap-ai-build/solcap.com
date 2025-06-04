
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

const SupportPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <HelpCircle className="mr-2 h-6 w-6" /> Support
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<HelpCircle className="w-16 h-16" />}
            title="Need help?"
            description="Get assistance with your account, billing, or technical issues. Our support team is here to help you succeed."
            actionLabel="Contact Support"
            onAction={() => console.log('Contacting support...')}
            className="min-h-[400px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
