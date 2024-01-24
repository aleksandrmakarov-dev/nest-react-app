import { Injectable, NotFoundException } from "@nestjs/common";
import {
  Pagination,
  PagedResponseDto,
} from "src/common/dto/paged-response.dto";
import { DatabaseService } from "src/core/database/database.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { GetToolsDto } from "./dto/get-tools.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";

@Injectable()
export class ToolsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(id: string) {
    return await this.databaseService.tool.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findMany(query: GetToolsDto) {
    const { page, size } = query;

    const isPaged = size > 0;

    const items = await this.databaseService.tool.findMany({
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

  async create(dto: CreateToolDto) {
    return await this.databaseService.tool.create({
      data: dto,
    });
  }

  async updateById(id: string, dto: UpdateToolDto) {
    return await this.databaseService.tool.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteById(id: string) {
    return await this.databaseService.tool.delete({
      where: {
        id: id,
      },
    });
  }

  async isOwner(id: string, userId: string): Promise<boolean> {
    const foundtool = await this.databaseService.tool.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundtool) {
      throw new NotFoundException("tool not found");
    }

    return foundtool.userId === userId;
  }
}
