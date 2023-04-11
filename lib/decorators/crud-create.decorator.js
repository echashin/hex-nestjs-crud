"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudCreate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const CrudCreate = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: `Create one item ${model.name}` }), (0, swagger_1.ApiExtraModels)(model), (0, swagger_1.ApiCreatedResponse)({
        schema: {
            title: `${model.name}`,
            $ref: (0, swagger_1.getSchemaPath)(model),
        },
        headers: {
            Location: {
                description: "...",
                schema: { title: `${model.name}`, $ref: (0, swagger_1.getSchemaPath)(model) },
            },
        },
    }), (0, common_1.Post)());
};
exports.CrudCreate = CrudCreate;
//# sourceMappingURL=crud-create.decorator.js.map