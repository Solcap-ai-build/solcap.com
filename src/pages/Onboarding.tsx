
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Building, Upload, FileText, User, CreditCard, Banknote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const onboardingSchema = z.object({
  // Personal Information
  bvn: z.string().min(11, "BVN must be 11 digits").max(11, "BVN must be 11 digits"),

  // Company Information (Steps 1-6)
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  rcNumber: z.string().min(1, "RC Number is required"),
  ninIdNumber: z.string().min(11, "NIN must be 11 digits").max(11, "NIN must be 11 digits"),
  companyType: z.string().min(1, "Company type is required"),
  bizType: z.string().min(1, "Company type is required"),
  yearOfIncorporation: z.string().min(4, "Year is required"),
  businessDescription: z.string().min(10, "Business description must be at least 10 characters"),

  // Company Contact Information
  businessPhoneNumber: z.string().min(11, "Phone number must be at least 11 characters"),
  companyAddress: z.string().min(5, "Address must be at least 5 characters"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),

  // Director Information (Step 7)
  directorBvn: z.string().min(11, "Director BVN must be 11 digits").max(11, "Director BVN must be 11 digits"),
  directorPhoneNumber: z.string().min(11, "Phone number must be at least 11 characters"),
  directorFullName: z.string().min(2, "Full name must be at least 2 characters"),
  directorGender: z.string().min(1, "Gender is required"),
  directorDateOfBirth: z.string().min(1, "Date of birth is required"),
  directorEmail: z.string().email("Please enter a valid email address"),
  directorAddress: z.string().min(5, "Address must be at least 5 characters"),

  // Documents (Step 8) - Made optional for now
  cacDocument: z.instanceof(FileList).optional().transform(fileList => {
    return fileList && fileList.length > 0 ? fileList : undefined;
  }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, checkOnboardingStatus } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      bvn: "",
      businessName: "",
      rcNumber: "",
      ninIdNumber: "",
      companyType: "",
      bizType: "",
      yearOfIncorporation: "",
      businessDescription: "",
      businessPhoneNumber: "",
      companyAddress: "",
      state: "",
      city: "",
      directorBvn: "",
      directorPhoneNumber: "",
      directorFullName: "",
      directorGender: "",
      directorDateOfBirth: "",
      directorEmail: user?.email || "",
      directorAddress: "",
    },
  });

  const isStep1Complete = () => {
    const values = form.getValues();
    const errors = form.formState.errors;

    // Check if all required step 1 fields are filled and have no errors
    const requiredFields = [
      'bvn', 'businessName', 'rcNumber', 'ninIdNumber',
      'companyType', 'yearOfIncorporation', 'businessDescription',
      'businessPhoneNumber', 'companyAddress', 'state', 'city', "bizType"
    ];

    const isComplete = requiredFields.every(field => {
      const value = values[field as keyof typeof values];
      const hasError = errors[field as keyof typeof errors];
      return value && value.toString().trim() !== '' && !hasError;
    });

    return isComplete;
  };

  const isStep2Complete = () => {
    const values = form.getValues();
    const errors = form.formState.errors;

    const requiredFields = [
      'directorBvn', 'directorPhoneNumber', 'directorFullName',
      'directorGender', 'directorDateOfBirth', 'directorEmail',
      'directorAddress'
    ];

    const isComplete = requiredFields.every(field => {
      const value = values[field as keyof typeof values];
      const hasError = errors[field as keyof typeof errors];
      return value && value.toString().trim() !== '' && !hasError;
    });

    return isComplete;
  };

  const isStep3Complete = () => {
    // Make documents optional for now to avoid blocking users
    return true;
  };

  const onboardingSteps = [
    {
      id: 1,
      title: "Company & Personal Information",
      description: "Complete your BVN verification and business details",
      icon: <Building />,
      completed: isStep1Complete(),
    },
    {
      id: 2,
      title: "Director Information",
      description: "Provide director's personal information",
      icon: <User />,
      completed: isStep2Complete(),
    },
    {
      id: 3,
      title: "Document Upload",
      description: "Upload required business documents (optional)",
      icon: <Upload />,
      completed: isStep3Complete(),
    },
  ];

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      const step1Fields = [
        'bvn', 'businessName', 'rcNumber', 'ninIdNumber',
        'companyType', 'yearOfIncorporation', 'businessDescription',
        'businessPhoneNumber', 'companyAddress', 'state', 'city'
      ];

      const isValid = await form.trigger(step1Fields as any);
      if (isValid && isStep1Complete()) {
        setCurrentStep(2);
      } else {
        toast.error("Please complete all required fields correctly");
      }
    } else if (currentStep === 2) {
      // Validate step 2 fields
      const step2Fields = [
        'directorBvn', 'directorPhoneNumber', 'directorFullName',
        'directorGender', 'directorDateOfBirth', 'directorEmail',
        'directorAddress'
      ];

      const isValid = await form.trigger(step2Fields as any);
      if (isValid && isStep2Complete()) {
        setCurrentStep(3);
      } else {
        toast.error("Please complete all required fields correctly");
      }
    }
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    if (!user) {
      toast.error("You must be logged in to complete onboarding");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting onboarding data for user:', user.id);

      // Check if onboarding already exists
      const { data: existingOnboarding } = await supabase
        .from('business_onboarding')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const onboardingData = {
        business_name: data.businessName,
        business_email: data.directorEmail,
        phone_number: data.businessPhoneNumber,
        address: data.companyAddress,
        nin: data.ninIdNumber,
        rc_number: data.rcNumber,
        status: 'completed',
        bvn: data.bvn,
        company_type: data.companyType,
        year_of_incorporation: parseInt(data.yearOfIncorporation),
        business_description: data.businessDescription,
        state: data.state,
        city: data.city,
        director_bvn: data.directorBvn,
        director_phone: data.directorPhoneNumber,
        director_full_name: data.directorFullName,
        director_gender: data.directorGender,
        director_date_of_birth: data.directorDateOfBirth,
        director_email: data.directorEmail,
        director_address: data.directorAddress,
        updated_at: new Date().toISOString()
      };

      if (existingOnboarding) {
        // Update existing onboarding record
        const { error } = await supabase
          .from('business_onboarding')
          .update(onboardingData)
          .eq('user_id', user.id);

        if (error) {
          console.error('Onboarding update error:', error);
          throw error;
        }
      } else {
        // Create new onboarding record
        const { error } = await supabase
          .from('business_onboarding')
          .insert({
            user_id: user.id,
            ...onboardingData
          });

        if (error) {
          console.error('Onboarding database error:', error);
          throw error;
        }
      }

      console.log('Onboarding data saved successfully');

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company_name: data.businessName,
          phone_number: data.businessPhoneNumber,
          address: data.companyAddress,
          full_name: data.directorFullName
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // Don't throw here, onboarding is complete even if profile update fails
      }

      // Update the onboarding status in the auth context
      await checkOnboardingStatus();

      toast.success("KYC/KYB completed successfully! Welcome to SolCap.");

      // Navigate to setup complete page
      navigate("/setup-complete");
    } catch (error) {
      console.error("Onboarding error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to complete KYC/KYB";
      toast.error(`Onboarding failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-solar-green-600 rounded-md flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-solar-green-700">SolCap</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Progress Steps Sidebar */}
          <div className="lg:col-span-1">
            <OnboardingSteps currentStep={currentStep} steps={onboardingSteps} />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your KYC & KYB</CardTitle>
                <CardDescription>
                  Know Your Customer (KYC) and Know Your Business (KYB) verification is required to get started with SolCap
                </CardDescription>

                <Tabs value={`step-${currentStep}`} onValueChange={(value) => setCurrentStep(parseInt(value.split('-')[1]))}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="step-1">Company & Personal</TabsTrigger>
                    <TabsTrigger value="step-2" disabled={!isStep1Complete()}>Director Info</TabsTrigger>
                    <TabsTrigger value="step-3" disabled={!isStep2Complete()}>Documents</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Banknote className="mr-2 h-5 w-5" />
                            Personal Verification
                          </h3>
                          <FormField
                            control={form.control}
                            name="bvn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank Verification Number (BVN)*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your 11-digit BVN" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Building className="mr-2 h-5 w-5" />
                            Company Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Name*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter business name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="bizType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Type*</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select business type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Solar Installer">Solar Installer</SelectItem>
                                      <SelectItem value="Solar Vendor">Solar Vendor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />


                            <FormField
                              control={form.control}
                              name="rcNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>RC Number*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter RC Number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="ninIdNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>NIN ID Number*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter 11-digit NIN" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="companyType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Type*</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select company type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="ltd">Limited (Ltd)</SelectItem>
                                      <SelectItem value="plc">Public Limited Company (PLC)</SelectItem>
                                      <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                                      <SelectItem value="enterprise">Enterprise</SelectItem>
                                      <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="yearOfIncorporation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Incorporation*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2020" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="businessPhoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Phone Number*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter business phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <br />
                          <hr />
                          <br />

                          <FormField
                            control={form.control}
                            name="businessDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Description*</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Describe your business activities" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <br />
                        <hr />
                        <br />

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-4">Company Address</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="companyAddress"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Address*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter company address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State/Region*</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {nigerianStates.map((state) => (
                                        <SelectItem key={state} value={state.toLowerCase()}>
                                          {state}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            type="button"
                            className="w-full bg-solar-green-600 hover:bg-solar-green-700"
                            onClick={handleNextStep}
                            disabled={!isStep1Complete()}
                          >
                            Next: Director Information
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          Director Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="directorBvn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Director's BVN*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter director's BVN" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="directorPhoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Director's Phone Number*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="directorFullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Director's Full Name*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="directorGender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender*</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="directorDateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth*</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="directorEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address*</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="directorAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Director's Address*</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter director's address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setCurrentStep(1)}
                          >
                            Previous
                          </Button>
                          <Button
                            type="button"
                            className="w-full bg-solar-green-600 hover:bg-solar-green-700"
                            onClick={handleNextStep}
                            disabled={!isStep2Complete()}
                          >
                            Next: Documents
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Required Documents (Optional)
                        </h3>

                        <FormField
                          control={form.control}
                          name="cacDocument"
                          render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                              <FormLabel>CAC Document Upload (Optional)</FormLabel>
                              <FormControl>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-solar-green-500 transition-colors">
                                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-600 text-center mb-2">
                                    Upload CAC registration document
                                  </p>
                                  <p className="text-xs text-gray-500 text-center mb-4">
                                    PDF, JPG or PNG up to 5MB (Optional - you can upload this later)
                                  </p>
                                  <Input
                                    id="cacDocument"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => onChange(e.target.files)}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    {...rest}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('cacDocument')?.click()}
                                  >
                                    Select File
                                  </Button>
                                  {form.watch('cacDocument') && form.watch('cacDocument')?.[0] && (
                                    <p className="mt-2 text-sm text-solar-green-600">
                                      {form.watch('cacDocument')[0].name}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setCurrentStep(2)}
                          >
                            Previous
                          </Button>
                          <Button
                            type="submit"
                            className="w-full bg-solar-green-600 hover:bg-solar-green-700"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Completing KYC/KYB..." : "Complete KYC/KYB"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
