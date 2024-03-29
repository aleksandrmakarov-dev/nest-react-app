import { ArticleForm, useArticleById } from "@/entities/article";
import { useUpdateArticleById } from "@/features/article";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { routes } from "@/lib/routing";

interface CurrentArticleEditorProps {
  id: string;
}

export function CurrentArticleEditor(props: CurrentArticleEditorProps) {
  const { id } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useArticleById(id);

  const {
    mutate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSucess,
  } = useUpdateArticleById();

  const onSubmit = (values: EditArticleDto) => {
    mutate({
      id: id,
      values: values,
    });
  };

  return (
    <ArticleForm
      article={
        data
          ? {
              ...data,
              tagIds: data.tags.map((t) => t.id),
              userId: data.user.id,
            }
          : undefined
      }
      isDataLoading={isDataLoading}
      isSubmitLoading={isUpdateLoading}
      submit={onSubmit}
      isError={isDataError || isUpdateError}
      error={
        dataError?.response?.data.message || updateError?.response?.data.message
      }
      isSucces={isUpdateSucess}
      success={
        <p>
          Article has been updated, see changes{" "}
          <a className="underline font-medium" href={routes.blog.byId(id)}>
            here
          </a>
          .
        </p>
      }
      edit
    />
  );
}
