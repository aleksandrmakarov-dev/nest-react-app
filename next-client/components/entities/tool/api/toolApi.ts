import { ToolResponseDto } from "@/lib/dto/tool/tool-response.dto";
import { GetToolsParamsDto } from "@/lib/dto/tool/get-tools-params.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import toolService from "@/lib/services/tool/tool.service";
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const toolKeys = {
  tools: {
    root: ["tools"],
    query: (page?: number) => [...toolKeys.tools.root, "query", page],
    infinityQuery: (page?: number) => [
      ...toolKeys.tools.root,
      "infinity-query",
      page,
    ],
    byId: (id: string) => [...toolKeys.tools.root, "by-id", id],
  },
  mutations: {
    create: () => [...toolKeys.tools.root, "create"],
    update: () => [...toolKeys.tools.root, "update"],
    delete: () => [...toolKeys.tools.root, "delete"],
  },
};

// Get tools page

async function fetchTools(params?: GetToolsParamsDto) {
  return await toolService.findMany(params);
}

export async function prefetchTools(params?: GetToolsParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    PagedResponseDto<ToolResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ToolResponseDto>,
    unknown[]
  >({
    queryKey: toolKeys.tools.query(),
    queryFn: async () => await fetchTools(params),
  });

  return queryClient;
}

export const useTools = (params?: GetToolsParamsDto) => {
  return useQuery<
    PagedResponseDto<ToolResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ToolResponseDto>,
    unknown[]
  >({
    queryKey: toolKeys.tools.query(),
    queryFn: async () => await fetchTools(params),
  });
};

// Get tools page infinity

export async function prefetchInfinityTools(params?: GetToolsParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchInfiniteQuery<
    PagedResponseDto<ToolResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ToolResponseDto>>,
    unknown[]
  >({
    queryKey: toolKeys.tools.infinityQuery(),
    queryFn: async () => await fetchTools(params),
    initialPageParam: 1,
  });

  return queryClient;
}

export const useInfinityTools = (params?: GetToolsParamsDto) => {
  return useInfiniteQuery<
    PagedResponseDto<ToolResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ToolResponseDto>>,
    unknown[]
  >({
    queryKey: toolKeys.tools.infinityQuery(),
    queryFn: async (data) =>
      await fetchTools(data.pageParam as GetToolsParamsDto),
    initialPageParam: params,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length + 1 <= lastPage.pagination.totalPages
        ? {
            page: lastPage.pagination.page + 1,
          }
        : undefined,
  });
};

// Get tool by id

async function fetchToolById(id: string) {
  return await toolService.findById(id);
}

export async function prefetchToolById(id: string) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    ToolResponseDto,
    AxiosError<GenericErrorDto>,
    ToolResponseDto,
    unknown[]
  >({
    queryKey: toolKeys.tools.byId(id),
    queryFn: async () => await toolService.findById(id),
  });

  return queryClient;
}

export const useToolById = (id: string) => {
  return useQuery<
    ToolResponseDto,
    AxiosError<GenericErrorDto>,
    ToolResponseDto,
    unknown[]
  >({
    queryKey: toolKeys.tools.byId(id),
    queryFn: async () => await fetchToolById(id),
  });
};
