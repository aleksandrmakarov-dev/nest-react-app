import { projectKeys } from "@/components/entities/project";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import projectService from "@/lib/services/project/project.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteProjectById = () => {
  return useMutation<null, AxiosError<GenericErrorDto>, string, unknown[]>({
    mutationKey: projectKeys.mutations.delete(),
    mutationFn: async (id) => {
      return await projectService.deleteById(id);
    },
  });
};
