import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { GetArticlesDto } from "./dto/get-articles.dto";
import {
  PagedResponseDto,
  Pagination,
} from "src/common/dto/paged-response.dto";

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

  async findMany(dto: GetArticlesDto) {
    const { page, size, query, tagId } = dto;

    const isPaged = size > 0;

    const items = await this.databaseService.article.findMany({
      ...(isPaged && {
        skip: (page - 1) * size,
        take: size,
      }),
      where: {
        ...(query && { title: { contains: query, mode: "insensitive" } }),
        ...(tagId && {
          tags: {
            some: {
              id: tagId,
            },
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
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

    const total = await this.databaseService.article.count({
      where: {
        ...(query && { title: { contains: query, mode: "insensitive" } }),
        ...(tagId && {
          tags: {
            some: {
              id: tagId,
            },
          },
        }),
      },
    });

    const totalPages = Math.ceil(total / size);

    const pagination = new Pagination(page, size, total, totalPages);

    return new PagedResponseDto(items, pagination);
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
