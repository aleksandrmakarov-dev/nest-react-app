import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { EmailVerificationTokenDto } from "./dto/email-verification-token.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BcryptService } from "src/core/bcrypt/bcrypt.service";

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
}
