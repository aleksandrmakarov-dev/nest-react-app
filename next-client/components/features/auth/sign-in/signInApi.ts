import { authKeys } from "@/components/entities/auth";
import { AuthResponseDto } from "@/lib/dto/auth/auth-response.dto";
import { SignInLocalDto } from "@/lib/dto/auth/sign-in-local.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useSignInLocal = () => {
  return useMutation<
    AuthResponseDto,
    AxiosError<GenericErrorDto>,
    SignInLocalDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.signInLocal(),
    mutationFn: async (values) => {
      const response = await axios.post<AuthResponseDto>(
        "http://localhost:3001/api/auth/sign-in/local",
        values
      );

      return response.data;
    },
  });
};
