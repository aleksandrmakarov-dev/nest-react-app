import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    default: "editor@example.com",
  })
  email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty({
    default: "editor123",
  })
  password: string;
}
