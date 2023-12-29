"use client";
import { ResetPasswordBody } from "@/components/entities/auth";
import { useResetPassword } from "@/components/features/auth";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shared/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { Form } from "@/components/shared/ui/form";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import {
  ResetPasswordDto,
  resetPasswordDtoSchema,
} from "@/lib/dto/auth/reset-password.dto";
import { Routing } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { isError } from "util";

interface ResetPasswordCardProps {
  token?: string;
}

export function ResetPasswordCard(props: ResetPasswordCardProps) {
  const { token } = props;

  const { mutate, isPending, isError, error, isSuccess, data } =
    useResetPassword();

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordDtoSchema),
    defaultValues: {
      newPassword: "",
      token: "",
    },
    values: {
      newPassword: "",
      token: token ?? "",
    },
  });

  function onSubmit(values: ResetPasswordDto) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-center">Reset password</CardTitle>
          </CardHeader>
          <CardContent>
            {isSuccess && (
              <Alert variant="success" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertTitle>Reset password</AlertTitle>
                <AlertDescription>
                  {data.message}{" "}
                  <Link className="font-semibold" href={Routing.auth.signIn()}>
                    Sign in
                  </Link>
                </AlertDescription>
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
            <ResetPasswordBody control={form.control} isLoading={isPending} />
          </CardContent>
          <CardFooter>
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-5"
              type="submit"
            >
              Set new password
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
