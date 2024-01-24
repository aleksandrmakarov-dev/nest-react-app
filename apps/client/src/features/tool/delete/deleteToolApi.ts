import { toolKeys } from "@/entities/tool";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import toolService from "@/lib/services/tool.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteToolById = () => {
  return useMutation<null, AxiosError<GenericErrorDto>, string, unknown[]>({
    mutationKey: toolKeys.mutations.delete(),
    mutationFn: async (id) => {
      return await toolService.deleteById(id);
    },
  });
};
