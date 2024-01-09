import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/user-response.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MakeFavoriteDto } from "./dto/make-favorite.dto";
import { User } from "../auth/decorators/user.decorator";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { Role } from "@prisma/client";
import { Authorize } from "../auth/decorators/authorize.decorator";
import { GenericResponseDto } from "src/common/dto/generic-response.dto";

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

  @Post(":id/favorite")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async makeFavorite(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Body() dto: MakeFavoriteDto,
  ) {
    if (id !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only ADMIN user can create resource and assign it to another user",
      );
    }

    const foundUser = await this.usersService.findById(id);

    if (!foundUser) {
      throw new NotFoundException(
        "User that you want assign to resource not found",
      );
    }

    const hasFavorite = await this.usersService.hasFavorite(id, dto.articleId);

    if (hasFavorite) {
      throw new ConflictException("Article is already in favorites");
    }

    await this.usersService.makeFavorite(id, dto.articleId);

    const response: GenericResponseDto = {
      message: "Made favorite",
    };

    return response;
  }

  @Get(":id/favorite")
  async favorites(@Param("id") id: string) {
    return await this.usersService.favorites(id);
  }

  @Delete(":id/favorite/:articleId")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async deleteFavorite(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Param("articleId") articleId: string,
  ) {
    if (id !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who make resource favorite or ADMIN user can delete it",
      );
    }

    const hasFavorite = await this.usersService.hasFavorite(id, articleId);
    if (!hasFavorite) {
      throw new ConflictException("User does not have article in favorites");
    }

    await this.usersService.deleteFavorite(id, articleId);
  }
}
