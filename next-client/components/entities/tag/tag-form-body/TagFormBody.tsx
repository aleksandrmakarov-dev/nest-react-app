import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { UserSelect } from "@/components/widgets/user";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import { Control } from "react-hook-form";

interface TagFormBodyProps {
  control: Control<EditTagDto>;
  isLoading?: boolean;
}

export function TagFormBody(props: TagFormBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        control={control}
        name="name"
        label="Name"
        disabled={isLoading}
        render={({ field }) => <Input {...field} />}
      />
      <FieldController
        control={control}
        name="userId"
        label="User"
        disabled={isLoading}
        render={({ field: { ref, ...other } }) => <UserSelect {...other} />}
      />
    </>
  );
}
