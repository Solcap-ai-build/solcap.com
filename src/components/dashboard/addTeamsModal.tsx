import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddTeamsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [project, setProject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, hasCompletedOnboarding } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!name || !email || !phone || !position) {
            toast({
              title: "Missing information",
              description: "Please fill in all required fields",
              variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        toast({
            title: "Failed",
            description: `Fail to add team member!!`,
        });

        setIsLoading(false);

        return 

        try {
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
            <div className="bg-white p-6 rounded shadow-md w-[380px]">
                <h1 className="font-bold mb-5 text-lg">Add Team Member</h1>

                <div className="mb-5">
                    <Label htmlFor="member-name">Team Member Name *</Label>
                    <Input
                        id="member-name"
                        placeholder="Enter team member name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="member-email">Email Address *</Label>
                    <Input
                        id="member-email"
                        type="email" 
                        placeholder="Enter Team Member email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="member-phone">Phone Number *</Label>
                    <Input
                        id="member-phone"
                        placeholder="Enter team member phone number"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="member-postion">Postion *</Label>
                    <Input
                        id="member-postion"
                        placeholder="Enter team member position"
                        type="number"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>

                <div className="mb-10 pb-10">
                    <Label htmlFor="financing-term">Select Project *</Label>
                    <Select value={project} onValueChange={setProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                      </SelectContent>
                    </Select>
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
                        {isLoading ? 'Adding...' : 'Add Team Member'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTeamsModal;
