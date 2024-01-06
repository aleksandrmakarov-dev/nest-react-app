import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
  (param: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return param ? request.user?.[param] : request.user;
  },
);
