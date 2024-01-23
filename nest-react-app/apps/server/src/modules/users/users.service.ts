import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { EmailVerificationTokenDto } from "./dto/email-verification-token.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BcryptService } from "src/core/bcrypt/bcrypt.service";
import { MakeFavoriteDto } from "./dto/make-favorite.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly bcryptService: BcryptService,
  ) {}

  async findMany() {
    return await this.databaseService.user.findMany();
  }

  async findById(id: string) {
    return await this.databaseService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findByEmailVerificationToken(dto: EmailVerificationTokenDto) {
    return await this.databaseService.user.findFirst({
      where: {
        AND: {
          email: dto.email,
          emailVerificationToken: dto.token,
        },
      },
    });
  }

  async create(dto: CreateUserDto) {
    const { password, ...data } = dto;

    let passwordHash: string | null = null;

    if (password) {
      passwordHash = await this.bcryptService.hash(password);
    }

    return await this.databaseService.user.create({
      data: {
        passwordHash: passwordHash,
        ...data,
      },
    });
  }

  async updateById(id: string, dto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteById(id: string) {
    return await this.databaseService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async makeFavorite(id: string, articleId: string) {
    return await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: {
        favoriteArticles: {
          connect: {
            id: articleId,
          },
        },
      },
    });
  }

  async deleteFavorite(id: string, articleId: string) {
    return await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: {
        favoriteArticles: {
          disconnect: {
            id: articleId,
          },
        },
      },
    });
  }

  async favorites(id: string) {
    return await this.databaseService.article.findMany({
      where: {
        userFavorite: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  async hasFavorite(id: string, articleId: string) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        favoriteArticles: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!foundUser) {
      throw new NotFoundException("User not found");
    }

    return foundUser.favoriteArticles.map((v) => v.id).includes(articleId);
  }
}
