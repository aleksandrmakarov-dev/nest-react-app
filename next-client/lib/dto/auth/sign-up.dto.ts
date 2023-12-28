import { z } from "zod";

export const signUpDtoSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1).max(255).email(),
  password: z.string().min(5).max(255),
});

export type SignUpDto = z.infer<typeof signUpDtoSchema>;
