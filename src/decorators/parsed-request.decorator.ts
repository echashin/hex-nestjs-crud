import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { PARSED_CRUD_REQUEST_KEY } from "../constants";

export const ParsedRequest: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    return request[PARSED_CRUD_REQUEST_KEY];
  });
