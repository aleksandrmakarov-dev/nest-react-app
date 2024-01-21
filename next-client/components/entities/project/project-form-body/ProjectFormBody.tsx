import { FieldController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { Switch } from "@/components/shared/ui/switch";
import { Textarea } from "@/components/shared/ui/textarea";
import { ArticleSelect } from "@/components/widgets/article";
import { ToolSelect } from "@/components/widgets/tool";
import { UserSelect } from "@/components/widgets/user";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";
import { Control } from "react-hook-form";

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
        render={({ field }) => <Input {...field} />}
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
          render={({ field }) => <ToolSelect {...field} />}
        />
        <FieldController
          control={control}
          name="userId"
          label="User"
          disabled={isLoading}
          required
          render={({ field }) => <UserSelect {...field} />}
        />
        <FieldController
          control={control}
          name="articleId"
          label="Article"
          render={({ field }) => <ArticleSelect {...field} />}
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
