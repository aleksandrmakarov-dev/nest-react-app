import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { QueryClientConfig } from "@/lib/query-client";
import articleService from "@/lib/services/article/article.service";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const articlesKey = {
  articles: {
    root: ["articles"],
    query: () => [...articlesKey.articles.root, "query"],
  },
};

async function fetchArticles() {
  return await articleService.findMany();
}

export const useArticles = () => {
  return useQuery<
    ArticleResponseDto[],
    AxiosError<GenericErrorDto>,
    ArticleResponseDto[],
    unknown[]
  >({
    queryKey: articlesKey.articles.query(),
    queryFn: fetchArticles,
  });
};

export async function prefetchArticles() {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery({
    queryKey: articlesKey.articles.query(),
    queryFn: fetchArticles,
  });

  return queryClient;
}
