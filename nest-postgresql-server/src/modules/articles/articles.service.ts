import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateAccountDto } from "../accounts/dto/update-account.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateArticleDto) {
    const { tagIds, ...articleData } = dto;

    return await this.databaseService.article.create({
      data: {
        ...articleData,
        tags: {
          connect: tagIds.map((id) => ({ id: id })),
        },
      },
    });
  }

  async findById(id: string) {
    return await this.databaseService.article.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findMany() {
    return await this.databaseService.article.findMany({
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }

  async updateById(id: string, dto: UpdateArticleDto) {
    const { tagIds, ...articleData } = dto;

    return await this.databaseService.article.update({
      where: {
        id: id,
      },
      data: {
        ...articleData,
        ...(tagIds && {
          tags: {
            set: [],
            connect: tagIds.map((id) => ({ id: id })),
          },
        }),
      },
    });
  }

  async deleteById(id: string) {
    return await this.databaseService.article.delete({
      where: {
        id: id,
      },
    });
  }

  async isOwner(id: string, userId: string) {
    const foundArticle = await this.databaseService.article.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundArticle) {
      throw new NotFoundException("Article not found");
    }

    return foundArticle.userId === userId;
  }
}
