import { authKeys } from "@/components/entities/auth";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import authService from "@/lib/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignOut = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    unknown,
    unknown[]
  >({
    mutationKey: authKeys.mutations.signOut(),
    mutationFn: async () => {
      return await authService.signOut();
    },
  });
};
