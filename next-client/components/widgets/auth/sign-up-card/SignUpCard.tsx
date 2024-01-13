"use client";
import { SignUpBody } from "@/components/entities/auth";
import { useSignUpLocal } from "@/components/features/auth";
import { FormController } from "@/components/shared";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/shared/ui/card";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import {
  SignUpLocalDto,
  signUpLocalDtoSchema,
} from "@/lib/dto/auth/sign-up-local.dto";
import { routes } from "@/lib/routing";
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
        router.replace(routes.auth.checkEmail(values.email));
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Create your Account</CardTitle>
        <CardDescription>
          Create an account to use all features of website.
        </CardDescription>
      </CardHeader>
      <FormController
        form={form}
        submit={onSubmit}
        isError={isError}
        error={error?.response?.data.message}
      >
        <CardContent>
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
              href={routes.auth.signIn}
              replace
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </FormController>
    </Card>
  );
}
