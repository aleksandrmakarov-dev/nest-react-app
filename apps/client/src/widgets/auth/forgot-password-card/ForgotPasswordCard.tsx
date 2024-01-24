"use client";

import { ForgotPasswordBody } from "@/entities/auth";
import { useForgotPassword } from "@/features/auth";
import { FormController } from "@/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { LoadingButton } from "@/shared/ui/loading-button";
import {
  ForgotPasswordDto,
  forgotPasswordDtoSchema,
} from "@/lib/dto/auth/forgot-password.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ForgotPasswordCard() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useForgotPassword();

  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordDtoSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordDto) {
    mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Password recovery</CardTitle>
        <CardDescription>
          No worries, we will send you reset instructions.
        </CardDescription>
      </CardHeader>
      <FormController
        form={form}
        submit={onSubmit}
        isError={isError}
        error={error?.response?.data.message}
        isSuccess={isSuccess}
        success={data?.message}
      >
        <CardContent>
          <ForgotPasswordBody control={form.control} isLoading={isPending} />
        </CardContent>
        <CardFooter className="flex flex-col">
          <LoadingButton
            disabled={isPending}
            loading={isPending}
            className="w-full mb-3"
            type="submit"
          >
            Reset password
          </LoadingButton>
        </CardFooter>
      </FormController>
    </Card>
  );
}
