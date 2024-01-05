"use client";
import { SignUpBody } from "@/components/entities/auth";
import { useSignUpLocal } from "@/components/features/auth";
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
  SignUpLocalDto,
  signUpLocalDtoSchema,
} from "@/lib/dto/auth/sign-up-local.dto";
import { Routing } from "@/lib/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignUpCard() {
  const { mutate, isPending, isError, error } = useSignUpLocal();

  const router = useRouter();

  const form = useForm<SignUpLocalDto>({
    resolver: zodResolver(signUpLocalDtoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpLocalDto) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        router.replace(Routing.auth.checkEmail(values.email));
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>Create your Account</CardTitle>
            <CardDescription>
              Create an account to use all features of website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert variant="error" className="mb-3">
                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className="h-5 w-5"
                />
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            <SignUpBody control={form.control} isLoading={isPending} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-5"
              type="submit"
            >
              Create an account
            </LoadingButton>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                className="text-primary font-semibold underline"
                href={Routing.auth.signIn}
                replace
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
