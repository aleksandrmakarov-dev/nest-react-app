import { tagKeys } from "@/components/entities/tag";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import tagService from "@/lib/services/tag.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateTagById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorDto>,
    { id: string; values: EditTagDto },
    unknown[]
  >({
    mutationKey: tagKeys.mutations.create(),
    mutationFn: async (data) => {
      return await tagService.updateById(data.id, data.values);
    },
  });
};
