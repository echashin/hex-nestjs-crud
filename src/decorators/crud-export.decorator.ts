import { applyDecorators, Get, UseInterceptors } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiQuery } from "@nestjs/swagger";

import { ExportContentTypeInterceptor } from "../interceptors/export-content-type.interceptor";
import { ExportFileInput } from "../inputs";

export function CrudExport(path: string = "export"): any {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: `Export items to file` }),
    ApiExtraModels(ExportFileInput),
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
