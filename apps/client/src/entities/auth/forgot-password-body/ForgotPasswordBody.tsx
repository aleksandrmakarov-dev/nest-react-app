import { FieldController } from "@/shared";
import { Input } from "@/shared/ui/input";
import { ForgotPasswordDto } from "@/lib/dto/auth/forgot-password.dto";
import { Control } from "react-hook-form";

interface ForgotPasswordBodyProps {
  control: Control<ForgotPasswordDto>;
  isLoading?: boolean;
}

export function ForgotPasswordBody(props: ForgotPasswordBodyProps) {
  const { control, isLoading } = props;
  return (
    <>
      <FieldController
        control={control}
        name="email"
        label="Email"
        disabled={isLoading}
        render={({ field }) => <Input {...field} />}
      />
    </>
  );
}
