import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/user-response.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findMany() {
    const foundUsers = await this.usersService.findMany();
    const users = foundUsers.map((u) => new UserResponseDto(u));

    return {
      items: users,
    };
  }
}
