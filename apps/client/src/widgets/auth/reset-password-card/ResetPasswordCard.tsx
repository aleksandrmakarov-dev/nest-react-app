import { ResetPasswordBody } from "@/entities/auth";
import { useResetPassword } from "@/features/auth";
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
  ResetPasswordDto,
  resetPasswordDtoSchema,
} from "@/lib/dto/auth/reset-password.dto";
import { routes } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ResetPasswordCardProps {
  token?: string;
}

export function ResetPasswordCard(props: ResetPasswordCardProps) {
  const { token } = props;

  const { mutate, isPending, isError, error, isSuccess } = useResetPassword();

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
      <CardHeader>
        <CardTitle className="text-center">Reset password</CardTitle>
        <CardDescription>
          Your new password must be different to your previously used password
          and be at least 5 characters.
        </CardDescription>
      </CardHeader>
      <FormController
        form={form}
        submit={onSubmit}
        isError={isError}
        error={error?.response?.data.message}
        isSuccess={isSuccess}
        success={
          <p>
            Your password has been reset, you can{" "}
            <a className="font-semibold underline" href={routes.auth.signIn}>
              sign in
            </a>{" "}
            with new password.
          </p>
        }
      >
        <CardContent>
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
      </FormController>
    </Card>
  );
}
