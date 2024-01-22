import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import { FileUploadDialog } from "@/components/entities/file";
import { Control } from "react-hook-form";
import { UserSelect } from "@/components/widgets/user";
import { Button } from "@/components/shared/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudArrowUp,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

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
              trigger={<Button variant="tonal">Select</Button>}
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
