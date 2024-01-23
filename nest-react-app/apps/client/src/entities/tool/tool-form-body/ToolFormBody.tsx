import { FieldController } from "@/shared";
import { Input } from "@/shared/ui/input";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import { FileUploadDialog } from "@/entities/file";
import { Control } from "react-hook-form";
import { UserSelect } from "@/widgets/user";
import { Button } from "@/shared/ui/button";

interface ToolFormBodyProps {
  control: Control<EditToolDto>;
  isLoading?: boolean;
}

export function ToolFormBody(props: ToolFormBodyProps) {
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
        name="image"
        label="Image"
        disabled={isLoading}
        render={({ field }) => (
          <div className="flex gap-x-2 items-center">
            <Input {...field} />
            <FileUploadDialog
              trigger={<Button variant="outline">Select</Button>}
              onUploaded={(v) => field.onChange(v)}
            />
          </div>
        )}
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
