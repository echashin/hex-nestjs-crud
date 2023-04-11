import { applyDecorators, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";

export function CrudCreateMany(): any {
  return applyDecorators(
    AclAction("CRUD_CREATE_MANY", `Create multiple items`),
    ApiOperation({ summary: `Create multiple items` }),
    ApiCreatedResponse({ type: Number }),
    Post("bulk-create")
  );
}
