import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("providers")
export class ProvidersController {
  @Post("google/sign-in")
  async google() {}

  @Post("github/sign-in")
  async github() {}
}
