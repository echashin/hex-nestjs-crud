"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudImport = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer = __importStar(require("multer"));
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
    }), (0, swagger_1.ApiExtraModels)(import_dto_1.ImportDto), (0, swagger_1.ApiCreatedResponse)({ type: import_dto_1.ImportDto }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer.memoryStorage(),
    })));
}
exports.CrudImport = CrudImport;
//# sourceMappingURL=crud-import.decorator.js.map