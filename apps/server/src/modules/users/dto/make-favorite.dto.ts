import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class MakeFavoriteDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  articleId: string;
}
