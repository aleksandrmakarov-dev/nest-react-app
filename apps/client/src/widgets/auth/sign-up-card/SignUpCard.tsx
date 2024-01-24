import { SignUpBody } from "@/entities/auth";
import { useSignUpLocal } from "@/features/auth";
import { FormController } from "@/shared";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/shared/ui/card";
import { LoadingButton } from "@/shared/ui/loading-button";
import {
  SignUpLocalDto,
  signUpLocalDtoSchema,
} from "@/lib/dto/auth/sign-up-local.dto";
import { routes } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SignUpCard() {
  const { mutate, isPending, isError, error } = useSignUpLocal();

  const navigate = useNavigate();

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
        navigate(routes.auth.checkEmail(values.email), {
          replace: true,
        });
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
            <a
              className="text-primary font-semibold underline"
              href={routes.auth.signIn}
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </FormController>
    </Card>
  );
}
