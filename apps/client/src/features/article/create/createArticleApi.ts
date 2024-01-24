import { articleKeys } from "@/entities/article";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { GenericErrorDto } from "@/lib/dto/shared/generic-error.dto";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
import articleService from "@/lib/services/article.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateArticle = () => {
  return useMutation<
    IdResponseDto,
    AxiosError<GenericErrorDto>,
    EditArticleDto,
    unknown[]
  >({
    mutationKey: articleKeys.mutations.create(),
    mutationFn: async (data) => {
      return await articleService.create(data);
    },
  });
};
