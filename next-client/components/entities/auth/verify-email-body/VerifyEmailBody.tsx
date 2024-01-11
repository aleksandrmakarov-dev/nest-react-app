import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { VerifyEmailDto } from "@/lib/dto/auth/verify-email.dto";
import { Control } from "react-hook-form";

interface VerifyEmailBodyProps {
  control: Control<VerifyEmailDto>;
  isLoading?: boolean;
}

export function VerifyEmailBody(props: VerifyEmailBodyProps) {
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
    </>
  );
}
