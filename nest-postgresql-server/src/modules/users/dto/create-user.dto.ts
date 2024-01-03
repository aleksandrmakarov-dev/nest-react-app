import { Role } from "@prisma/client";

export class CreateUserDto {
  email: string;
  name: string;
  role: Role;
  password?: string;
  bio?: string;
  image?: string;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
  emailVerifiedAt?: Date;
}
