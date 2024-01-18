import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ErrorOr } from "src/common/common.interface";
import { GetTagsDto } from "./dto/get-tags.dto";
import {
  PagedResponseDto,
  Pagination,
} from "src/common/dto/paged-response.dto";

@Injectable()
export class TagsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(id: string) {
    return await this.databaseService.tag.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findMany(query: GetTagsDto) {
    const { page, size } = query;

    const isPaged = size > 0;

    const items = await this.databaseService.tag.findMany({
      ...(isPaged && {
        skip: (page - 1) * size,
        take: size,
      }),
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await this.databaseService.tag.count();
    const totalPages = Math.ceil(total / size);

    const pagination = new Pagination(page, size, total, totalPages);

    return new PagedResponseDto(items, pagination);
  }

  async create(dto: CreateTagDto) {
    return await this.databaseService.tag.create({
      data: dto,
    });
  }

  async updateById(id: string, dto: UpdateTagDto) {
    return await this.databaseService.tag.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteById(id: string) {
    return await this.databaseService.tag.delete({
      where: {
        id: id,
      },
    });
  }

  async isOwner(id: string, userId: string): Promise<boolean> {
    const foundTag = await this.databaseService.tag.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundTag) {
      throw new NotFoundException("Tag not found");
    }

    return foundTag.userId === userId;
  }
}
