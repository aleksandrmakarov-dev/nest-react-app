import { toolKeys } from "@/entities/tool";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import toolService from "@/lib/services/tool.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateTool = () => {
  return useMutation<
    IdResponseDto,
    AxiosError<GenericErrorDto>,
    EditToolDto,
    unknown[]
  >({
    mutationKey: toolKeys.mutations.create(),
    mutationFn: async (data) => {
      return await toolService.create(data);
    },
  });
};
