"use client";
import { SignInBody } from "@/components/entities/auth";
import { useSignInLocal } from "@/components/features/auth";
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
import { useAuth } from "@/context/auth-provider/AuthProvider";
import {
  SignInLocalDto,
  signInLocalDtoSchema,
} from "@/lib/dto/auth/sign-in-local.dto";
import { Routing } from "@/lib/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignInCard() {
  const { mutate, isPending, isError, error } = useSignInLocal();
  const { setUser } = useAuth();
  const router = useRouter();

  const form = useForm<SignInLocalDto>({
    resolver: zodResolver(signInLocalDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInLocalDto) {
    mutate(values, {
      onSuccess: (data) => {
        form.reset();
        setUser(data);
        router.push("/users");
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>Sign in to your Account</CardTitle>
            <CardDescription>
              Welcome back! Please enter your details.
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
            <SignInBody control={form.control} isLoading={isPending} />
            <div className="text-end mt-2">
              <Link
                className="text-sm text-primary font-semibold underline"
                href={Routing.auth.forgotPassword}
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-5"
              type="submit"
            >
              Sign in
            </LoadingButton>
            <p className="text-muted-foreground text-sm">
              Don’t have an account yet?{" "}
              <Link
                className="text-primary font-semibold underline"
                href={Routing.auth.signUp}
                replace
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
