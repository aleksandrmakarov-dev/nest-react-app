import { articleKeys } from "@/components/entities/article";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import articleService from "@/lib/services/article.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteArticleById = () => {
  return useMutation<null, AxiosError<GenericErrorDto>, string, unknown[]>({
    mutationKey: articleKeys.mutations.delete(),
    mutationFn: async (id) => {
      return await articleService.deleteById(id);
    },
  });
};
