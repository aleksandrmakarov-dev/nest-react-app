import { z } from "zod";

export const articleFilterSchema = z.object({
  query: z.string().optional(),
});

export type ArticleFilterDto = z.infer<typeof articleFilterSchema>;
