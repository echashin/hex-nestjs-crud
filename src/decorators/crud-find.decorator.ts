import {applyDecorators, ClassSerializerInterceptor, Get, Type, UseInterceptors,} from "@nestjs/common";
import {ApiExtension, ApiExtraModels, ApiOperation, ApiQuery} from "@nestjs/swagger";


import {CrudRequestInterceptor} from "../interceptors/crud-request.interceptor";
import {ApiPaginatedResponse} from "./api-paginated-response";
import {Pageable} from "../dto";
import {FindInput} from "../inputs";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";

export const CrudFind: any = <TModel extends Type<any>>(
    entity: TModel,
    path: string = ""
) => {
    return applyDecorators(
        Get(path),
        ApiPaginatedResponse(entity),
        ApiExtraModels(entity),
        ApiExtraModels(Pageable, FindInput),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.find }),
        ApiOperation({
            summary: `Retrieve multiple items ${entity.name}[]`,
            description: "find",
        }),
        UseInterceptors(
            CrudRequestInterceptor,
            ClassSerializerInterceptor,
        ),
        ApiQuery({
            name: "fields",
            required: false,
            type: String,
            isArray: false,
            description:
                'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "s",
            required: false,
            type: String,
            isArray: false,
            description:
                'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "filter",
            required: false,
            explode: true,
            type: String,
            isArray: true,
            description:
                'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "or",
            required: false,
            explode: true,
            type: String,
            isArray: true,
            description:
                'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "sort",
            required: false,
            explode: true,
            type: String,
            isArray: true,
            description:
                'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "join",
            required: false,
            explode: true,
            type: String,
            isArray: true,
            description:
                'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "limit",
            required: false,
            type: Number,
            description:
                'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "page",
            required: false,
            type: Number,
            description:
                'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "includeDeleted",
            required: false,
            type: Boolean,
            description: "Load deleted items",
        }),
    );
};
