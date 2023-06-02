import {applyDecorators, Get, UseInterceptors} from "@nestjs/common";
import {ApiExtension, ApiExtraModels, ApiOperation, ApiQuery} from "@nestjs/swagger";

import {ExportContentTypeInterceptor} from "../interceptors/export-content-type.interceptor";
import {ExportFileInput} from "../inputs";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";

export function CrudExport(path: string = "export"): any {
    return applyDecorators(
        Get(path),
        ApiOperation({summary: `Export items to file`}),
        UseInterceptors(ExportContentTypeInterceptor),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.export }),
        ApiExtraModels(ExportFileInput),
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
