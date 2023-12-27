import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpLocalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail({}, { message: "Invalid email format" })
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  password: string;
}
