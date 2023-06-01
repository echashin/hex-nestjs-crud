"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudExport = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const export_content_type_interceptor_1 = require("../interceptors/export-content-type.interceptor");
const inputs_1 = require("../inputs");
function CrudExport(path = "export") {
    return (0, common_1.applyDecorators)((0, common_1.Get)(path), (0, swagger_1.ApiOperation)({ summary: `Export items to file` }), (0, common_1.UseInterceptors)(export_content_type_interceptor_1.ExportContentTypeInterceptor), (0, swagger_1.ApiExtraModels)(inputs_1.ExportFileInput), (0, swagger_1.ApiQuery)({
        name: "ids",
        required: false,
        type: String,
        isArray: true,
        description: "ID`s of items selected for export",
    }), (0, swagger_1.ApiQuery)({
        name: "fileExt",
        required: true,
        type: String,
        description: "Export File Type",
    }));
}
exports.CrudExport = CrudExport;
//# sourceMappingURL=crud-export.decorator.js.map