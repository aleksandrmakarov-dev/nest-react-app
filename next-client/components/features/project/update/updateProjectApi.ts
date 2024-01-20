import { projectKeys } from "@/components/entities/project";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import projectService from "@/lib/services/project/project.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateProjectById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorDto>,
    { id: string; values: EditProjectDto },
    unknown[]
  >({
    mutationKey: projectKeys.mutations.create(),
    mutationFn: async (data) => {
      return await projectService.updateById(data.id, data.values);
    },
  });
};
