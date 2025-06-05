import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCustomersModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, hasCompletedOnboarding } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log(name)
            console.log(email)
            console.log(phone)


            const {data, error} = await supabase.from('customers').insert({
                parent_id: user.id,
                name: name,
                email: email,
                phone_number: phone,
            });

            if (error){
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
            <div className="bg-white p-6 rounded shadow-md w-[500px]">
                <h1 className="font-bold mb-5 text-lg">Add Customer</h1>

                <div className="mb-5">
                    <Label htmlFor="customer-name">Customer Name *</Label>
                    <Input
                        id="customer-name"
                        placeholder="Enter customer name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="customer-email">Customer Email *</Label>
                    <Input
                        id="customer-email"
                        type="email" 
                        placeholder="Enter customer email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-10 pb-10">
                    <Label htmlFor="customer-phone">Customer Phone Number *</Label>
                    <Input
                        id="customer-phone"
                        placeholder="Enter customer phone number"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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
                        {isLoading ? 'Adding...' : 'Add Customer'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCustomersModal;
