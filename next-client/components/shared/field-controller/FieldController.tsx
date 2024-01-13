"use client";
import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

interface FieldControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

export function FieldController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FieldControllerProps<TFieldValues, TName>) {
  const { label, description, required, className, render, ...other } = props;

  return (
    <FormField
      render={(value) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
          )}
          <FormControl>{render(value)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
      {...other}
    />
  );
}
