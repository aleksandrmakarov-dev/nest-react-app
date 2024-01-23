import { FieldController } from "@/shared";
import { Input } from "@/shared/ui/input";
import { SignUpLocalDto } from "@/lib/dto/auth/sign-up-local.dto";
import { Control } from "react-hook-form";

interface SignUpBodyProps {
  control: Control<SignUpLocalDto>;
  isLoading?: boolean;
}

export function SignUpBody(props: SignUpBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        className="mb-1"
        control={control}
        name="name"
        label="Name"
        disabled={isLoading}
        render={({ field }) => <Input {...field} />}
      />
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
        description="Must be at least 5 characters."
        disabled={isLoading}
        render={({ field }) => <Input {...field} type="password" />}
      />
    </>
  );
}
