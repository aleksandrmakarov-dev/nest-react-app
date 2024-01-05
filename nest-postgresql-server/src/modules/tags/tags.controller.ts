import { Body, Controller, Get, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Roles } from "../auth/decorators/role-based.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorators/public.decorator";

@ApiTags("Tags")
@ApiBearerAuth()
@Controller("tags")
@Public()
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  async create(@Body() dto: CreateTagDto) {
    const createdTag = await this.tagService.create(dto);
    return createdTag;
  }

  @Get()
  async findMany() {
    const foundTags = await this.tagService.findMany();
    return foundTags;
  }
}
