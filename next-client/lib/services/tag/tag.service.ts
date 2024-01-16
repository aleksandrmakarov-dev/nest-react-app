import axios from "@/lib/axios";
import { IdResponseDto } from "@/lib/dto/shared/id-response.dto";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";

const baseUrl = "/tags";

async function findMany() {
  const response = await axios.get<TagResponseDto[]>(`${baseUrl}`);
  return response.data;
}

async function create(values: EditTagDto) {
  const response = await axios.post<IdResponseDto>(baseUrl, values);
  return response.data;
}

async function updateById(id: string, values: EditTagDto) {
  const response = await axios.put<null>(`${baseUrl}/${id}`, values);
  return response.data;
}

async function deleteById(id: string) {
  const response = await axios.delete<null>(`${baseUrl}/${id}`);
  return response.data;
}

async function findById(id: string) {
  const response = await axios.get<TagResponseDto>(`${baseUrl}/${id}`);
  return response.data;
}

export default {
  findMany,
  create,
  updateById,
  deleteById,
  findById,
};
