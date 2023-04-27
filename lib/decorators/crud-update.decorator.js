"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudUpdate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const interceptors_1 = require("../interceptors");
const CrudUpdate = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: `Update item ${model.name}` }), (0, swagger_1.ApiOkResponse)({
        schema: {
            title: `${model.name}`,
            $ref: (0, swagger_1.getSchemaPath)(model),
        },
    }), (0, common_1.UseInterceptors)(interceptors_1.CrudPatchInterceptor), (0, common_1.Patch)(":id"));
};
exports.CrudUpdate = CrudUpdate;
//# sourceMappingURL=crud-update.decorator.js.map