"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudDeleteMany = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_methods_enum_1 = require("../enums/crud-methods.enum");
function CrudDeleteMany() {
    return (0, common_1.applyDecorators)((0, common_1.Delete)(), (0, swagger_1.ApiOperation)({ summary: "Delete multiple items" }), (0, swagger_1.ApiExtension)('x-crud-method', { type: crud_methods_enum_1.CrudMethodsEnum.deleteMany }), (0, swagger_1.ApiOkResponse)({ type: Number }), (0, swagger_1.ApiQuery)({
        name: "ids",
        required: true,
        type: String,
        isArray: true,
        description: "ID`s of items selected for delete",
    }));
}
exports.CrudDeleteMany = CrudDeleteMany;
//# sourceMappingURL=crud-delete-many.decorator.js.map