
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankSelect } from "@/components/ui/bank-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompanySettingsForm = () => {
  const { toast } = useToast();
  
  // Basic information state
  const [companyName, setCompanyName] = useState("Your Solar Company Ltd");
  const [email, setEmail] = useState("admin@example.com");
  const [phoneNumber, setPhoneNumber] = useState("08104916504");
  const [address, setAddress] = useState("Ikoyi, Lagos");
  const [tin, setTin] = useState("222222");
  const [nin, setNin] = useState("22222");
  const [rcNumber, setRcNumber] = useState("608080");
  const [employeeCount, setEmployeeCount] = useState("1-10");
  
  // Bank details state
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSaveBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Company information updated",
      description: "Your company information has been saved successfully."
    });
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Bank details updated",
      description: "Your bank details have been saved successfully."
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Information</TabsTrigger>
        <TabsTrigger value="bank">Bank Details</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Manage your company's basic information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveBasicInfo} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Select 
                    value={employeeCount}
                    onValueChange={setEmployeeCount}
                  >
                    <SelectTrigger id="employees">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                  <Input 
                    id="tin" 
                    value={tin} 
                    onChange={(e) => setTin(e.target.value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nin">National Identification Number (NIN)</Label>
                  <Input 
                    id="nin" 
                    value={nin} 
                    onChange={(e) => setNin(e.target.value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rc-number">RC Number</Label>
                  <Input 
                    id="rc-number" 
                    value={rcNumber} 
                    onChange={(e) => setRcNumber(e.target.value)} 
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4 bg-solar-green-600 hover:bg-solar-green-700">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bank">
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
            <CardDescription>
              Add your bank details for payments and withdrawals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveBankDetails} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <BankSelect 
                  value={bankName} 
                  onChange={setBankName} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input 
                  id="account-number" 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  maxLength={10}
                  minLength={10}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input 
                  id="account-name" 
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="mt-4 bg-solar-green-600 hover:bg-solar-green-700">
                Save Bank Details
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}

              <Button type="submit" className="mt-4 bg-solar-green-600 hover:bg-solar-green-700">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CompanySettingsForm;
