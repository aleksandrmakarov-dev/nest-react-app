import { VerifyEmailBody } from "@/entities/auth";
import { useVerifyEmail } from "@/features/auth";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { LoadingButton } from "@/shared/ui/loading-button";
import {
  VerifyEmailDto,
  verifyEmailDtoSchema,
} from "@/lib/dto/auth/verify-email.dto";
import { routes } from "@/lib/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
                <FontAwesomeIcon icon="check-circle" className="h-5 w-5" />
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success" className="mb-3 ">
                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className="h-5 w-5"
                />
                <AlertDescription>
                  {data.message} You can{" "}
                  <a
                    className="font-semibold underline"
                    href={routes.auth.signIn}
                  >
                    sign in
                  </a>{" "}
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
                Did not receive the email?
              </span>{" "}
              <a
                className="text-primary font-semibold underline"
                href={routes.auth.signIn}
              >
                Click to resend
              </a>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
