import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SendVerificationEmailDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
