import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddProjectModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [client, setClient] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [teams, setTeams] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, hasCompletedOnboarding } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!name || !client || !start || !end) {
            toast({
                title: "Missing information",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.from('projects').insert({
                owner_id: user.id,
                name,
                client,
                start,
                end,
                description,
                status: "pending",
            });

            if (error) {
                toast({
                    title: "Failed",
                    description: error.message,
                });
                return
            }

            toast({
                title: "Project Created",
                description: `Project created successfully!!`,
            });

            setName('');
            setDescription('');
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
                <h1 className="font-bold mb-5 text-lg">Add Project</h1>

                <div className="mb-5">
                    <Label htmlFor="member-name">Project Name *</Label>
                    <Input
                        id="member-name"
                        placeholder="Enter project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="client-name">Client *</Label>
                    <Input
                        id="client-name"
                        placeholder="Enter client name"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="start_dt">Start Date *</Label>
                    <Input
                        id="start_dt"
                        placeholder="Select start date"
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="end_dt">End Date *</Label>
                    <Input
                        id="end_dt"
                        placeholder="Select end date"
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <Label htmlFor="member-email">Description*</Label>
                    <Textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your project activities"
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
                        {isLoading ? 'Adding...' : 'Create Project'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddProjectModal;
