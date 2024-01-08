import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import tagService from "@/lib/services/tag/tag.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const tagKeys = {
  tags: {
    root: ["tags"],
    query: () => [...tagKeys.tags.root, "query"],
  },
};

async function fetchTags() {
  return await tagService.findMany();
}

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
