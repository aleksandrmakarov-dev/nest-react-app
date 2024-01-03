import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";
import { AUTHORIZE_ROLES } from "../auth.constants";

export const Roles = (...roles: Role[]) => SetMetadata(AUTHORIZE_ROLES, roles);
