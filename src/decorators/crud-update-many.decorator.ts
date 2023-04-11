import { applyDecorators, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";



export function CrudUpdateMany(): any {
  return applyDecorators(
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
