"use client";

import {
  ArticleBody,
  ArticleHeader,
  ArticleShare,
  useArticleById,
} from "@/components/entities/article";
import { Section, Toc } from "@/components/shared";

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
      <div className="grid grid-cols-10 items-start">
        <div className="col-span-3 mr-14 pt-5 sticky top-0 left-0">
          <Section className="mb-5" header="Table of Contents">
            <Toc value={data.content} />
          </Section>
          <Section header="Share">
            <ArticleShare />
          </Section>
        </div>
        <ArticleBody className="col-span-7" content={data.content} />
      </div>
    </div>
  );
}