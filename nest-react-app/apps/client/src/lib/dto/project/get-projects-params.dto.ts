import { PageParamsDto } from "../shared/page-params.dto";

export interface GetProjectsParamsDto extends PageParamsDto {
  onlyFeatured?: boolean;
}
