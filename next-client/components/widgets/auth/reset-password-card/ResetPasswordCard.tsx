"use client";
import { ResetPasswordBody } from "@/components/entities/auth";
import { useResetPassword } from "@/components/features/auth";
import { Alert, AlertDescription } from "@/components/shared/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
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
            <CardDescription>
              Your new password must be different to your previously used
              password and be at least 5 characters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess && (
              <Alert variant="success" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertDescription>
                  {data.message}. You can{" "}
                  <Link
                    className="font-semibold underline"
                    href={Routing.auth.signIn}
                  >
                    sign in
                  </Link>{" "}
                  with new password.
                </AlertDescription>
              </Alert>
            )}
            {isError && (
              <Alert variant="error" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
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
