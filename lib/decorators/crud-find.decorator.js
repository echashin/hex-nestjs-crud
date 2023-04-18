"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudFind = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_request_interceptor_1 = require("../interceptors/crud-request.interceptor");
const api_paginated_response_1 = require("./api-paginated-response");
const dto_1 = require("../dto");
const CrudFind = (entity, path = "") => {
    return (0, common_1.applyDecorators)((0, common_1.Get)(path), (0, api_paginated_response_1.ApiPaginatedResponse)(entity), (0, swagger_1.ApiExtraModels)(entity), (0, swagger_1.ApiExtraModels)(dto_1.Pageable), (0, swagger_1.ApiOperation)({
        summary: `Retrieve multiple items ${entity.name}[]`,
        description: "find",
    }), (0, common_1.UseInterceptors)(crud_request_interceptor_1.CrudRequestInterceptor, common_1.ClassSerializerInterceptor), (0, swagger_1.ApiQuery)({
        name: "fields",
        required: false,
        type: String,
        isArray: false,
        description: 'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "s",
        required: false,
        type: String,
        isArray: false,
        description: 'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "filter",
        required: false,
        explode: true,
        type: String,
        isArray: true,
        description: 'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "or",
        required: false,
        explode: true,
        type: String,
        isArray: true,
        description: 'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "sort",
        required: false,
        explode: true,
        type: String,
        isArray: true,
        description: 'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "join",
        required: false,
        explode: true,
        type: String,
        isArray: true,
        description: 'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: 'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        type: Number,
        description: 'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>',
    }), (0, swagger_1.ApiQuery)({
        name: "includeDeleted",
        required: false,
        type: Boolean,
        description: "Load deleted items",
    }));
};
exports.CrudFind = CrudFind;
//# sourceMappingURL=crud-find.decorator.js.map