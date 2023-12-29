import { z } from "zod";

export const resetPasswordDtoSchema = z.object({
  token: z.string().min(1).max(255),
  newPassword: z.string().min(5).max(255),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>;
