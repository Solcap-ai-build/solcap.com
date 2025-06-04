
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Users, Shield, UserCheck, UserX } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string;
  role: UserRole;
  profile: {
    full_name: string;
    company_name: string;
    phone_number: string;
  };
  onboarding: {
    status: string;
    business_name: string;
  };
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Fetch users with their roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role
        `);

      if (rolesError) throw rolesError;

      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Fetch onboarding data
      const { data: onboarding, error: onboardingError } = await supabase
        .from('business_onboarding')
        .select('*');

      if (onboardingError) throw onboardingError;

      // Combine the data
      const combinedUsers = userRoles.map(userRole => {
        const profile = profiles.find(p => p.id === userRole.user_id);
        const userOnboarding = onboarding.find(o => o.user_id === userRole.user_id);
        
        return {
          id: userRole.user_id,
          email: profile?.id || '',
          created_at: profile?.created_at || '',
          email_confirmed_at: '',
          role: userRole.role,
          profile: {
            full_name: profile?.full_name || '',
            company_name: profile?.company_name || '',
            phone_number: profile?.phone_number || '',
          },
          onboarding: {
            status: userOnboarding?.status || 'not_started',
            business_name: userOnboarding?.business_name || '',
          }
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('User role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
      case 'super-admin':
        return 'destructive';
      case 'technician':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading users...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Onboarding Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.profile.full_name || 'No name'}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground">{user.profile.phone_number}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.onboarding.business_name || user.profile.company_name || 'Not set'}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.onboarding.status)}>
                      {user.onboarding.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: UserRole) => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
