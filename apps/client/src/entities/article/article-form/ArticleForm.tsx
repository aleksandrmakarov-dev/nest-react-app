import {
  EditArticleDto,
  editArticleSchema,
} from "@/lib/dto/article/edit-article.dto";
import { ArticleFormBody } from "@/entities/article";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormController } from "@/shared";
import { LoadingButton } from "@/shared/ui/loading-button";

interface ArticleFormProps {
  article?: EditArticleDto;
  edit?: boolean;
  isDataLoading?: boolean;
  isSubmitLoading?: boolean;
  isError?: boolean;
  error?: React.ReactNode;
  isSucces?: boolean;
  success?: React.ReactNode;
  submit: (values: EditArticleDto) => void;
}

export function ArticleForm(props: ArticleFormProps) {
  const {
    article,
    edit,
    isDataLoading,
    isSubmitLoading,
    isError,
    error,
    isSucces,
    success,
    submit,
  } = props;

  const form = useForm<EditArticleDto>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "",
      tagIds: [],
      userId: "",
    },
    values: article,
  });

  return (
    <FormController
      form={form}
      submit={submit}
      isError={isError}
      error={error}
      isSuccess={isSucces}
      success={success}
    >
      <div className="flex flex-col gap-y-3">
        <ArticleFormBody
          control={form.control}
          isLoading={isDataLoading || isSubmitLoading}
        />
        <div className="flex justify-end w-full">
          <LoadingButton
            loading={isSubmitLoading}
            disabled={isDataLoading || isSubmitLoading}
            variant="default"
            type="submit"
          >
            {edit ? "Save changes" : "Create"}
          </LoadingButton>
        </div>
      </div>
    </FormController>
  );
}
