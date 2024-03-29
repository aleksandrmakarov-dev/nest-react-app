import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";
import { GetTagsParamsDto } from "@/lib/dto/tag/get-tags-params.dto";
import {
  TagResponseDto,
  TagResponseWithCountDto,
} from "@/lib/dto/tag/tag-response.dto";
import { QueryClientConfig } from "@/lib/query-client";
import tagService from "@/lib/services/tag.service";
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

async function fetchTags(params?: GetTagsParamsDto) {
  return await tagService.findMany(params);
}

export const prefetchTags = async (params?: GetTagsParamsDto) => {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery<
    PagedResponseDto<TagResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<TagResponseDto>[],
    unknown[]
  >({
    queryKey: tagKeys.tags.query(),
    queryFn: async () => await fetchTags(params),
  });

  return queryClient;
};

export const useTags = (params?: GetTagsParamsDto) => {
  return useQuery<
    PagedResponseDto<TagResponseDto>,
    AxiosError<GenericErrorDto>,
    PagedResponseDto<TagResponseDto>,
    unknown[]
  >({
    queryKey: tagKeys.tags.query(),
    queryFn: async () => await fetchTags(params),
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
    TagResponseWithCountDto,
    AxiosError<GenericErrorDto>,
    TagResponseWithCountDto,
    unknown[]
  >({
    queryKey: tagKeys.tags.byId(id),
    queryFn: async () => await fetchTagById(id),
  });
};
