import axios from "@/lib/axios";
import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";

const baseUrl = "/tags";

async function findMany() {
  const response = await axios.get<TagResponseDto[]>(`${baseUrl}`);
  return response.data;
}

export default {
  findMany,
};
