"use client";
import { ArticleCard, useArticles } from "@/components/entities/article";
import { ArticleFilter } from "@/components/entities/article/article-filter/ArticleFilter";
import Section from "@/components/shared/section/Section";
import { PopularTags } from "../../tag";
import Link from "next/link";

export function GlobalArticleFeed() {
  const { data, isLoading, isError, error } = useArticles();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-10">
      {data?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
