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
import { ToolsService } from "./tools.service";
import { Role } from "@prisma/client";
import { Authorize } from "../auth/decorators/authorize.decorator";
import { User } from "../auth/decorators/user.decorator";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { GetTagsDto } from "../tags/dto/get-tags.dto";
import { UsersService } from "../users/users.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Tools")
@Controller("tools")
export class ToolsController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async create(@User() user: JwtPayloadDto, @Body() dto: CreateToolDto) {
    if (dto.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only ADMIN user can create resource and assign it another user",
      );
    }

    const foundUser = await this.usersService.findById(dto.userId);

    if (!foundUser) {
      throw new NotFoundException(
        "User that you want assign to resource not found",
      );
    }

    const createdTag = await this.toolsService.create(dto);
    return createdTag;
  }

  @Get()
  async findMany(@Query() query: GetTagsDto) {
    const pagedTags = await this.toolsService.findMany(query);
    return pagedTags;
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const foundTags = await this.toolsService.findById(id);
    return foundTags;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(":id")
  @Authorize(Role.EDITOR, Role.ADMIN)
  async updateById(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Body() dto: UpdateToolDto,
  ) {
    const isOwner = await this.toolsService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can update it",
      );
    }

    await this.toolsService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @Authorize(Role.EDITOR, Role.ADMIN)
  async deleteById(@User() user: JwtPayloadDto, @Param("id") id: string) {
    const isOwner = await this.toolsService.isOwner(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can delete it",
      );
    }

    await this.toolsService.deleteById(id);
  }
}
