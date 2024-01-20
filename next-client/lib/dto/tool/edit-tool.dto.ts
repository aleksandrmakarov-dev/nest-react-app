import { z } from "zod";

export const editToolSchema = z.object({
  name: z.string().min(1).max(255),
  image: z.string().optional(),
  userId: z.string().min(1).max(255),
});

export type EditToolDto = z.infer<typeof editToolSchema>;
