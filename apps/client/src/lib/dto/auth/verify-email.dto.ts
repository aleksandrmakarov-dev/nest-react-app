import { z } from "zod";

export const verifyEmailDtoSchema = z.object({
  token: z.string().min(1).max(255),
});

export type VerifyEmailDto = z.infer<typeof verifyEmailDtoSchema>;
