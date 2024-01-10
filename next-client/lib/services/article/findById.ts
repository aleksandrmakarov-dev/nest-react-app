import axios from "@/lib/axios";
import { baseUrl } from "./article.service";

async function findById(id: string) {
  const response = await axios.get<ArticleContentResponseDto>(
    `${baseUrl}/${id}`
  );
  return response.data;
}
