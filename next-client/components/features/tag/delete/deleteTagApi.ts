import { tagKeys } from "@/components/entities/tag";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import tagService from "@/lib/services/tag/tag.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteTagById = () => {
  return useMutation<null, AxiosError<GenericErrorDto>, string, unknown[]>({
    mutationKey: tagKeys.mutations.delete(),
    mutationFn: async (id) => {
      return await tagService.deleteById(id);
    },
  });
};
