import FieldController from "@/components/shared/field-controller/FieldController";
import { Input } from "@/components/shared/ui/input";
import { SignUpDto } from "@/lib/dto/auth/sign-up.dto";
import { Control } from "react-hook-form";

interface SignUpBodyProps {
  control: Control<SignUpDto>;
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
        disabled={isLoading}
        render={({ field }) => <Input {...field} type="password" />}
      />
    </>
  );
}
