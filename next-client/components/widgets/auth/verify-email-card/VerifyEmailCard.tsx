"use client";
import { VerifyEmailBody } from "@/components/entities/auth";
import { useVerifyEmail } from "@/components/features/auth";
import { Alert, AlertDescription } from "@/components/shared/ui/alert";
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
  VerifyEmailDto,
  verifyEmailDtoSchema,
} from "@/lib/dto/auth/verify-email.dto";
import { Routing } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

interface VerifyEmailCardProps {
  token?: string;
  email?: string;
}

export function VerifyEmailCard(props: VerifyEmailCardProps) {
  const { token, email } = props;

  const { mutate, isPending, isError, error, isSuccess, data } =
    useVerifyEmail();

  const form = useForm<VerifyEmailDto>({
    resolver: zodResolver(verifyEmailDtoSchema),
    defaultValues: {
      token: "",
    },
    values: {
      token: token ?? "",
    },
  });

  function onSumbit(values: VerifyEmailDto) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)}>
          <CardHeader className="text-center">
            <CardTitle>Verify email</CardTitle>
            <CardDescription>
              We sent a verification link to{" "}
              <span className="font-semibold">
                {email ?? "your email address"}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert variant="error" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success" className="mb-3 ">
                <MdCheckCircleOutline className="h-5 w-5 " />
                <AlertDescription>
                  {data.message} You can{" "}
                  <Link
                    className="font-semibold underline"
                    href={Routing.auth.signIn}
                    replace
                  >
                    sign in
                  </Link>{" "}
                  now.
                </AlertDescription>
              </Alert>
            )}
            <VerifyEmailBody control={form.control} isLoading={isPending} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoadingButton className="w-full mb-3" loading={isPending}>
              Verify email
            </LoadingButton>
            <p className="text-sm">
              <span className="text-muted-foreground">
                Didn't receive the email?
              </span>{" "}
              <Link
                className="text-primary font-semibold underline"
                href={Routing.auth.signIn}
              >
                Click to resend
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
