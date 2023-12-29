import FieldController from "@/components/shared/field-controller/FieldController";
import { Input } from "@/components/shared/ui/input";
import { ResetPasswordDto } from "@/lib/dto/auth/reset-password.dto";
import { Control } from "react-hook-form";

interface ResetPasswordBodyProps {
  control: Control<ResetPasswordDto>;
  isLoading?: boolean;
}

export function ResetPasswordBody(props: ResetPasswordBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        control={control}
        name="token"
        label="Token"
        disabled={isLoading}
        render={({ field }) => <Input {...field} />}
      />
      <FieldController
        control={control}
        name="newPassword"
        label="New password"
        disabled={isLoading}
        render={({ field }) => <Input {...field} type="password" />}
      />
    </>
  );
}
