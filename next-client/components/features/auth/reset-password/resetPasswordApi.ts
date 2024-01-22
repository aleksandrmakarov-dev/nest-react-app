import { authKeys } from "@/components/entities/auth";
import axios from "@/lib/axios";
import { ResetPasswordDto } from "@/lib/dto/auth/reset-password.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useResetPassword = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    ResetPasswordDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.resetPassword(),
    mutationFn: async (values) => {
      return await authService.resetPassword(values);
    },
  });
};
