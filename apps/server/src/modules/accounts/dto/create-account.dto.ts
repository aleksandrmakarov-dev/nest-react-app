import { AccountType } from "@prisma/client";

export class CreateAccountDto {
  refreshToken: string;
  expiresAt: Date;
  type: AccountType;
  userId: string;
  externalProviderId?: string;
}
