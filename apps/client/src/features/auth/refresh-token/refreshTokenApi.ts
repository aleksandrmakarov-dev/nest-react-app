import { authKeys } from "@/entities/auth";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRefreshToken = () => {
  return useMutation<
    SessionDto,
    AxiosError<GenericErrorDto>,
    unknown,
    unknown[]
  >({
    mutationKey: authKeys.mutations.refreshToken(),
    mutationFn: async () => {
      return await authService.refreshToken();
    },
  });
};
