"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudUpdateMany = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_methods_enum_1 = require("../enums/crud-methods.enum");
function CrudUpdateMany() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: `Update multiple items` }), (0, swagger_1.ApiOkResponse)({ type: Number }), (0, swagger_1.ApiExtension)('x-crud-method', { type: crud_methods_enum_1.CrudMethodsEnum.updateMany }), (0, swagger_1.ApiQuery)({
        name: "ids",
        required: true,
        type: String,
        isArray: true,
        description: "ID`s of items selected for update",
    }), (0, common_1.Patch)());
}
exports.CrudUpdateMany = CrudUpdateMany;
//# sourceMappingURL=crud-update-many.decorator.js.map