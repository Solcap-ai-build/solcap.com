import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from "@/components/ui/textarea";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentLinkModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [customer, setCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!customer) {
            toast({
                title: "Missing information",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.from('payment_links').insert({
                user_id: user.id,
                customer,
                description,
                amount,
                email,
            });

            if (error) {
                toast({
                    title: "Failed",
                    description: error.message,
                });
                return
            }

            toast({
                title: "Payment Link Created",
                description: `Payment Link has been Created successfully!!`,
            });

            setCustomer('');
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
                    <Label htmlFor="customer_name">Customer *</Label>
                    <Input
                        id="customer_name"
                        placeholder="Enter customer name"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="customer_email">Customer Email *</Label>
                    <Input
                        id="customer_email"
                        placeholder="Enter customer email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                

                <div className="mb-5">
                    <Label htmlFor="amount">Amount (₦) *</Label>
                    <Input
                        id="amount"
                        placeholder="eg. 5000000"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>


                <div className="mb-10 ">
                    <Label htmlFor="description">Description (optional)</Label>
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
                        {isLoading ? 'Adding...' : 'Create Payment Link'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentLinkModal;
