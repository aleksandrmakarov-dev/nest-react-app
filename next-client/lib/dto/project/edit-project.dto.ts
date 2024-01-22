import { z } from "zod";

export const editProjectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  image: z.string().optional(),
  toolIds: z.array(z.string().min(1).max(50)).min(1).max(5),
  userId: z.string().min(1).max(255),
  articleId: z.string().optional(),
  url: z.string().optional(),
  label: z.string().optional(),
  featured: z.coerce.date().optional().nullable(),
});

export type EditProjectDto = z.infer<typeof editProjectSchema>;
