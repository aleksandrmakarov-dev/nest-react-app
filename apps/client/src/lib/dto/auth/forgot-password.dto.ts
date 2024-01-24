import { z } from "zod";

export const forgotPasswordDtoSchema = z.object({
  email: z.string().min(1).max(255).email(),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordDtoSchema>;
