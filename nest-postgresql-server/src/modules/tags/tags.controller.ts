import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { User } from "../auth/decorators/user.decorator";
import { UserDataDto } from "../auth/dto/user-data.dto";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { Role } from "@prisma/client";
import { Authorize } from "../auth/decorators/authorize.decorator";

@ApiTags("Tags")
@ApiBearerAuth()
@Controller("tags")
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  @Authorize(Role.EDITOR, Role.ADMIN)
  async create(@User() user: JwtPayloadDto, @Body() dto: CreateTagDto) {
    if (dto.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only ADMIN user can create resource for another user",
      );
    }

    const createdTag = await this.tagService.create(dto);
    return createdTag;
  }

  @Get()
  async findMany() {
    const foundTags = await this.tagService.findMany();
    return foundTags;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(":id")
  @Authorize(Role.EDITOR, Role.ADMIN)
  async updateById(
    @User() user: JwtPayloadDto,
    @Param("id") id: string,
    @Body() dto: UpdateTagDto,
  ) {
    const isOwner = await this.tagService.isCreatedByUser(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can update it",
      );
    }

    await this.tagService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @Authorize(Role.EDITOR, Role.ADMIN)
  async deleteById(@User() user: JwtPayloadDto, @Param("id") id: string) {
    const isOwner = await this.tagService.isCreatedByUser(id, user.id);

    if (!isOwner && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        "Only user who created resource or ADMIN user can delete it",
      );
    }

    await this.tagService.deleteById(id);
  }
}
