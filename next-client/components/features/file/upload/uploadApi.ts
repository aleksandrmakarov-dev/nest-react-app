import { fileKeys } from "@/components/entities/file/api/fileApi";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import fileService from "@/lib/services/file.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUploadFile = () => {
  return useMutation<string, AxiosError<GenericErrorDto>, File>({
    mutationKey: fileKeys.mutations.upload(),
    mutationFn: async (values) => {
      return await fileService.upload(values);
    },
  });
};
