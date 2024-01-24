import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class GetProjectsDto {
  @Optional()
  @IsNumber()
  @ApiProperty({
    required: false,
  })
  page?: number = 1;

  @Optional()
  @IsNumber()
  @ApiProperty({
    required: false,
  })
  size?: number = 10;

  @Optional()
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  onlyFeatured?: boolean = false;
}
