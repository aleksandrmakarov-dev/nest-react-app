"use client";

import {
  ArticleBody,
  ArticleHeader,
  useArticleById,
} from "@/components/entities/article";

interface ArticleContentProps {
  id: string;
}

export function ArticleContent(props: ArticleContentProps) {
  const { data, isLoading, isError, error } = useArticleById(props.id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.response?.data.message}</p>;
  }

  if (!data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <ArticleHeader className="mb-14" article={data} />
      <div className="grid grid-cols-3 gap-x-10">
        <div>sidebar</div>
        <ArticleBody className="col-span-2" content={data.content} />
      </div>
    </div>
  );
}
