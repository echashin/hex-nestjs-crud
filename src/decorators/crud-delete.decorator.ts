import { applyDecorators, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export function CrudDelete(): any {
  return applyDecorators(
    AclAction("CRUD_DELETE", `Delete one item`),
    ApiOperation({ summary: "Delete one item" }),
    ApiOkResponse({ type: Number }),
    Delete(":id")
  );
}
