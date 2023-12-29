import { authKeys } from "@/components/entities/auth";
import { ForgotPasswordDto } from "@/lib/dto/auth/forgot-password.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useForgotPassword = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    ForgotPasswordDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.forgotPassword(),
    mutationFn: async (values) => {
      const response = await axios.post<GenericResponseDto>(
        "http://localhost:3001/api/auth/forgot-password",
        values
      );

      return response.data;
    },
  });
};
