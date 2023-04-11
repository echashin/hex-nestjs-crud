import { applyDecorators, Get, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";

import { AclAction } from "../../acl/decorators/acl-action.decorator";
import { ExportContentTypeInterceptor } from "../interceptors/export-content-type.interceptor";

export function CrudExport(path: string = "export"): any {
  return applyDecorators(
    AclAction(
      `CRUD_EXPORT_${path.toLocaleUpperCase()}`,
      `Export items to file`
    ),
    Get(path),
    ApiOperation({ summary: `Export items to file` }),
    UseInterceptors(ExportContentTypeInterceptor),
    ApiQuery({
      name: "ids",
      required: false,
      type: String,
      isArray: true,
      description: "ID`s of items selected for export",
    }),
    ApiQuery({
      name: "fileExt",
      required: true,
      type: String,
      description: "Export File Type",
    })
  );
}
