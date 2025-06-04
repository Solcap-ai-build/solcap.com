
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing } from 'lucide-react';
import { NotificationsEmpty } from '@/components/empty-states';

const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <BellRing className="mr-2 h-6 w-6" /> Notifications
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationsEmpty />
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
