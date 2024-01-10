import {
  ArticleContentResponseDto,
  ArticleResponseDto,
} from "@/lib/dto/article/article-response.dto";
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

export const articleKeys = {
  articles: {
    root: ["articles"],
    query: (page?: number) => [...articleKeys.articles.root, "query", page],
    infinityQuery: (page?: number) => [
      ...articleKeys.articles.root,
      "infinity-query",
      page,
    ],
    byId: (id: string) => [...articleKeys.articles.root, "by-id", id],
  },
};

// Get articles page

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
    queryKey: articleKeys.articles.query(),
    queryFn: async () => await fetchArticles(params),
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
    queryKey: articleKeys.articles.query(),
    queryFn: async () => await fetchArticles(params),
  });
};

// Get articles page infinity

export async function prefetchInfinityArticles(params?: GetArticlesParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchInfiniteQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ArticleResponseDto>>,
    unknown[]
  >({
    queryKey: articleKeys.articles.infinityQuery(),
    queryFn: async () => await fetchArticles(params),
    initialPageParam: 1,
  });

  return queryClient;
}

export const useInfinityArticles = (params?: GetArticlesParamsDto) => {
  return useInfiniteQuery<
    PagedResponseDto<ArticleResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ArticleResponseDto>>,
    unknown[]
  >({
    queryKey: articleKeys.articles.infinityQuery(),
    queryFn: async (data) =>
      await fetchArticles(data.pageParam as GetArticlesParamsDto),
    initialPageParam: params,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length + 1 <= lastPage.pagination.totalPages
        ? {
            page: lastPage.pagination.page + 1,
          }
        : undefined,
  });
};

// Get article by id

async function fetchArticleById(id: string) {
  return await articleService.findById(id);
}

export async function prefetchArticleById(id: string) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    ArticleResponseDto,
    AxiosError<GenericErrorDto>,
    ArticleResponseDto,
    unknown[]
  >({
    queryKey: articleKeys.articles.byId(id),
    queryFn: async () => await articleService.findById(id),
  });

  return queryClient;
}

export const useArticleById = (id: string) => {
  return useQuery<
    ArticleContentResponseDto,
    AxiosError<GenericErrorDto>,
    ArticleContentResponseDto,
    unknown[]
  >({
    queryKey: articleKeys.articles.byId(id),
    queryFn: async () => await fetchArticleById(id),
  });
};
