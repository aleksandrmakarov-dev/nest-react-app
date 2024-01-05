import { Body, Controller, Get, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Tags")
@ApiBearerAuth()
@Controller("tags")
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
