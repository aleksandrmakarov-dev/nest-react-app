import axios from "../axios";
import { IdResponseDto } from "../dto/shared/id-response.dto";
import { PagedResponseDto } from "../dto/shared/paged-response.dto";
import { PageParamsDto } from "../dto/shared/page-params.dto";

export default function baseService<
  TEdit,
  TResponse,
  TSingleResponse = TResponse
>(baseUrl: string) {
  return {
    findMany: async function (params?: PageParamsDto) {
      const response = await axios.get<PagedResponseDto<TResponse>>(
        `${baseUrl}`,
        {
          params: params,
        }
      );
      return response.data;
    },

    findById: async function (id: string) {
      const response = await axios.get<TSingleResponse>(`${baseUrl}/${id}`);
      return response.data;
    },
    create: async function (values: TEdit) {
      const response = await axios.post<IdResponseDto>(baseUrl, values);
      return response.data;
    },
    updateById: async function (id: string, values: TEdit) {
      const response = await axios.put<null>(`${baseUrl}/${id}`, values);
      return response.data;
    },
    deleteById: async function (id: string) {
      const response = await axios.delete<null>(`${baseUrl}/${id}`);
      return response.data;
    },
  };
}
