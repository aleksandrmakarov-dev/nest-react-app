import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { Authorize } from "../auth/decorators/authorize.decorator";
import { Role } from "@prisma/client";
import { User } from "../auth/decorators/user.decorator";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { UsersService } from "../users/users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("articles")
@Controller("articles")
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async create(@User() user: JwtPayloadDto, @Body() dto: CreateArticleDto) {
    if (dto.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only ADMIN user can create resource and assign it to another user",
      );
    }

    const foundUser = await this.usersService.findById(dto.userId);

    if (!foundUser) {
      throw new NotFoundException(
        "User that you want assign to resource not found",
      );
    }

    const createdArticle = await this.articlesService.create(dto);

    return createdArticle;
  }

  @Get()
  async findMany() {
    const foundArticles = await this.articlesService.findMany();
    return foundArticles;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(":id")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async updateById(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Body() dto: UpdateArticleDto,
  ) {
    const isOwner = await this.articlesService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can update it",
      );
    }

    await this.articlesService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async deleteById(@User() user: JwtPayloadDto, @Param("id") id: string) {
    const isOwner = await this.articlesService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can delete it",
      );
    }

    await this.articlesService.deleteById(id);
  }
}
