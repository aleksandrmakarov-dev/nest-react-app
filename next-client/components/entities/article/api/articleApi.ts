import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import { GetArticlesParamsDto } from "@/lib/dto/article/get-articles-params.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import articleService from "@/lib/services/article/article.service";
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const articlesKeys = {
  articles: {
    root: ["articles"],
    query: (page?: number) => [...articlesKeys.articles.root, "query", page],
    infinityQuery: (page?: number) => [
      ...articlesKeys.articles.root,
      "infinity-query",
      page,
    ],
  },
};

async function fetchArticles(params?: GetArticlesParamsDto) {
  return await articleService.findMany(params);
}

export async function prefetchArticles(params?: GetArticlesParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ArticleResponseDto>,
    unknown[]
  >({
    queryKey: articlesKeys.articles.query(),
    queryFn: async () => await fetchArticles(params),
  });

  return queryClient;
}

export async function prefetchInfinityArticles(params?: GetArticlesParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchInfiniteQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ArticleResponseDto>>,
    unknown[]
  >({
    queryKey: articlesKeys.articles.infinityQuery(),
    queryFn: async () => await fetchArticles(params),
    initialPageParam: 1,
  });

  return queryClient;
}

export const useArticles = (params?: GetArticlesParamsDto) => {
  return useQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ArticleResponseDto>,
    unknown[]
  >({
    queryKey: articlesKeys.articles.query(),
    queryFn: async () => await fetchArticles(params),
  });
};

export const useInfinityArticles = (params?: GetArticlesParamsDto) => {
  return useInfiniteQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ArticleResponseDto>>,
    unknown[]
  >({
    queryKey: articlesKeys.articles.infinityQuery(),
    queryFn: async () => await fetchArticles(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => ({ page: lastPage.pagination.page + 1 }),
  });
};
