import axios from "@/lib/axios";
import {
  ArticleContentResponseDto,
  ArticleResponseDto,
} from "@/lib/dto/article/article-response.dto";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import { GetArticlesParamsDto } from "@/lib/dto/article/get-articles-params.dto";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
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

async function create(values: EditArticleDto) {
  const response = await axios.post<IdResponseDto>(baseUrl, values);
  return response.data;
}

async function updateById(id: string, values: EditArticleDto) {
  const response = await axios.put<null>(`${baseUrl}/${id}`, values);
  return response.data;
}

async function deleteById(id: string) {
  const response = await axios.delete<null>(`${baseUrl}/${id}`);
  return response.data;
}

export default {
  findMany,
  findById,
  create,
  updateById,
  deleteById,
};
