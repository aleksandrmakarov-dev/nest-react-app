import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/user-response.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorators/public.decorator";
import { Optional } from "../auth/decorators/optional.decorator";
import { Roles } from "../auth/decorators/role-based.decorator";
import { Role } from "@prisma/client";
import { User } from "../auth/decorators/user.decorator";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  async findMany(@User() user: JwtPayloadDto | null) {
    const foundUsers = await this.usersService.findMany();
    const users = foundUsers.map((u) => new UserResponseDto(u));

    return {
      items: users,
    };
  }
}
