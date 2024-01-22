import { authKeys } from "@/components/entities/auth";
import { SignInLocalDto } from "@/lib/dto/auth/sign-in-local.dto";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignInLocal = () => {
  return useMutation<
    SessionDto,
    AxiosError<GenericErrorDto>,
    SignInLocalDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.signInLocal(),
    mutationFn: async (values) => {
      return await authService.signInLocal(values);
    },
  });
};
