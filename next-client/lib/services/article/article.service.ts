import axios from "@/lib/axios";
import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
const baseUrl = "/articles";

async function findMany() {
  const response = await axios.get<ArticleResponseDto[]>(`${baseUrl}`);
  return response.data;
}

export default {
  findMany,
};
