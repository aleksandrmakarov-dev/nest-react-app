import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UpdateTagDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;
}
