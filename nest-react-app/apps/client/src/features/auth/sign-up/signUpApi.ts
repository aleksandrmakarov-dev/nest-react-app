import { authKeys } from "@/entities/auth";
import { SignUpLocalDto } from "@/lib/dto/auth/sign-up-local.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignUpLocal = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    SignUpLocalDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.signUpLocal(),
    mutationFn: async (values) => {
      return await authService.signUpLocal(values);
    },
  });
};
