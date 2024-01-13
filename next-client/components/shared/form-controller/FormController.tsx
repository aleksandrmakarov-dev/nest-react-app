"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, AlertDescription } from "../ui/alert";
import { Form } from "../ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface FormControllerProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  submit: (data: T) => void;
  children?: React.ReactNode;
  isError?: boolean;
  error?: React.ReactNode;
  isSuccess?: boolean;
  success?: React.ReactNode;
}

export function FormController<T extends FieldValues = FieldValues>(
  props: FormControllerProps<T>
) {
  const { form, submit, children, isError, error, isSuccess, success } = props;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        {isError && (
          <Alert variant="error" className="mb-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isSuccess && (
          <Alert variant="success" className="mb-3">
            <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {children}
      </form>
    </Form>
  );
}
