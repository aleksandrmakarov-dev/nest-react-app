import { Injectable, NotFoundException } from "@nestjs/common";
import {
  Pagination,
  PagedResponseDto,
} from "src/common/dto/paged-response.dto";
import { DatabaseService } from "src/core/database/database.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectsDto } from "./dto/get-projects.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateProjectDto) {
    const { toolIds, ...projectData } = dto;

    return await this.databaseService.project.create({
      data: {
        ...projectData,
        tools: {
          connect: toolIds.map((id) => ({ id: id })),
        },
      },
    });
  }

  async findById(id: string) {
    return await this.databaseService.project.findUnique({
      where: {
        id: id,
      },
      include: {
        tools: {
          select: {
            id: true,
            name: true,
            image: true,
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

  async findMany(query: GetProjectsDto) {
    const { page, size, onlyFeatured } = query;

    const isPaged = size > 0;

    const items = await this.databaseService.project.findMany({
      ...(isPaged && {
        skip: (page - 1) * size,
        take: size,
      }),
      ...(onlyFeatured && {
        where: {
          NOT: { featured: null },
        },
        orderBy: {
          featured: "desc",
        },
      }),
      ...(!onlyFeatured && {
        orderBy: {
          createdAt: "desc",
        },
      }),
      include: {
        tools: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const total = await this.databaseService.project.count();
    const totalPages = Math.ceil(total / size);

    const pagination = new Pagination(page, size, total, totalPages);

    return new PagedResponseDto(items, pagination);
  }

  async updateById(id: string, dto: UpdateProjectDto) {
    const { toolIds, ...projectData } = dto;

    return await this.databaseService.project.update({
      where: {
        id: id,
      },
      data: {
        ...projectData,
        ...(toolIds && {
          tools: {
            set: [],
            connect: toolIds.map((id) => ({ id: id })),
          },
        }),
      },
    });
  }

  async deleteById(id: string) {
    return await this.databaseService.project.delete({
      where: {
        id: id,
      },
    });
  }

  async isOwner(id: string, userId: string) {
    const foundProject = await this.databaseService.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundProject) {
      throw new NotFoundException("Project not found");
    }

    return foundProject.userId === userId;
  }
}
