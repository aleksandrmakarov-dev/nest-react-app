import { Optional } from "@nestjs/common";
import { IsNumber } from "class-validator";

export class GetArticlesQueryDto {
  @Optional()
  @IsNumber()
  page?: number = 1;

  @Optional()
  @IsNumber()
  size?: number = 10;
}
