import { authKeys } from "@/entities/auth";
import { VerifyEmailDto } from "@/lib/dto/auth/verify-email.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import authService from "@/lib/services/auth.service";

export const useVerifyEmail = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    VerifyEmailDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.verifyEmail(),
    mutationFn: async (values) => {
      return await authService.verifyEmail(values);
    },
  });
};
