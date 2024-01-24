import {
  ArticleContentResponseDto,
  ArticleResponseDto,
} from "@/lib/dto/article/article-response.dto";
import { EditArticleDto } from "@/lib/dto/article/edit-article.dto";
import baseService from "./base.service";

const articleService = baseService<
  EditArticleDto,
  ArticleResponseDto,
  ArticleContentResponseDto
>("/articles");

export default articleService;
