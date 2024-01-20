import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";

export class CreateProjectDto {
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
  @ApiProperty()
  image?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ApiProperty()
  toolIds: string[];

  @IsString()
  @MinLength(1)
  @ApiProperty()
  userId: string;
}
