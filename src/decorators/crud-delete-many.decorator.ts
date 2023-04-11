import { applyDecorators, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";


export function CrudDeleteMany(): any {
  return applyDecorators(
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
