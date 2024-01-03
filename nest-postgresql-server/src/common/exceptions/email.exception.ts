import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailException extends HttpException {
  constructor(response: string | Record<string, any>) {
    super(response, HttpStatus.BAD_GATEWAY);
  }
}
