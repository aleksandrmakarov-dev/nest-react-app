import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PageParamsDto } from "src/common/dto/page-params.dto";

export class GetArticlesDto extends PageParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
  })
  tagId?: string;
}
