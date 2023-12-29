import { z } from "zod";

export const signInLocalDtoSchema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(5).max(255),
});

export type SignInLocalDto = z.infer<typeof signInLocalDtoSchema>;
