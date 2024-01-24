import { z } from "zod";

export const editTagSchema = z.object({
  name: z.string().min(1).max(255),
  userId: z.string().min(1).max(255),
});

export type EditTagDto = z.infer<typeof editTagSchema>;
