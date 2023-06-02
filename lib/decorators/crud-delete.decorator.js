"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudDeleteOne = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_methods_enum_1 = require("../enums/crud-methods.enum");
function CrudDeleteOne() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Delete one item" }), (0, swagger_1.ApiExtension)('x-crud-method', { type: crud_methods_enum_1.CrudMethodsEnum.deleteOne }), (0, swagger_1.ApiOkResponse)({ type: Number }), (0, common_1.Delete)(":id"));
}
exports.CrudDeleteOne = CrudDeleteOne;
//# sourceMappingURL=crud-delete.decorator.js.map