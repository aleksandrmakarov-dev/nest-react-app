import { z } from "zod";

export const editArticleSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  image: z.string().optional(),
  content: z.string().optional(),
  tagIds: z.array(z.string().min(1).max(50)).min(1).max(3),
  userId: z.string().min(1).max(255),
});

export type EditArticleDto = z.infer<typeof editArticleSchema>;
