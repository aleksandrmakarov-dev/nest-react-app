import { toolKeys } from "@/components/entities/tool";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import toolService from "@/lib/services/tool/tool.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateToolById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorDto>,
    { id: string; values: EditToolDto },
    unknown[]
  >({
    mutationKey: toolKeys.mutations.create(),
    mutationFn: async (data) => {
      return await toolService.updateById(data.id, data.values);
    },
  });
};
