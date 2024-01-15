import { authKeys } from "@/components/entities/auth";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { UserDataDto } from "@/lib/dto/auth/session.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import authService from "@/lib/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRefreshToken = () => {
  return useMutation<
    UserDataDto,
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
