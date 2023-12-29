"use client";
import { SignInBody } from "@/components/entities/auth";
import { useSignInLocal } from "@/components/features/auth";
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
  SignInLocalDto,
  signInLocalDtoSchema,
} from "@/lib/dto/auth/sign-in-local.dto";
import { Routing } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

export function SignInCard() {
  const { mutate, isPending, isError, error } = useSignInLocal();

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
        console.log(data);
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-center">
              Sign in to your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert variant="error" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertTitle>{error.response?.data.error}</AlertTitle>
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            <SignInBody control={form.control} isLoading={isPending} />
            <div className="text-end mt-2">
              <Link
                className="text-sm text-primary font-semibold hover:underline"
                href={Routing.auth.forgotPassword()}
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
                className="text-primary font-semibold hover:underline"
                href={Routing.auth.signUp()}
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
