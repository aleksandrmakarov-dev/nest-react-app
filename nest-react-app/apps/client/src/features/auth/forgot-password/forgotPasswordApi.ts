import { authKeys } from "@/entities/auth";
import { ForgotPasswordDto } from "@/lib/dto/auth/forgot-password.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useForgotPassword = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    ForgotPasswordDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.forgotPassword(),
    mutationFn: async (values) => {
      return await authService.forgotPassword(values);
    },
  });
};
