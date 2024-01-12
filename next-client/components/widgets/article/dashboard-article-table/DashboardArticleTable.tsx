"use client";
import { ArticleTable, useArticles } from "@/components/entities/article";

interface DashboardArticleTableProps {
  page?: number;
}

export function DashboardArticleTable(props: DashboardArticleTableProps) {
  const { page } = props;

  const { data, isLoading } = useArticles({
    page: page,
  });

  return (
    <ArticleTable
      articles={data?.items}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
}
