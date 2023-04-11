import { applyDecorators, Patch, Type } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export const CrudUpdate: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    AclAction("CRUD_UPDATE", `Update item ${model.name}`),
    ApiOperation({ summary: `Update item ${model.name}` }),
    ApiOkResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
    }),
    Patch(":id")
  );
};
