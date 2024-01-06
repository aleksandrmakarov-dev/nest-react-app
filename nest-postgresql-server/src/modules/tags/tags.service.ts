import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ErrorOr } from "src/common/common.interface";

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

  async findMany() {
    return await this.databaseService.tag.findMany();
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
