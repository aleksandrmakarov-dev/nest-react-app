import { FieldController } from "@/shared";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { ArticleSelect } from "@/widgets/article";
import { ToolSelect } from "@/widgets/tool";
import { UserSelect } from "@/widgets/user";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";
import { FileUploadDialog } from "@/entities/file";
import { Control } from "react-hook-form";
import { Button } from "@/shared/ui/button";

interface ProjectFormBodyProps {
  control: Control<EditProjectDto>;
  isLoading?: boolean;
}

export function ProjectFormBody(props: ProjectFormBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        control={control}
        name="title"
        label="Title"
        disabled={isLoading}
        required
        render={({ field }) => <Input {...field} />}
      />
      <FieldController
        control={control}
        name="description"
        label="Description"
        disabled={isLoading}
        required
        render={({ field }) => <Textarea {...field} />}
      />
      <FieldController
        control={control}
        name="image"
        label="Image"
        required
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
      <div className="grid grid-cols-2 gap-5">
        <FieldController
          control={control}
          name="label"
          label="Label"
          disabled={isLoading}
          render={({ field }) => <Input {...field} />}
        />
        <FieldController
          control={control}
          name="url"
          label="Url"
          disabled={isLoading}
          render={({ field }) => <Input {...field} />}
        />
        <FieldController
          control={control}
          name="toolIds"
          label="Tools"
          disabled={isLoading}
          required
          render={({ field: { ref, ...other } }) => <ToolSelect {...other} />}
        />
        <FieldController
          control={control}
          name="userId"
          label="User"
          disabled={isLoading}
          required
          render={({ field: { ref, ...other } }) => <UserSelect {...other} />}
        />
        <FieldController
          control={control}
          name="articleId"
          label="Article"
          render={({ field: { ref, ...other } }) => (
            <ArticleSelect {...other} />
          )}
        />
        <FieldController
          control={control}
          name="featured"
          label="Visible on Home page"
          render={({ field }) => (
            <Switch
              className="block"
              checked={!!field.value}
              onCheckedChange={(checked) =>
                checked ? field.onChange(new Date()) : field.onChange(undefined)
              }
            />
          )}
        />
      </div>
    </>
  );
}
