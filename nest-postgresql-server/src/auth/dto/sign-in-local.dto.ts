import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInLocalDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  password: string;
}

export class SignInLocalWithIpAddressDto extends SignInLocalDto {
  ipAddress: string;
}
