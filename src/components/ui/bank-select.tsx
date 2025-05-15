
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// List of Nigerian banks
const banks = [
  { value: "access", label: "Access Bank" },
  { value: "citibank", label: "Citibank Nigeria" },
  { value: "ecobank", label: "Ecobank Nigeria" },
  { value: "fidelity", label: "Fidelity Bank" },
  { value: "fcmb", label: "First City Monument Bank" },
  { value: "fsdh", label: "FSDH Merchant Bank" },
  { value: "gtbank", label: "Guaranty Trust Bank" },
  { value: "heritage", label: "Heritage Bank" },
  { value: "keystone", label: "Keystone Bank" },
  { value: "polaris", label: "Polaris Bank" },
  { value: "providus", label: "Providus Bank" },
  { value: "stanbic", label: "Stanbic IBTC Bank" },
  { value: "standard-chartered", label: "Standard Chartered Bank" },
  { value: "sterling", label: "Sterling Bank" },
  { value: "suntrust", label: "SunTrust Bank" },
  { value: "titan", label: "Titan Trust Bank" },
  { value: "union", label: "Union Bank of Nigeria" },
  { value: "uba", label: "United Bank for Africa" },
  { value: "unity", label: "Unity Bank" },
  { value: "wema", label: "Wema Bank" },
  { value: "zenith", label: "Zenith Bank" },
];

interface BankSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function BankSelect({ value, onChange }: BankSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedBank = banks.find((bank) => bank.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedBank ? selectedBank.label : "Select bank..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search banks..." />
          <CommandEmpty>No bank found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {banks.map((bank) => (
              <CommandItem
                key={bank.value}
                value={bank.value}
                onSelect={() => {
                  onChange(bank.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bank.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {bank.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
