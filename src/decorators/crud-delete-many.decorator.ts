import { applyDecorators, Delete } from "@nestjs/common";
import {ApiExtension, ApiOkResponse, ApiOperation, ApiQuery} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";


export function CrudDeleteMany(): any {
  return applyDecorators(
    Delete(),
    ApiOperation({ summary: "Delete multiple items" }),
    ApiExtension('x-crud-method', { type: CrudMethodsEnum.deleteMany }),
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
