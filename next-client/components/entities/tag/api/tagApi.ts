import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import tagService from "@/lib/services/tag/tag.service";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const tagKeys = {
  tags: {
    root: ["tags"],
    query: () => [...tagKeys.tags.root, "query"],
    byId: (id: string) => [...tagKeys.tags.root, "by-id", id],
  },
  mutations: {
    create: () => [...tagKeys.tags.root, "create"],
    update: () => [...tagKeys.tags.root, "update"],
    delete: () => [...tagKeys.tags.root, "delete"],
  },
};

async function fetchTags() {
  return await tagService.findMany();
}

export const prefetchTags = async () => {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    TagResponseDto[],
    AxiosError<GenericErrorDto>,
    TagResponseDto[],
    unknown[]
  >({
    queryKey: tagKeys.tags.query(),
    queryFn: fetchTags,
  });

  return queryClient;
};

export const useTags = () => {
  return useQuery<
    TagResponseDto[],
    AxiosError<GenericErrorDto>,
    TagResponseDto[],
    unknown[]
  >({
    queryKey: tagKeys.tags.query(),
    queryFn: fetchTags,
  });
};

async function fetchTagById(id: string) {
  return await tagService.findById(id);
}

export async function prefetchTagById(id: string) {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    TagResponseDto,
    AxiosError<GenericErrorDto>,
    TagResponseDto,
    unknown[]
  >({
    queryKey: tagKeys.tags.byId(id),
    queryFn: async () => await tagService.findById(id),
  });

  return queryClient;
}

export const useTagById = (id: string) => {
  return useQuery<
    TagResponseDto,
    AxiosError<GenericErrorDto>,
    TagResponseDto,
    unknown[]
  >({
    queryKey: tagKeys.tags.byId(id),
    queryFn: async () => await fetchTagById(id),
  });
};
