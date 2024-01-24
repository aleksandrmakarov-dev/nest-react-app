import { ArticleTable, useArticles } from "@/entities/article";

interface DashboardArticleTableProps {
  page?: number | null;
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
