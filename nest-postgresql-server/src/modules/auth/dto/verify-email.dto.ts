import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class VerifyEmailDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  token: string;
}
