import axios from "@/lib/axios";
import { UserDataDto } from "@/lib/dto/auth/session.dto";
import { ForgotPasswordDto } from "@/lib/dto/auth/forgot-password.dto";
import { ResetPasswordDto } from "@/lib/dto/auth/reset-password.dto";
import { SignInLocalDto } from "@/lib/dto/auth/sign-in-local.dto";
import { SignUpLocalDto } from "@/lib/dto/auth/sign-up-local.dto";
import { VerifyEmailDto } from "@/lib/dto/auth/verify-email.dto";
import { GenericResponseDto } from "@/lib/dto/shared/generic-response.dto";

const baseUrl = "/auth";

async function signInLocal(values: SignInLocalDto) {
  const response = await axios.post<UserDataDto>(`${baseUrl}/sign-in`, values);
  return response.data;
}

async function signUpLocal(values: SignUpLocalDto) {
  const response = await axios.post<GenericResponseDto>(
    `${baseUrl}/sign-up`,
    values
  );

  return response.data;
}

async function verifyEmail(values: VerifyEmailDto) {
  const response = await axios.post<GenericResponseDto>(
    `${baseUrl}/verify-email`,
    values
  );
  return response.data;
}

async function resetPassword(values: ResetPasswordDto) {
  const response = await axios.post<GenericResponseDto>(
    `${baseUrl}/reset-password`,
    values
  );

  return response.data;
}

async function forgotPassword(values: ForgotPasswordDto) {
  const response = await axios.post<GenericResponseDto>(
    `${baseUrl}/forgot-password`,
    values
  );

  return response.data;
}

async function refreshToken() {
  const response = await axios.post<UserDataDto>(`${baseUrl}/refresh-token`);
  return response.data;
}

async function signOut() {
  const response = await axios.delete<GenericResponseDto>(
    `${baseUrl}/sign-out`
  );

  return response.data;
}

export default {
  signInLocal,
  signUpLocal,
  verifyEmail,
  resetPassword,
  forgotPassword,
  refreshToken,
  signOut,
};
