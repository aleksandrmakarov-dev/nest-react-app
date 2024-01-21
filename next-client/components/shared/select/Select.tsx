"use client";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { Check } from "lucide-react";

interface SelectProps<TOption> {
  options: TOption[];
  value?: string | string[];
  onChange: Dispatch<SetStateAction<any>>;
  getValue: (option: TOption) => string;
  getLabel: (option: TOption) => string;
  renderOption: (option: TOption) => React.ReactNode;
  renderInput: (value?: TOption | TOption[]) => React.ReactNode;
  limit?: number;
  close?: boolean;
  disabled?: boolean;
}

export function Select<TOption>(props: SelectProps<TOption>) {
  const {
    options,
    value,
    renderOption,
    renderInput,
    getValue,
    onChange,
    disabled,
    limit,
    close,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const isArray = Array.isArray(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center flex-wrap gap-y-1 px-3 py-1.5 min-h-10 w-full overflow-clip text-sm  rounded-md border border-input bg-background hover:cursor-pointer placeholder:text-muted-foreground [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            { "pointer-events-none": disabled }
          )}
        >
          {renderInput?.(
            isArray
              ? options.filter((o) => value.includes(getValue(o)))
              : options.find((o) => getValue(o) === value)
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-64 w-full max-w-md p-0 max-h-72 overflow-auto">
        <Command>
          <CommandGroup>
            {options.map((option) => {
              const val = getValue(option);

              const isChecked = isArray ? value.includes(val) : value === val;

              return (
                <CommandItem
                  key={val}
                  className="hover:cursor-pointer"
                  value={val}
                  onSelect={(current) => {
                    if (isArray) {
                      if (isChecked) {
                        onChange(value.filter((current) => current !== val));
                      } else {
                        if (limit && value.length >= limit) {
                          return;
                        }

                        onChange([...value, current]);
                        if (close) {
                          setOpen(false);
                        }
                      }
                    } else {
                      onChange(current);
                      if (close) {
                        setOpen(false);
                      }
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isChecked ? "opacity-100" : "opacity-0"
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
