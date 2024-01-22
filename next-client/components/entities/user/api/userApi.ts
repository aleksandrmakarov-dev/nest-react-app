import { UserResponseDto } from "@/lib/dto/user/user-response.dto";
import { GetUsersParamsDto } from "@/lib/dto/user/get-users-params.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import userService from "@/lib/services/user.service";
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const userKeys = {
  users: {
    root: ["users"],
    query: (page?: number) => [...userKeys.users.root, "query", page],
    infinityQuery: (page?: number) => [
      ...userKeys.users.root,
      "infinity-query",
      page,
    ],
    byId: (id: string) => [...userKeys.users.root, "by-id", id],
  },
  mutations: {
    create: () => [...userKeys.users.root, "create"],
    update: () => [...userKeys.users.root, "update"],
    delete: () => [...userKeys.users.root, "delete"],
  },
};

// Get users page

async function fetchUsers(params?: GetUsersParamsDto) {
  return await userService.findMany(params);
}

export async function prefetchUsers(params?: GetUsersParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    PagedResponseDto<UserResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<UserResponseDto>,
    unknown[]
  >({
    queryKey: userKeys.users.query(),
    queryFn: async () => await fetchUsers(params),
  });

  return queryClient;
}

export const useUsers = (params?: GetUsersParamsDto) => {
  return useQuery<
    PagedResponseDto<UserResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<UserResponseDto>,
    unknown[]
  >({
    queryKey: userKeys.users.query(),
    queryFn: async () => await fetchUsers(params),
  });
};

// Get users page infinity

export async function prefetchInfinityUsers(params?: GetUsersParamsDto) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchInfiniteQuery<
    PagedResponseDto<UserResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<UserResponseDto>>,
    unknown[]
  >({
    queryKey: userKeys.users.infinityQuery(),
    queryFn: async () => await fetchUsers(params),
    initialPageParam: 1,
  });

  return queryClient;
}

export const useInfinityUsers = (params?: GetUsersParamsDto) => {
  return useInfiniteQuery<
    PagedResponseDto<UserResponseDto>,
    AxiosError<GenericErrorDto>,
    InfiniteData<PagedResponseDto<UserResponseDto>>,
    unknown[]
  >({
    queryKey: userKeys.users.infinityQuery(),
    queryFn: async (data) =>
      await fetchUsers(data.pageParam as GetUsersParamsDto),
    initialPageParam: params,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length + 1 <= lastPage.pagination.totalPages
        ? {
            page: lastPage.pagination.page + 1,
          }
        : undefined,
  });
};

// Get user by id

async function fetchUserById(id: string) {
  return await userService.findById(id);
}

export async function prefetchUserById(id: string) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    UserResponseDto,
    AxiosError<GenericErrorDto>,
    UserResponseDto,
    unknown[]
  >({
    queryKey: userKeys.users.byId(id),
    queryFn: async () => await userService.findById(id),
  });

  return queryClient;
}

export const useUserById = (id: string) => {
  return useQuery<
    UserResponseDto,
    AxiosError<GenericErrorDto>,
    UserResponseDto,
    unknown[]
  >({
    queryKey: userKeys.users.byId(id),
    queryFn: async () => await fetchUserById(id),
  });
};
