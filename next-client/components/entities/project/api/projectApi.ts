import { ProjectResponseDto } from "@/lib/dto/project/project-response.dto";
import { GetProjectsParamsDto } from "@/lib/dto/project/get-projects-params.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import projectService from "@/lib/services/project/project.service";
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const projectKeys = {
  projects: {
    root: ["projects"],
    query: (params?: GetProjectsParamsDto) => [
      ...projectKeys.projects.root,
      "query",
      { ...params },
    ],
    infinityQuery: (page?: number) => [
      ...projectKeys.projects.root,
      "infinity-query",
      page,
    ],
    byId: (id: string) => [...projectKeys.projects.root, "by-id", id],
  },
  mutations: {
    create: () => [...projectKeys.projects.root, "create"],
    update: () => [...projectKeys.projects.root, "update"],
    delete: () => [...projectKeys.projects.root, "delete"],
  },
};

// Get projects page

async function fetchProjects(params?: GetProjectsParamsDto) {
  return await projectService.findMany(params);
}

export async function prefetchProjects(params?: GetProjectsParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    PagedResponseDto<ProjectResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ProjectResponseDto>,
    unknown[]
  >({
    queryKey: projectKeys.projects.query(params),
    queryFn: async () => await fetchProjects(params),
  });

  return queryClient;
}

export const useProjects = (params?: GetProjectsParamsDto) => {
  return useQuery<
    PagedResponseDto<ProjectResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<ProjectResponseDto>,
    unknown[]
  >({
    queryKey: projectKeys.projects.query(params),
    queryFn: async () => await fetchProjects(params),
  });
};

// Get projects page infinity

export async function prefetchInfinityProjects(params?: GetProjectsParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchInfiniteQuery<
    PagedResponseDto<ProjectResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ProjectResponseDto>>,
    unknown[]
  >({
    queryKey: projectKeys.projects.infinityQuery(),
    queryFn: async () => await fetchProjects(params),
    initialPageParam: 1,
  });

  return queryClient;
}

export const useInfinityProjects = (params?: GetProjectsParamsDto) => {
  return useInfiniteQuery<
    PagedResponseDto<ProjectResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<ProjectResponseDto>>,
    unknown[]
  >({
    queryKey: projectKeys.projects.infinityQuery(),
    queryFn: async (data) =>
      await fetchProjects(data.pageParam as GetProjectsParamsDto),
    initialPageParam: params,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length + 1 <= lastPage.pagination.totalPages
        ? {
            page: lastPage.pagination.page + 1,
          }
        : undefined,
  });
};

// Get project by id

async function fetchProjectById(id: string) {
  return await projectService.findById(id);
}

export async function prefetchProjectById(id: string) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    ProjectResponseDto,
    AxiosError<GenericErrorDto>,
    ProjectResponseDto,
    unknown[]
  >({
    queryKey: projectKeys.projects.byId(id),
    queryFn: async () => await projectService.findById(id),
  });

  return queryClient;
}

export const useProjectById = (id: string) => {
  return useQuery<
    ProjectResponseDto,
    AxiosError<GenericErrorDto>,
    ProjectResponseDto,
    unknown[]
  >({
    queryKey: projectKeys.projects.byId(id),
    queryFn: async () => await fetchProjectById(id),
  });
};
