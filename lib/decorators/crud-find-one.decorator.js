"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudFindOne = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_request_interceptor_1 = require("../interceptors/crud-request.interceptor");
const CrudFindOne = (entity) => {
    return (0, common_1.applyDecorators)((0, common_1.Get)(":id"), (0, swagger_1.ApiOperation)({
        summary: `Retrieve one item ${entity.name}`,
        description: "find on item",
    }), (0, common_1.UseInterceptors)(crud_request_interceptor_1.CrudRequestInterceptor, common_1.ClassSerializerInterceptor), (0, swagger_1.ApiOkResponse)({
        schema: {
            title: `${entity.name}`,
            $ref: (0, swagger_1.getSchemaPath)(entity),
        },
    }), (0, swagger_1.ApiQuery)({
        name: "fields",
        required: false,
        type: String,
        isArray: false,
        description: 'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "join",
        required: false,
        explode: true,
        type: String,
        isArray: true,
        description: 'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "includeDeleted",
        required: false,
        type: Boolean,
        description: "Load deleted items",
    }));
};
exports.CrudFindOne = CrudFindOne;
//# sourceMappingURL=crud-find-one.decorator.js.map