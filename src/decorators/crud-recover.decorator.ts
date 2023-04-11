import { applyDecorators, Put, Type } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export const CrudRecover: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    AclAction("CRUD_RECOVER", `Recover item ${model.name}`),
    ApiOperation({ summary: `Recover item ${model.name}` }),
    ApiOkResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
    }),
    Put(":id")
  );
};
