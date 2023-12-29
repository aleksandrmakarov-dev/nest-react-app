"use client";

import { ForgotPasswordBody } from "@/components/entities/auth";
import { useForgotPassword } from "@/components/features/auth";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shared/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Form } from "@/components/shared/ui/form";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import {
  ForgotPasswordDto,
  forgotPasswordDtoSchema,
} from "@/lib/dto/auth/forgot-password.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Password recovery</CardTitle>
            <CardDescription>
              Forgot your account’s password? Enter your email address and we’ll
              send you a recovery link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess && (
              <Alert variant="success" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertTitle>Forgot password</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
            {isError && (
              <Alert variant="error" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertTitle>{error.response?.data.error}</AlertTitle>
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            <ForgotPasswordBody control={form.control} />
          </CardContent>
          <CardFooter>
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-5"
              type="submit"
            >
              Send recovery email
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
