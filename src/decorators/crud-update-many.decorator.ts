import { applyDecorators, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export function CrudUpdateMany(): any {
  return applyDecorators(
    AclAction("CRUD_UPDATE_MANY", `Update multiple items`),
    ApiOperation({ summary: `Update multiple items` }),
    ApiOkResponse({ type: Number }),
    ApiQuery({
      name: "ids",
      required: true,
      type: String,
      isArray: true,
      description: "ID`s of items selected for update",
    }),
    Patch()
  );
}
