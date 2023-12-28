import { authKeys } from "@/components/entities/auth";
import { SignUpDto } from "@/lib/dto/auth/sign-up.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useSignUpLocal = () => {
  return useMutation<
    GenericResponseDto,
    AxiosError<GenericErrorDto>,
    SignUpDto,
    unknown[]
  >({
    mutationKey: authKeys.mutations.signUpLocal(),
    mutationFn: async (values) => {
      const response = await axios.post<GenericResponseDto>(
        "http://localhost:3001/api/auth/sign-up/local",
        values
      );

      return response.data;
    },
  });
};
