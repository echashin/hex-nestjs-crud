import { applyDecorators, Get, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";

import { ExportContentTypeInterceptor } from "../interceptors/export-content-type.interceptor";

export function CrudExport(path: string = "export"): any {
  return applyDecorators(
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
