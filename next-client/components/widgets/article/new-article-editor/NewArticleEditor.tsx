"use client";

import { ArticleForm } from "@/components/entities/article";
import { useCreateArticle } from "@/components/features/article";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { routes } from "@/lib/routing";
import Link from "next/link";

export function NewArticleEditor() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useCreateArticle();

  const { user, isLoading: isUserLoading } = useAuth();

  const onSubmit = (values: EditArticleDto) => {
    mutate(values);
  };

  return (
    <ArticleForm
      submit={onSubmit}
      isSubmitLoading={isPending}
      isDataLoading={isUserLoading}
      isError={isError}
      error={error?.response?.data.message}
      isSucces={isSuccess}
      success={
        <p>
          Article has been created, you can see it{" "}
          <Link
            className="font-semibold underline"
            href={routes.blog.byId(data?.id!)}
          >
            here
          </Link>
          .
        </p>
      }
      article={{
        title: "",
        description: "",
        content: "",
        image: "",
        userId: user?.id ?? "",
        tagIds: [
          "708bb458-e3f5-4fce-a8b3-7311ab645033",
          "5334fabb-2a75-48cf-92fa-339aa30bd872",
        ],
      }}
    />
  );
}
