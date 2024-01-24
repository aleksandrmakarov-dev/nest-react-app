import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateToolDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @Optional()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  image?: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  userId: string;
}
