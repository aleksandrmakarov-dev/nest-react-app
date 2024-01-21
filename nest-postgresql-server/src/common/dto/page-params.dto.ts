import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PageParamsDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: false,
  })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: false,
  })
  size?: number = 10;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
  })
  query?: string;
}
