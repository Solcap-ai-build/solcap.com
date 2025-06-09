import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

interface Business {
    name: string
    email: string
    id: string
    phone_number: string
    parent_id: string
    project_id: string
    position: string
    created_at: string
    updated_at: string
  }

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    business: Business[];
}

const AddInvoiceModal: React.FC<ModalProps> = ({ isOpen, onClose, business }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [due, setDue] = useState('');
    const [period, setPeriod] = useState('');
    const [position, setPosition] = useState('');
    const [customer, setCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, hasCompletedOnboarding } = useAuth();
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!customer || !due || !period) {
            toast({
                title: "Missing information",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.from('invoices').insert({
                user_id: user.id,
                customer,
                amount,
                due,
                description,
            });

            if (error) {
                toast({
                    title: "Failed",
                    description: error.message,
                });
                return
            }

            toast({
                title: "Customer Added",
                description: `Customer has been added successfully!!`,
            });

            setName('');
            setEmail('');
            setPhone('');
            onClose();
        } catch (error) {
            console.error('Submit error:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[580px]">
                <h1 className="font-bold mb-5 text-lg">Create Invoice</h1>

                
                <div className="mb-5">
                    <Label htmlFor="financing-term">Customer *</Label>
                    <Select value={customer} onValueChange={setCustomer}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* {business.map((project) => (
                                <SelectItem value={project.id}>{project.name}</SelectItem>
                            ))} */}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-5">
                    <Label htmlFor="amount">Amount () *</Label>
                    <Input
                        id="amount"
                        placeholder="eg. 5000000"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>



                <div className="mb-5">
                    <Label htmlFor="financing-term">Select Period *</Label>
                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select invoice period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="January">January</SelectItem>
                            <SelectItem value="February">February</SelectItem>
                            <SelectItem value="March">March</SelectItem>
                            <SelectItem value="April">April</SelectItem>
                            <SelectItem value="May">May</SelectItem>
                            <SelectItem value="June">June</SelectItem>
                            <SelectItem value="July">July</SelectItem>
                            <SelectItem value="August">August</SelectItem>
                            <SelectItem value="September">September</SelectItem>
                            <SelectItem value="October">October</SelectItem>
                            <SelectItem value="November">November</SelectItem>
                            <SelectItem value="December">December</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-5">
                    <Label htmlFor="member-phone">Due Date *</Label>
                    <Input
                        id="member-phone"
                        placeholder="Select due date"
                        type="date"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                    />
                </div>


                <div className="mb-10 ">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter invoice descrition"
                        className="h-30 w-full" />
                </div>

                <div className="flex justify-end gap-2 pb-5">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>

                    <Button
                        onClick={handleSubmit}
                        className="bg-solar-green-600 hover:bg-solar-green-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Create Invoice'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddInvoiceModal;
