import { authKeys } from "@/entities/auth";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignOut = () => {
  return useMutation<null, AxiosError<GenericErrorDto>, unknown, unknown[]>({
    mutationKey: authKeys.mutations.signOut(),
    mutationFn: async () => {
      return await authService.signOut();
    },
  });
};
