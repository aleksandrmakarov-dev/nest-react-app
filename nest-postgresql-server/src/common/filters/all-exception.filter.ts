import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (exception instanceof JsonWebTokenError) {
      this.handleException(HttpStatus.UNAUTHORIZED, exception.message, host);
    } else if (exception instanceof TokenExpiredError) {
      this.handleException(HttpStatus.UNAUTHORIZED, "Token expired", host);
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.handleException(
        HttpStatus.CONFLICT,
        exception.message,
        host,
        exception.code,
      );
    } else if (exception instanceof HttpException) {
      super.catch(exception, host);
    } else {
      this.handleException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        (exception as Error).message,
        host,
      );
    }
  }

  private handleException(
    statusCode: number,
    message: string,
    host: ArgumentsHost,
    code?: string,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(statusCode).json({
      statusCode: code ?? statusCode,
      message: message,
    });
  }
}
