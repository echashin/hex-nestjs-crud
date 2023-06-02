"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudCreateMany = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_methods_enum_1 = require("../enums/crud-methods.enum");
function CrudCreateMany() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: `Create multiple items` }), (0, swagger_1.ApiExtension)('x-crud-method', { type: crud_methods_enum_1.CrudMethodsEnum.createMany }), (0, swagger_1.ApiCreatedResponse)({ type: Number }), (0, common_1.Post)("bulk-create"));
}
exports.CrudCreateMany = CrudCreateMany;
//# sourceMappingURL=crud-create-many.decorator.js.map