import { articleKeys } from "@/components/entities/article";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import articleService from "@/lib/services/article/article.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateArticleById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorDto>,
    { id: string; values: EditArticleDto },
    unknown[]
  >({
    mutationKey: articleKeys.mutations.create(),
    mutationFn: async (data) => {
      return await articleService.updateById(data.id, data.values);
    },
  });
};
