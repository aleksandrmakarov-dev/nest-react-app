import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";
import { AUTHORIZE_ROLES } from "../auth.constants";

export const Authorize = (...roles: Role[]) =>
  SetMetadata(AUTHORIZE_ROLES, roles);
