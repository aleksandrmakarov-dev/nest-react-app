import { SignInBody } from "@/entities/auth";
import { useSignInLocal } from "@/features/auth";
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
import { useAuth } from "@/context/auth-provider/AuthProvider";
import {
  SignInLocalDto,
  signInLocalDtoSchema,
} from "@/lib/dto/auth/sign-in-local.dto";
import { routes } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SignInCard() {
  const { mutate, isPending, isError, error } = useSignInLocal();
  const { setSession } = useAuth();
  const navigate = useNavigate();

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
        setSession(data);
        navigate(routes.root);
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your Account</CardTitle>
        <CardDescription>
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <FormController
        form={form}
        submit={onSubmit}
        isError={isError}
        error={error?.response?.data.message}
      >
        <CardContent>
          <SignInBody control={form.control} isLoading={isPending} />
          <div className="text-end mt-2">
            <a
              className="text-sm text-primary font-semibold underline"
              href={routes.auth.forgotPassword}
            >
              Forgot password?
            </a>
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
            <a
              className="text-primary font-semibold underline"
              href={routes.auth.signUp}
            >
              Sign Up
            </a>
          </p>
        </CardFooter>
      </FormController>
    </Card>
  );
}
