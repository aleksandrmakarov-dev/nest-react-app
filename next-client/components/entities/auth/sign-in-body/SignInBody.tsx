import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { SignInLocalDto } from "@/lib/dto/auth/sign-in-local.dto";
import { Control } from "react-hook-form";

interface SignInBodyProps {
  control: Control<SignInLocalDto>;
  isLoading?: boolean;
}

export function SignInBody(props: SignInBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        className="mb-1"
        control={control}
        name="email"
        label="Email"
        disabled={isLoading}
        render={({ field }) => <Input {...field} type="email" />}
      />
      <FieldController
        className="mb-1"
        control={control}
        name="password"
        label="Password"
        disabled={isLoading}
        render={({ field }) => <Input {...field} type="password" />}
      />
    </>
  );
}
