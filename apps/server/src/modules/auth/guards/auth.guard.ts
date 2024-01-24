import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { AUTHORIZE_ROLES } from "../auth.constants";
import { ErrorOr } from "src/common/common.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")?.[1];

    const validation = await this.validateToken(token);
    request.user = validation.data;

    const roles = this.reflector.get<string[]>(
      AUTHORIZE_ROLES,
      context.getHandler(),
    );

    // if no authorization decorator
    if (!roles) {
      return true;
    }

    // if authorization decorator without roles
    if (!request.user) {
      throw new UnauthorizedException(validation.error.message);
    }

    // check if user has on of roles
    const hasRole =
      roles.length > 0 ? roles.includes(request?.user?.role) : true;

    // if does not throw error
    if (!hasRole) {
      throw new UnauthorizedException(
        "You don't have enough permissions to execute action",
      );
    }

    return true;
  }

  async validateToken(token: string): Promise<ErrorOr<JwtPayloadDto>> {
    try {
      const user = await this.jwtService.verifyAsync<JwtPayloadDto>(token);
      return {
        data: user,
      };
    } catch (e) {
      const msg = (e as JsonWebTokenError).message;
      return {
        error: {
          message: msg,
          name: "validation error",
        },
      };
    }
  }
}
