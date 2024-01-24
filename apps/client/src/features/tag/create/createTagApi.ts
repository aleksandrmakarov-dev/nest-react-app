import { tagKeys } from "@/entities/tag";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import tagService from "@/lib/services/tag.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateTag = () => {
  return useMutation<
    IdResponseDto,
    AxiosError<GenericErrorDto>,
    EditTagDto,
    unknown[]
  >({
    mutationKey: tagKeys.mutations.create(),
    mutationFn: async (data) => {
      return await tagService.create(data);
    },
  });
};
