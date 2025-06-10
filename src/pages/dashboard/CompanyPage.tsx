
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Edit, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OnboardingData {
  business_name: string;
  business_email: string;
  phone_number: string;
  address: string;
  business_description?: string;
  company_type?: string;
  year_of_incorporation?: number;
  state?: string;
  city?: string;
  rc_number?: string;
  nin?: string;
  status: string;
  director_full_name?: string;
  director_email?: string;
  director_phone?: string;
  director_address?: string;
}

const CompanyPage = () => {
  const { user, hasCompletedOnboarding } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('business_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching onboarding data:', error);
        } else if (data) {
          setOnboardingData(data);
        }
      } catch (error) {
        console.error('Error in fetchOnboardingData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboardingData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2 h-6 w-6" /> Company
          </h1>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-green-600"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!onboardingData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2 h-6 w-6" /> Company
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Building2 className="w-16 h-16" />}
              title="Company profile not set up"
              description="Complete your company profile to unlock all features including credit evaluation, invoicing, and business verification."
              actionLabel="Complete Profile"
              onAction={() => window.location.href = '/onboarding'}
              className="min-h-[400px]"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Building2 className="mr-2 h-6 w-6" /> Company Profile
        </h1>
        <Button variant="outline" onClick={() => window.location.href = '/onboarding'}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Company Information
              <Badge variant={onboardingData.status === 'completed' ? 'default' : 'secondary'}>
                {onboardingData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-semibold">{onboardingData.business_name}</p>
                <p className="text-sm text-gray-600">{onboardingData.company_type}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-gray-600">{onboardingData.address}</p>
                {onboardingData.city && onboardingData.state && (
                  <p className="text-sm text-gray-600">{onboardingData.city}, {onboardingData.state}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-600">{onboardingData.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">{onboardingData.business_email}</p>
              </div>
            </div>

            {onboardingData.year_of_incorporation && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Year of Incorporation</p>
                  <p className="text-sm text-gray-600">{onboardingData.year_of_incorporation}</p>
                </div>
              </div>
            )}

            {onboardingData.rc_number && (
              <div className="space-y-2">
                <p className="font-medium">RC Number</p>
                <p className="text-sm text-gray-600">{onboardingData.rc_number}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Director Information */}
        {onboardingData.director_full_name && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Director Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Full Name</p>
                <p className="text-sm text-gray-600">{onboardingData.director_full_name}</p>
              </div>

              {onboardingData.director_email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">{onboardingData.director_email}</p>
                  </div>
                </div>
              )}

              {onboardingData.director_phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">{onboardingData.director_phone}</p>
                  </div>
                </div>
              )}

              {onboardingData.director_address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">{onboardingData.director_address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Business Description */}
        {onboardingData.business_description && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Business Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{onboardingData.business_description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
