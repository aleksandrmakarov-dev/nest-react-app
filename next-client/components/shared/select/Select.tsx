"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction, useState } from "react";

interface SelectProps<T> {
  options: T[];
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  getValue: (option: T) => string;
  getLabel: (option: T) => string;
  renderOption: (option: T) => React.ReactNode;
  renderValue: (option: T) => React.ReactNode;
  limit?: number;
  closeAfterSelect?: boolean;
  disabled?: boolean;
}

export function Select<T>(props: SelectProps<T>) {
  const {
    options,
    value,
    onChange,
    getValue,
    getLabel,
    renderOption,
    renderValue,
    limit,
    closeAfterSelect,
    disabled,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center min-h-10 w-full overflow-clip rounded-md border border-input bg-background hover:cursor-pointer placeholder:text-muted-foreground [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            { "pointer-events-none": disabled }
          )}
        >
          <div className="flex flex-wrap gap-1 px-4 py-2">
            {value.map((item) => {
              const option = options.find((op) => getValue(op) === item);
              if (!option) return null;
              return renderValue(option);
            })}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-64 w-full max-w-md p-0 max-h-72 overflow-auto">
        <Command>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options
              .filter((v) => getValue(v).includes(search))
              .map((option) => {
                const optionValue = getValue(option);
                const optionLabel = getLabel(option);

                return (
                  <CommandItem
                    className="hover:cursor-pointer"
                    key={optionLabel}
                    value={optionValue}
                    onSelect={(currentValue) => {
                      if (value.includes(currentValue)) {
                        onChange((prev) =>
                          prev.filter((v) => v !== currentValue)
                        );
                      } else {
                        if (limit && value.length >= limit) {
                          return;
                        }

                        onChange((prev) => [...prev, currentValue]);
                      }

                      if (closeAfterSelect) {
                        setOpen(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(optionValue)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {renderOption(option)}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
