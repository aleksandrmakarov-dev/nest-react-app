import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import {
  AUTHORIZE_OPTIONAL,
  AUTHORIZE_PUBLIC,
  AUTHORIZE_ROLES,
} from "../auth.constants";
import { Request } from "express";
import { Role } from "@prisma/client";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      AUTHORIZE_PUBLIC,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const isOptional = this.reflector.get<boolean>(
      AUTHORIZE_OPTIONAL,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")?.[1];

    let user: JwtPayloadDto | null = null;

    try {
      user = await this.jwtService.verifyAsync<JwtPayloadDto>(token);
    } catch (e) {
      const msg = (e as JsonWebTokenError).message;

      if (!isOptional) {
        throw new UnauthorizedException(msg);
      }
    }

    request.user = user;

    if (isOptional) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException(
        "Only authorized users can execute action",
      );
    }

    const roles = this.reflector.get<string[]>(
      AUTHORIZE_ROLES,
      context.getHandler(),
    );

    const hasRole = roles ? roles.includes(user.role) : true;

    if (!hasRole) {
      throw new UnauthorizedException(
        "You don't have enough permissions to execute action",
      );
    }

    return true;
  }
}
