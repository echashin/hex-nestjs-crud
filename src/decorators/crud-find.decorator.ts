import {
  applyDecorators,
  ClassSerializerInterceptor,
  Get,
  Type,
  UseInterceptors,
} from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiQuery } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";
import { LangCodeEnum } from "../../shared/enums/lang-code.enum";
import { CrudRequestInterceptor } from "../interceptors/crud-request.interceptor";
import { CrudRequestSoftDeleteInterceptor } from "../interceptors/crud-request-soft-delete.interceptor";
import { ApiPaginatedResponse } from "./api-paginated-response";

export const CrudFind: any = <TModel extends Type<any>>(
  entity: TModel,
  path: string = ""
) => {
  return applyDecorators(
    AclAction("CRUD_FIND", `Retrieve multiple items ${entity.name}[]`),
    Get(path),
    ApiPaginatedResponse(entity),
    ApiExtraModels(entity),
    ApiOperation({
      summary: `Retrieve multiple items ${entity.name}[]`,
      description: "find",
    }),
    UseInterceptors(
      CrudRequestInterceptor,
      ClassSerializerInterceptor,
      CrudRequestSoftDeleteInterceptor
    ),
    ApiQuery({
      name: "fields",
      required: false,
      type: String,
      isArray: false,
      description:
        'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "s",
      required: false,
      type: String,
      isArray: false,
      description:
        'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "filter",
      required: false,
      explode: true,
      type: String,
      isArray: true,
      description:
        'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "or",
      required: false,
      explode: true,
      type: String,
      isArray: true,
      description:
        'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "sort",
      required: false,
      explode: true,
      type: String,
      isArray: true,
      description:
        'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "join",
      required: false,
      explode: true,
      type: String,
      isArray: true,
      description:
        'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "limit",
      required: false,
      type: Number,
      description:
        'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "page",
      required: false,
      type: Number,
      description:
        'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>',
    }),
    ApiQuery({
      name: "softDelete",
      required: false,
      type: Boolean,
      description: "Load deleted items",
    }),
    ApiQuery({
      name: "lang",
      required: false,
      type: "enum",
      enum: LangCodeEnum,
      enumName: "LangCodeEnum",
      description: "Language. Default EN",
      example: LangCodeEnum.en,
    })
  );
};
