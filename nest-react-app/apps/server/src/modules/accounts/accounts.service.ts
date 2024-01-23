import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { DatabaseService } from "src/core/database/database.service";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { RotateRefreshTokenDto } from "./dto/rotate-refresh-token.dto";

@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByRefreshToken(token: string) {
    return await this.databaseService.account.findFirst({
      where: {
        refreshToken: token,
      },
    });
  }

  async create(dto: CreateAccountDto) {
    if (dto.type === "EXTERNAL" && !dto.externalProviderId) {
      throw new UnprocessableEntityException(
        "If type is EXTERNAL, externalProviderId should be specified",
      );
    } else if (dto.type === "LOCAL" && dto.externalProviderId) {
      throw new UnprocessableEntityException(
        "If type is LOCAL, externalProviderId should not be specified",
      );
    }

    return await this.databaseService.account.create({
      data: {
        refreshToken: dto.refreshToken,
        expiresAt: dto.expiresAt,
        userID: dto.userId,
        type: dto.type,
        externalProviderID: dto.externalProviderId,
      },
    });
  }

  async updateById(id: string, dto: UpdateAccountDto) {
    return await this.databaseService.account.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async rotateRefreshToken(id: string, dto: RotateRefreshTokenDto) {
    return await this.updateById(id, dto);
  }
}
