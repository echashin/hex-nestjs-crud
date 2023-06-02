"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRecover = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_methods_enum_1 = require("../enums/crud-methods.enum");
const CrudRecover = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: `Recover item ${model.name}` }), (0, swagger_1.ApiExtension)('x-crud-method', { type: crud_methods_enum_1.CrudMethodsEnum.recover }), (0, swagger_1.ApiOkResponse)({
        schema: {
            title: `${model.name}`,
            $ref: (0, swagger_1.getSchemaPath)(model),
        },
    }), (0, common_1.Put)(":id"));
};
exports.CrudRecover = CrudRecover;
//# sourceMappingURL=crud-recover.decorator.js.map