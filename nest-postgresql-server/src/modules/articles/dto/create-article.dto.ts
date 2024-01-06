import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateArticleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty()
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty()
  tagIds: string[];

  @IsString()
  @MinLength(1)
  @ApiProperty()
  userId: string;
}
