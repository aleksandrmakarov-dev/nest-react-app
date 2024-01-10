import axios from "@/lib/axios";
import {
  ArticleContentResponseDto,
  ArticleResponseDto,
} from "@/lib/dto/article/article-response.dto";
import { GetArticlesParamsDto } from "@/lib/dto/article/get-articles-params.dto";
import { PagedResponseDto } from "@/lib/dto/shared/paged-response.dto";

const baseUrl = "/articles";

async function findMany(params?: GetArticlesParamsDto) {
  const response = await axios.get<PagedResponseDto<ArticleResponseDto>>(
    `${baseUrl}`,
    {
      params: params,
    }
  );
  return response.data;
}

async function findById(id: string) {
  const response = await axios.get<ArticleContentResponseDto>(
    `${baseUrl}/${id}`
  );
  return response.data;
}

export default {
  findMany,
  findById,
};
