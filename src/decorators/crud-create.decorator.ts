import { applyDecorators, Post, Type } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export const CrudCreate: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    AclAction("CRUD_CREATE", `Create one item ${model.name}`),
    ApiOperation({ summary: `Create one item ${model.name}` }),
    ApiExtraModels(model),
    ApiCreatedResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
      headers: {
        Location: {
          description: "...",
          schema: { title: `${model.name}`, $ref: getSchemaPath(model) },
        },
      },
    }),
    Post()
  );
};
