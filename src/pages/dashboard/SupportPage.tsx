
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'

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
          {/* <CardTitle>Support Center</CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className='p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-30'>
              <h1 className='text-xl font-bold mb-3 mt-2'>Email Support</h1>
              <p className="">For general inquires or issues, email us directly at: </p>
              <p className="text-solar-green-600 mt-4 font-bold mb-5">support@getsolcap.com</p>
            </div>

            <div className='p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-30'>
              <h1 className='text-xl font-bold mb-3 mt-2'>Phone Support</h1>
              <p className="">Speak with a representative during business hours: </p>
              <p className="text-solar-green-600 mt-4 font-bold mb-5">+234 801234 5678</p>
            </div>

            <div className='p-6 bg-white rounded-lg border border-solar-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-solar-green-30'>
              <h1 className='text-xl font-bold mb-3 mt-2'>Live Chat</h1>
              <p className="">Get immediate assistance through our live chat support </p>
              <button className="mt-3 px-4 py-2 border border-solar-green-200 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                Start Chart
              </button>

            </div>

          </div>

<br />
          <hr />

          <div className="mt-10 pb-10 mb-10">
            <h1 className='text-xl font-bold mb-3 mt-2'>Submit a Support Ticket</h1>
            <p className="">Fill out the form to create a support ticket and we'll get back to you promptly.</p>

            <div className="mt-5">
              <div className="space-y-4">

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="fulll-name">Full Name *</Label>
                    <Input
                      id="fulll-name"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>


                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <Label htmlFor="financing-term">Select Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="45">45 Days</SelectItem>
                        <SelectItem value="60">60 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Type message...."
                    rows={4}
                  />
                </div>

                <button className="mt-3 px-4 py-2 border border-solar-green-200 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  Submit Ticket
                </button>

              </div>


            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
