
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Amount must be a positive number" }
  ),
  dueDate: z.string().min(1, "Due date is required")
});

type CreateInvoiceFormProps = {
  onSubmit: (values: any) => void;
};

const CreateInvoiceForm = ({ onSubmit }: CreateInvoiceFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      amount: "",
      dueDate: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      customer: values.customer,
      amount: Number(values.amount),
      dueDate: values.dueDate
    });
    
    toast({
      title: "Invoice Created",
      description: "Your invoice has been successfully created."
    });
    
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SunEnergy Corp">SunEnergy Corp</SelectItem>
                  <SelectItem value="PowerTech Solutions">PowerTech Solutions</SelectItem>
                  <SelectItem value="Green Solutions Ltd">Green Solutions Ltd</SelectItem>
                  <SelectItem value="Solar Dynamics">Solar Dynamics</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₦)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 500000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="submit" className="bg-solar-green-600 hover:bg-solar-green-700">
            Create Invoice
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateInvoiceForm;
