import { authKeys } from "@/components/entities/auth";
import { ResetPasswordDto } from "@/lib/dto/auth/reset-password.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useResetPassword = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    ResetPasswordDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.resetPassword(),
    mutationFn: async (values) => {
      const response = await axios.post<GenericResponseDto>(
        "http://localhost:3001/api/auth/reset-password",
        values
      );

      return response.data;
    },
  });
};
