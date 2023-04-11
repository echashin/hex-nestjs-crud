import { applyDecorators, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export function CrudDeleteMany(): any {
  return applyDecorators(
    AclAction("DELETE_MANY", `Delete multiple items`),
    Delete(),
    ApiOperation({ summary: "Delete multiple items" }),
    ApiOkResponse({ type: Number }),
    ApiQuery({
      name: "ids",
      required: true,
      type: String,
      isArray: true,
      description: "ID`s of items selected for delete",
    })
  );
}
