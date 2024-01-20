import { projectKeys } from "@/components/entities/project";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
import projectService from "@/lib/services/project/project.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateProject = () => {
  return useMutation<
    IdResponseDto,
    AxiosError<GenericErrorDto>,
    EditProjectDto,
    unknown[]
  >({
    mutationKey: projectKeys.mutations.create(),
    mutationFn: async (data) => {
      return await projectService.create(data);
    },
  });
};
