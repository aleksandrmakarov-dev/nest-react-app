import { FieldController, MarkdownEditor } from "@/shared";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { TagSelect } from "@/widgets/tag";
import { UserSelect } from "@/widgets/user";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { Control } from "react-hook-form";
import { FileUploadDialog } from "@/entities/file";
import { Button } from "@/shared/ui/button";

interface ArticleFormBodyProps {
  control: Control<EditArticleDto>;
  isLoading?: boolean;
}

export function ArticleFormBody(props: ArticleFormBodyProps) {
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
        name="content"
        label="Content"
        disabled={isLoading}
        render={({ field: { ref, ...other } }) => <MarkdownEditor {...other} />}
      />
      <div className="grid grid-cols-2 gap-5">
        <FieldController
          control={control}
          name="tagIds"
          label="Tags"
          disabled={isLoading}
          required
          render={({ field: { ref, ...other } }) => <TagSelect {...other} />}
        />
        <FieldController
          control={control}
          name="userId"
          label="User"
          disabled={isLoading}
          required
          render={({ field: { ref, ...other } }) => <UserSelect {...other} />}
        />
      </div>
    </>
  );
}
