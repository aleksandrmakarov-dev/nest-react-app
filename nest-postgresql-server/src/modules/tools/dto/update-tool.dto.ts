import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UpdateToolDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @Optional()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  image?: string;
}
