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
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Authorize } from "../auth/decorators/authorize.decorator";
import { Role } from "@prisma/client";
import { User } from "../auth/decorators/user.decorator";
import { CreateProjectDto } from "./dto/create-project.dto";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { IdResponseDto } from "src/common/dto/id-response.dto";
import { UsersService } from "../users/users.service";
import { GetProjectsDto } from "./dto/get-projects.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@ApiTags("Projects")
@Controller("projects")
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async create(@User() user: JwtPayloadDto, @Body() dto: CreateProjectDto) {
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

    const createdArticle = await this.projectsService.create(dto);

    return new IdResponseDto(createdArticle.id);
  }

  @Get()
  async findMany(@Query() query: GetProjectsDto) {
    const pagedArticles = await this.projectsService.findMany(query);
    return pagedArticles;
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const foundArticle = await this.projectsService.findById(id);
    return foundArticle;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(":id")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async updateById(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    const isOwner = await this.projectsService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can update it",
      );
    }

    await this.projectsService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @ApiBearerAuth()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async deleteById(@User() user: JwtPayloadDto, @Param("id") id: string) {
    const isOwner = await this.projectsService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can delete it",
      );
    }

    await this.projectsService.deleteById(id);
  }
}
