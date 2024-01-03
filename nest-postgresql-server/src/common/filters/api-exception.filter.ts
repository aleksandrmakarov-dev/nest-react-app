import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export class ApiExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (exception instanceof JsonWebTokenError) {
      this.handleException(HttpStatus.UNAUTHORIZED, exception.message, host);
    } else if (exception instanceof TokenExpiredError) {
      this.handleException(HttpStatus.UNAUTHORIZED, "Token expired", host);
    } else if (exception instanceof PrismaClientValidationError) {
      this.handleException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        exception.message,
        host,
      );
    } else {
      super.catch(exception, host);
    }
  }

  private handleException(
    statusCode: number,
    message: string,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: statusCode,
      message: message,
    });
  }
}
