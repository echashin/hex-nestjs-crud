"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudImport = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const import_dto_1 = require("../dto/import.dto");
function CrudImport(path = "import") {
    return (0, common_1.applyDecorators)((0, common_1.Post)(path), (0, swagger_1.ApiOperation)({ summary: `Import multiple items by file upload` }), (0, swagger_1.ApiConsumes)("multipart/form-data"), (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            required: ["file"],
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }), (0, swagger_1.ApiExtraModels)(import_dto_1.ImportDto), (0, swagger_1.ApiCreatedResponse)({ type: import_dto_1.ImportDto }));
}
exports.CrudImport = CrudImport;
//# sourceMappingURL=crud-import.decorator.js.map