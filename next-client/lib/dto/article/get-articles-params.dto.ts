import { PageParamsDto } from "../shared/page-params.dto";

export interface GetArticlesParamsDto extends PageParamsDto {
  tagId?: string;
}
