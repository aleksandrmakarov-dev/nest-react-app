import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import { FileUploadDialog } from "@/components/entities/file";
import { Control } from "react-hook-form";

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
          <FileUploadDialog
            trigger={<Input {...field} />}
            onUploaded={(v) => field.onChange(v)}
          />
        )}
      />
      <FieldController
        control={control}
        name="userId"
        label="User"
        disabled={isLoading}
        render={({ field }) => <Input {...field} />}
      />
    </>
  );
}
